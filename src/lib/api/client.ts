import type { Job, JobFilter, JobResponse, Employer } from '../types/jobs'
import { logger } from '../logger'

const API_BASE = import.meta.env.API_URL || 'https://api.megawe.net'

class ApiClient {
  private sanitizeInput(input: string | number | undefined): string {
    if (input === undefined || input === null) {
      return ''
    }

    const str = String(input)
      .trim()
      .replace(/[<>]/g, '') // Remove potential XSS characters
      .replace(/javascript:/gi, '') // Remove javascript protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .substring(0, 255) // Limit length

    // Additional sanitization for SQL injection patterns
    return str.replace(/([';\\])/g, '\\$1')
  }

  private sanitizeFilterValue(value: string | number | undefined): string {
    if (value === undefined || value === null) {
      return ''
    }

    // For numeric values, ensure they're valid numbers
    if (typeof value === 'number') {
      if (!isNaN(value) && isFinite(value)) {
        return value.toString()
      }
      return ''
    }

    // For string values, apply stricter sanitization
    const sanitized = this.sanitizeInput(value)

    // Allow only alphanumeric, spaces, hyphens, and common punctuation
    return sanitized.replace(/[^a-zA-Z0-9\s\-_.,@]/g, '')
  }

  private sanitizeUrl(url: string): string {
    try {
      const urlObj = new URL(url)
      const sensitiveParams = ['token', 'key', 'secret', 'auth', 'password']

      sensitiveParams.forEach(param => {
        urlObj.searchParams.delete(param)
      })

      return urlObj.toString()
    } catch {
      return url.replace(/[?&].*$/, '') // Remove query params if URL parsing fails
    }
  }

  private validateFilters(filters: JobFilter): JobFilter {
    const validFilters: JobFilter = {}

    // Whitelist of allowed filter keys
    const allowedKeys = ['query', 'location', 'type', 'category', 'salaryMin', 'company', 'page', 'limit']

    Object.entries(filters).forEach(([key, value]) => {
      if (allowedKeys.includes(key) && value !== undefined && value !== null && value !== '') {
        // Special validation for different filter types
        switch (key) {
          case 'page':
          case 'limit':
          case 'salaryMin':
            const numValue = typeof value === 'string' ? parseInt(value, 10) : value
            if (typeof numValue === 'number' && !isNaN(numValue) && numValue >= 0) {
              validFilters[key] = key === 'page' || key === 'limit'
                ? Math.min(Math.max(numValue, 1), 100) // Limit page/limit to reasonable range
                : numValue
            }
            break
          case 'query':
          case 'location':
          case 'company':
            const strValue = this.sanitizeFilterValue(value)
            if (strValue.length > 0) {
              validFilters[key] = strValue
            }
            break
          case 'type':
          case 'category':
            // Validate against allowed types/categories
            const validTypes = ['full-time', 'part-time', 'contract', 'internship', 'remote']
            const validCategories = ['technology', 'healthcare', 'finance', 'education', 'retail', 'manufacturing', 'other']

            const sanitizedType = this.sanitizeFilterValue(value).toLowerCase()
            if (key === 'type' && validTypes.includes(sanitizedType)) {
              validFilters[key] = sanitizedType
            } else if (key === 'category' && validCategories.includes(sanitizedType)) {
              validFilters[key] = sanitizedType
            }
            break
          default:
            // Skip any unallowed keys
            break
        }
      }
    })

    return validFilters
  }

  // Helper method to transform job data from API response
  private transformJobData(job: any): Job {
    return {
      id: job.id || job.job_id || '',
      title: job.title || job.job_title || '',
      company: job.company_name || job.company || '',
      location: job.location || job.city || '',
      type: job.job_type || job.type || 'full-time',
      description: job.description || '',
      requirements: job.requirements || job.qualifications || [],
      benefits: job.benefits || [],
      salary: this.transformSalaryData(job.salary),
      postedAt: job.posted_date || job.postedAt || job.created_at || new Date().toISOString(),
      expiresAt: job.expiry_date || job.expiresAt,
      category: job.category || job.job_category || '',
      logo: job.logo || job.company_logo,
      applicationUrl: job.application_url || job.apply_url || '',
      source: job.source || 'megawe',
      isActive: job.is_active !== false,
      seo: job.seo
    }
  }

  // Helper method to transform salary data
  private transformSalaryData(salary: any): { min: number; max: number; currency: string } | undefined {
    if (!salary) return undefined

    return {
      min: salary.min || salary.salary_min || 0,
      max: salary.max || salary.salary_max || 0,
      currency: salary.currency || 'IDR'
    }
  }

  // Helper method to transform employer data
  private transformEmployerData(company: any): Employer {
    return {
      id: company.id || company.company_id || '',
      name: company.name || company.company_name || '',
      description: company.description || company.company_description || '',
      industry: company.industry || company.sector || '',
      size: company.size || company.company_size || '',
      logo: company.logo || company.company_logo || '',
      website: company.website || company.company_website || '',
      location: company.location || company.address || '',
      jobs: company.jobs || company.open_positions || [],
      benefits: company.benefits || [],
      culture: company.culture || company.work_culture || ''
    }
  }

  // Helper method to extract job data from different response formats
  private extractJobData(response: any): any[] {
    return response.jobs || response.data || []
  }

  // Helper method to extract employer data from different response formats
  private extractEmployerData(response: any): any[] {
    return response.companies || response.data || []
  }

  private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    // Validate and sanitize the endpoint
    const sanitizedEndpoint = this.sanitizeInput(endpoint)

    // Ensure endpoint doesn't contain path traversal
    if (sanitizedEndpoint.includes('../') || sanitizedEndpoint.includes('..\\')) {
      throw new Error('Invalid endpoint: path traversal detected')
    }

    const url = `${API_BASE}${sanitizedEndpoint}`

    // Add timeout and security headers
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Cache-Control': 'no-cache',
          ...options?.headers,
        },
        mode: 'cors',
        credentials: 'same-origin',
        ...options,
      })

