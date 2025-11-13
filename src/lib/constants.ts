export const SITE_TITLE = 'Megawe - Lowongan Kerja Indonesia'
export const SITE_DESCRIPTION = 'Platform aggregator lowongan kerja terpercaya di Indonesia. Temukan pekerjaan impian Anda dari berbagai perusahaan ternama.'
export const SITE_URL = 'https://megawe.net'
export const API_URL = 'https://api.megawe.net'

export const JOB_TYPES = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Kontrak' },
  { value: 'internship', label: 'Magang' },
  { value: 'remote', label: 'Remote' }
] as const

export const JOB_CATEGORIES = [
  'Teknologi',
  'Keuangan',
  'Kesehatan',
  'Pendidikan',
  'Marketing',
  'Sales',
  'Customer Service',
  'Administrasi',
  'Engineering',
  'Design',
  'Human Resources',
  'Operasional',
  'Lainnya'
] as const

export const LOCATIONS = [
  'Jakarta',
  'Surabaya',
  'Bandung',
  'Medan',
  'Semarang',
  'Makassar',
  'Palembang',
  'Tangerang',
  'Depok',
  'Bekasi',
  'Bogor',
  'Batam',
  'Pekanbaru',
  'Bandar Lampung',
  'Malang',
  'Yogyakarta',
  'Remote'
] as const

export const SALARY_RANGES = [
  { min: 0, max: 5000000, label: '< 5jt' },
  { min: 5000000, max: 10000000, label: '5jt - 10jt' },
  { min: 10000000, max: 20000000, label: '10jt - 20jt' },
  { min: 20000000, max: 50000000, label: '20jt - 50jt' },
  { min: 50000000, max: Infinity, label: '> 50jt' }
] as const