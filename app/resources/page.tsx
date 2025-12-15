'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ResourcesHeader } from '@/components/resources/ResourcesHeader'
import { ResourcesTable } from '@/components/resources/ResourcesTable'
import { ResourcePreview } from '@/components/resources/ResourcePreview'
import type { Resource } from '@/lib/content/types'

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [profile, setProfile] = useState<any>(null)
  
  useEffect(() => {
    fetch('/api/resources')
      .then(res => res.json())
      .then(data => {
        setResources(data)
        if (data.length > 0) {
          setSelectedResource(data[0])
        }
      })
      .catch(() => setResources([]))
    
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(() => setProfile({ email: '', name: '', headline: '', tagline: '', bio: '', links: {} }))
  }, [])
  
  const handleRatingChange = (id: string, delta: number) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, rating: r.rating + delta } : r))
    )
    
    if (selectedResource?.id === id) {
      setSelectedResource((prev) =>
        prev ? { ...prev, rating: prev.rating + delta } : null
      )
    }
  }
  
  const handleDownload = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, downloads: r.downloads + 1 } : r))
    )
    
    const resource = resources.find((r) => r.id === id)
    if (resource) {
      // Trigger download
      const link = document.createElement('a')
      link.href = resource.file
      link.download = resource.title
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <ResourcesHeader />
          
          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            <div className="lg:col-span-2">
              <ResourcesTable
                resources={resources}
                onRatingChange={handleRatingChange}
              />
            </div>
            
            <div>
              <ResourcePreview
                resource={selectedResource}
                onDownload={handleDownload}
              />
            </div>
          </div>
        </div>
      </main>
      
      {profile && <Footer profile={profile} />}
    </div>
  )
}

