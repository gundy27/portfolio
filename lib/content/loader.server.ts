import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Profile, Project, Resource, TimelineEvent } from './types'

const contentDirectory = path.join(process.cwd(), 'content')

// Default profile for fallback
const defaultProfile: Profile = {
  name: '',
  headline: '',
  tagline: '',
  bio: '',
  email: '',
  links: {},
}

// Load profile data
export function getProfile(): Profile {
  try {
    const filePath = path.join(contentDirectory, 'profile.json')
    if (!fs.existsSync(filePath)) {
      console.warn('[content] profile.json not found')
      return defaultProfile
    }
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('[content] Error loading profile:', error)
    return defaultProfile
  }
}

// Load all projects
export function getProjects(): Project[] {
  try {
    const projectsDirectory = path.join(contentDirectory, 'projects')
    if (!fs.existsSync(projectsDirectory)) {
      return []
    }

    const files = fs.readdirSync(projectsDirectory)

    const projects = files
      .filter((file) => file.endsWith('.json') && !file.includes('template'))
      .map((file) => {
        try {
          const filePath = path.join(projectsDirectory, file)
          const fileContents = fs.readFileSync(filePath, 'utf8')
          return JSON.parse(fileContents) as Project
        } catch (error) {
          console.error(`[content] Error loading project ${file}:`, error)
          return null
        }
      })
      .filter((p): p is Project => p !== null)

    // Sort by year (newest first), then by featured
    return projects.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return b.year - a.year
    })
  } catch (error) {
    console.error('[content] Error loading projects:', error)
    return []
  }
}

// Load single project by slug
export function getProject(slug: string): Project | null {
  try {
    const filePath = path.join(contentDirectory, 'projects', `${slug}.json`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents) as Project
  } catch (error) {
    console.error(`[content] Error loading project ${slug}:`, error)
    return null
  }
}

// Load project content (markdown) if available
export function getProjectContent(slug: string): string | null {
  try {
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
  } catch (error) {
    console.error(`[content] Error loading project content for ${slug}:`, error)
    return null
  }
}

// Load all resources
export function getResources(): Resource[] {
  try {
    const resourcesDirectory = path.join(contentDirectory, 'resources')
    if (!fs.existsSync(resourcesDirectory)) {
      return []
    }

    const files = fs.readdirSync(resourcesDirectory)

    const resources = files
      .filter((file) => file.endsWith('.json') && !file.includes('template'))
      .map((file) => {
        try {
          const filePath = path.join(resourcesDirectory, file)
          const fileContents = fs.readFileSync(filePath, 'utf8')
          return JSON.parse(fileContents) as Resource
        } catch (error) {
          console.error(`[content] Error loading resource ${file}:`, error)
          return null
        }
      })
      .filter((r): r is Resource => r !== null)

    return resources.sort((a, b) => b.rating - a.rating)
  } catch (error) {
    console.error('[content] Error loading resources:', error)
    return []
  }
}

// Load timeline events
export function getTimelineEvents(): TimelineEvent[] {
  try {
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
  } catch (error) {
    console.error('[content] Error loading timeline events:', error)
    return []
  }
}

// Get featured projects (top 6)
export function getFeaturedProjects(): Project[] {
  const projects = getProjects()
  return projects.filter((p) => p.featured).slice(0, 6)
}
