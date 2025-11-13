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
    const endpoint = `/jobs${query ? `?${query}` : ''}`

    return this.fetchApi<JobResponse>(endpoint)
  }

  async getJob(id: string): Promise<Job> {
    return this.fetchApi<Job>(`/jobs/${id}`)
  }

  async getEmployers(): Promise<Employer[]> {
    return this.fetchApi<Employer[]>('/employers')
  }

  async getEmployer(id: string): Promise<Employer> {
    return this.fetchApi<Employer>(`/employers/${id}`)
  }

  async searchJobs(query: string, filters: JobFilter = {}): Promise<JobResponse> {
    return this.getJobs({ ...filters, query })
  }
}

export const apiClient = new ApiClient()
export default apiClient