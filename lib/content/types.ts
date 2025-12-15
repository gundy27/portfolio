// TypeScript interfaces for all content types

export interface Profile {
  name: string
  headline: string
  tagline: string
  bio: string
  email: string
  location?: string
  links: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
  }
  rotatingText?: string[] // Custom list for rotating text
}

export interface Project {
  id: string
  title: string
  description: string
  year: number
  type: 'paid' | 'personal'
  tags: string[]
  featured: boolean
  thumbnail: string
  company?: string
  companyLogo?: string
  url?: string
  contentFile?: string // Optional markdown file
}

export interface Resource {
  id: string
  title: string
  description: string
  file: string
  fileType: string
  downloads: number
  rating: number
  category: 'template' | 'document' | 'code' | 'other'
}

export interface TimelineEvent {
  id: string
  company: string
  role: string
  startDate: string // Format: "YYYY-MM"
  endDate: string | null // Format: "YYYY-MM" or null for current
  description: string
  tags: string[]
  image: string
  projectLinks?: string[] // Array of project IDs
}

