import apiClient from './client'
import type { Job, JobResponse, Employer } from '../types/jobs'

// Server-side data fetching functions
export async function fetchFeaturedJobs(limit: number = 6): Promise<Job[]> {
  try {
    const response = await apiClient.getJobs({
      limit,
      page: 1,
      // Assuming API has a featured flag or we sort by recent
    })
    return response.jobs
  } catch (error) {
    console.error('Failed to fetch featured jobs:', error)
    // Fallback to empty array
    return []
  }
}

export async function fetchJobs(filters: import('../types/jobs').JobFilter = {}): Promise<JobResponse> {
  try {
    return await apiClient.getJobs(filters)
  } catch (error) {
    console.error('Failed to fetch jobs:', error)
    // Fallback to empty response
    return {
      jobs: [],
      total: 0,
      page: 1,
      limit: filters.limit || 10,
      hasMore: false
    }
  }
}

export async function fetchJob(id: string): Promise<Job | null> {
  try {
    return await apiClient.getJob(id)
  } catch (error) {
    console.error(`Failed to fetch job ${id}:`, error)
    return null
  }
}

export async function fetchEmployers(): Promise<Employer[]> {
  try {
    return await apiClient.getEmployers()
  } catch (error) {
    console.error('Failed to fetch employers:', error)
    return []
  }
}

export async function fetchEmployer(id: string): Promise<Employer | null> {
  try {
    return await apiClient.getEmployer(id)
  } catch (error) {
    console.error(`Failed to fetch employer ${id}:`, error)
    return null
  }
}

export async function searchJobs(query: string, filters: import('../types/jobs').JobFilter = {}): Promise<JobResponse> {
  try {
    return await apiClient.searchJobs(query, filters)
  } catch (error) {
    console.error('Failed to search jobs:', error)
    return {
      jobs: [],
      total: 0,
      page: 1,
      limit: filters.limit || 10,
      hasMore: false
    }
  }
}

// Transform job data for display
export function transformJobForDisplay(job: Job) {
  return {
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    description: job.description,
    postedAt: job.postedAt,
    category: job.category,
    logo: job.logo || '/src/assets/images/default-company-logo.svg',
    applicationUrl: job.applicationUrl,
    salary: job.salary,
    requirements: job.requirements,
    benefits: job.benefits,
    isActive: job.isActive
  }
}