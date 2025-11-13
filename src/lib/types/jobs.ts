export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote'
  description: string
  requirements: string[]
  benefits: string[]
  salary?: {
    min: number
    max: number
    currency: string
  }
  postedAt: string
  expiresAt?: string
  category: string
  logo?: string
  applicationUrl: string
  source: string
  isActive: boolean
}

export interface JobFilter {
  query?: string
  location?: string
  type?: string
  category?: string
  salaryMin?: number
  company?: string
  page?: number
  limit?: number
}

export interface JobResponse {
  jobs: Job[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface Employer {
  id: string
  name: string
  description: string
  industry: string
  size: string
  logo: string
  website: string
  location: string
  jobs: Job[]
  benefits: string[]
  culture: string
}