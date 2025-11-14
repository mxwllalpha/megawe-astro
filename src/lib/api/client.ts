import type { Job, JobFilter, JobResponse, Employer } from '../types/jobs'

const API_BASE = 'https://api.megawe.net'

class ApiClient {
  private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE}${endpoint}`

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`Failed to fetch ${url}:`, error)
      throw error
    }
  }

  async getJobs(filters: JobFilter = {}): Promise<JobResponse> {
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, String(value))
      }
    })

    const query = params.toString()
    const endpoint = `/api/jobs${query ? `?${query}` : ''}`

    const response = await this.fetchApi<any>(endpoint)

    // Transform API response to match our interface
    return {
      jobs: response.data || [],
      total: response.meta?.pagination?.total || 0,
      page: response.meta?.pagination?.page || 1,
      limit: response.meta?.pagination?.limit || filters.limit || 10,
      hasMore: response.meta?.pagination?.page < response.meta?.pagination?.totalPages
    }
  }

  async getJob(id: string): Promise<Job> {
    const response = await this.fetchApi<any>(`/api/jobs/${id}`)
    return response.data
  }

  async getEmployers(): Promise<Employer[]> {
    try {
      const response = await this.fetchApi<any>('/api/companies')
      return response.data || []
    } catch (error) {
      console.error('Failed to fetch employers, using fallback data:', error)
      // Return fallback data for now since companies endpoint is returning 500
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
    try {
      const response = await this.fetchApi<any>(`/api/companies/${id}`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch employer ${id}, using fallback data:`, error)
      // Return fallback data
      return {
        id,
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