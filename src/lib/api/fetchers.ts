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
    // Add timeout to prevent long build delays
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('API timeout after 3 seconds')), 3000)
    })

    const response = await Promise.race([
      apiClient.getEmployers(),
      timeoutPromise
    ])

    return response
  } catch (error) {
    console.error('Failed to fetch employers, using fallback data:', error)
    // Provide static fallback data for build stability
    return [
      {
        id: 'tokopedia',
        name: 'Tokopedia',
        logo: 'https://cdn.astro.build/logos/tokopedia.svg',
        description: 'Leading e-commerce platform in Indonesia',
        industry: 'E-commerce',
        size: '1000-5000 karyawan',
        location: 'Jakarta',
        website: 'https://www.tokopedia.com',
        jobs: [],
        benefits: ['Asuransi kesehatan', 'Bonus tahunan', 'Opsi kerja hybrid'],
        culture: 'Inovatif dan kolaboratif'
      },
      {
        id: 'traveloka',
        name: 'Traveloka',
        logo: 'https://cdn.astro.build/logos/traveloka.svg',
        description: 'Travel and lifestyle booking platform',
        industry: 'Travel',
        size: '500-1000 karyawan',
        location: 'Jakarta',
        website: 'https://www.traveloka.com',
        jobs: [],
        benefits: ['Asuransi kesehatan', 'Diskon perjalanan', 'Waktu fleksibel'],
        culture: 'Dinamis dan berorientasi pelanggan'
      },
      {
        id: 'gojek',
        name: 'Gojek',
        logo: 'https://cdn.astro.build/logos/gojek.svg',
        description: 'Super app providing multiple services',
        industry: 'Technology',
        size: '1000-5000 karyawan',
        location: 'Jakarta',
        website: 'https://www.gojek.com',
        jobs: [],
        benefits: ['Asuransi kesehatan', 'Saham karyawan', 'Training profesional'],
        culture: 'Fast-paced dan solutif'
      },
      {
        id: 'shopee',
        name: 'Shopee',
        logo: 'https://cdn.astro.build/logos/shopee.svg',
        description: 'Leading e-commerce platform in Southeast Asia',
        industry: 'E-commerce',
        size: '5000+ karyawan',
        location: 'Jakarta',
        website: 'https://www.shopee.co.id',
        jobs: [],
        benefits: ['Asuransi kesehatan', 'Bonus kinerja', 'Peluang karir global'],
        culture: 'Data-driven dan berorientasi hasil'
      }
    ]
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