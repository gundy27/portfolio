import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Profile, Project, Resource, TimelineEvent } from './types'

const contentDirectory = path.join(process.cwd(), 'content')

// Load profile data
export function getProfile(): Profile {
  const filePath = path.join(contentDirectory, 'profile.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents)
}

// Load all projects
export function getProjects(): Project[] {
  const projectsDirectory = path.join(contentDirectory, 'projects')
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }
  
  const files = fs.readdirSync(projectsDirectory)
  
  const projects = files
    .filter((file) => file.endsWith('.json') && !file.includes('template'))
    .map((file) => {
      const filePath = path.join(projectsDirectory, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(fileContents) as Project
    })
  
  // Sort by year (newest first), then by featured
  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return b.year - a.year
  })
}

// Load single project by slug
export function getProject(slug: string): Project | null {
  const filePath = path.join(contentDirectory, 'projects', `${slug}.json`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents) as Project
}

// Load project content (markdown) if available
export function getProjectContent(slug: string): string | null {
  const project = getProject(slug)
  if (!project || !project.contentFile) {
    return null
  }
  
  const filePath = path.join(contentDirectory, 'projects', project.contentFile)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { content } = matter(fileContents)
  return content
}

// Load all resources
export function getResources(): Resource[] {
  const resourcesDirectory = path.join(contentDirectory, 'resources')
  if (!fs.existsSync(resourcesDirectory)) {
    return []
  }
  
  const files = fs.readdirSync(resourcesDirectory)
  
  const resources = files
    .filter((file) => file.endsWith('.json') && !file.includes('template'))
    .map((file) => {
      const filePath = path.join(resourcesDirectory, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(fileContents) as Resource
    })
  
  return resources.sort((a, b) => b.rating - a.rating)
}

// Load timeline events
export function getTimelineEvents(): TimelineEvent[] {
  const filePath = path.join(contentDirectory, 'timeline', 'events.json')
  
  if (!fs.existsSync(filePath)) {
    return []
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const events = JSON.parse(fileContents) as TimelineEvent[]
  
  // Sort by start date (newest first)
  return events.sort((a, b) => {
    return b.startDate.localeCompare(a.startDate)
  })
}

// Get featured projects (top 6)
export function getFeaturedProjects(): Project[] {
  const projects = getProjects()
  return projects.filter((p) => p.featured).slice(0, 6)
}

