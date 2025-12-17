'use client'

import { ProjectCard } from './ProjectCard'
import type { Project } from '@/lib/content/types'

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16 text-secondary">
        <p>No projects found. Add projects to the content directory.</p>
      </div>
    )
  }
  
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  )
}