      clearTimeout(timeoutId)

      // Validate response status
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error')
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`)
      }

      // Validate response content type
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response content type')
      }

      const data = await response.json()

      // Validate response structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response format')
      }

      return data as T
    } catch (error) {
      clearTimeout(timeoutId)

      // Use proper logger that handles production vs development
      logger.error(`API Request failed for ${this.sanitizeUrl(url)}`, {
        endpoint: sanitizedEndpoint,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      })

      // Re-throw with sanitized error message
      if (error instanceof Error) {
        throw new Error(`API request failed: ${error.message}`)
      }
      throw error
    }
  }

  async getJobs(filters: JobFilter = {}): Promise<JobResponse> {
    // Validate and sanitize filters
    const validFilters = this.validateFilters(filters)

    const params = new URLSearchParams()

    Object.entries(validFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) {
        params.append(key, this.sanitizeFilterValue(value))
      }
    })

    const query = params.toString()
    const endpoint = `/api/v3/jobs${query ? `?${query}` : ''}`

    const response = await this.fetchApi<any>(endpoint)

    // Use helper methods to transform response
    const rawJobs = this.extractJobData(response)
    const jobs = rawJobs.map((job: any) => this.transformJobData(job))

    return {
      jobs,
      total: response.total || jobs.length,
      page: response.page || filters.page || 1,
      limit: response.limit || filters.limit || 10,
      hasMore: response.has_more || (jobs.length >= (filters.limit || 10))
    }
  }

  async getJob(id: string): Promise<Job> {
    // Validate and sanitize the ID
    const sanitizedId = this.sanitizeFilterValue(id)
    if (!sanitizedId || sanitizedId.length === 0) {
      throw new Error('Invalid job ID provided')
    }

    const response = await this.fetchApi<any>(`/api/v3/jobs/${sanitizedId}`)
    const job = response.job || response

    // Use helper method to transform job data
    return this.transformJobData(job)
  }

  async getEmployers(): Promise<Employer[]> {
    try {
      const response = await this.fetchApi<any>('/api/v3/companies')
      const companies = this.extractEmployerData(response)

      return companies.map((company: any) => this.transformEmployerData(company))
    } catch (error) {
      logger.warn('Failed to fetch employers, using fallback data', {
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      // Return fallback data for now since companies endpoint is failing
      return [
        {
          id: '1',
          name: 'Yuko Tesa Mirai',
          description: 'Perusahaan pengirim peserta magang ke Jepang yang telah berpengalaman selama 28 tahun.',
          industry: 'Bagian Umum',
          size: '50-100 karyawan',
          logo: '/src/assets/images/default-company-logo.svg',
          website: 'https://karirhub.kemnaker.go.id',
          location: 'Padang',
          jobs: [],
          benefits: ['Asuransi kesehatan', 'Bonus tahunan', 'Training di Jepang'],
          culture: 'Profesional dan berorientasi hasil'
        }
      ]
    }
  }

  async getEmployer(id: string): Promise<Employer> {
    // Validate and sanitize the ID
    const sanitizedId = this.sanitizeFilterValue(id)
    if (!sanitizedId || sanitizedId.length === 0) {
      throw new Error('Invalid employer ID provided')
    }

    try {
      const response = await this.fetchApi<any>(`/api/v3/companies/${sanitizedId}`)
      const company = response.company || response

      // Use helper method to transform employer data
      return this.transformEmployerData(company)
    } catch (error) {
      logger.warn(`Failed to fetch employer ${id}, using fallback data`, {
        employerId: id,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      // Return fallback data
      return {
        id: sanitizedId,
        name: 'Yuko Tesa Mirai',
        description: 'Perusahaan pengirim peserta magang ke Jepang yang telah berpengalaman selama 28 tahun. Dengan penempatan lebih dari 7000 orang di 14 bidang pekerjaan di Jepang.',
        industry: 'Bagian Umum',
        size: '50-100 karyawan',
        logo: '/src/assets/images/default-company-logo.svg',
        website: 'https://karirhub.kemnaker.go.id',
        location: 'Padang',
        jobs: [],
        benefits: ['Asuransi kesehatan', 'Bonus tahunan', 'Training di Jepang'],
        culture: 'Profesional dan berorientasi hasil'
      }
    }
  }

  async searchJobs(query: string, filters: JobFilter = {}): Promise<JobResponse> {
    return this.getJobs({ ...filters, query })
  }
}

export const apiClient = new ApiClient()
export default apiClient