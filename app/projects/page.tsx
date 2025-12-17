'use client'

import { useState, useMemo, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ProjectsHeader } from '@/components/projects/ProjectsHeader'
import { ProjectFilters } from '@/components/projects/ProjectFilters'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import type { Project } from '@/lib/content/types'

type FilterType = 'all' | 'paid' | 'personal'

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setAllProjects(data))
      .catch(() => setAllProjects([]))
    
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(() => setProfile({ email: '', name: '', headline: '', tagline: '', bio: '', links: {} }))
  }, [])
  
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return allProjects
    return allProjects.filter((p) => p.type === activeFilter)
  }, [allProjects, activeFilter])
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <ProjectsHeader />
          <ProjectFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          <ProjectGrid projects={filteredProjects} />
        </div>
      </main>
      
      {profile && <Footer profile={profile} />}
    </div>
  )
}

