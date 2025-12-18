import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ProjectsPageClient } from '@/components/projects/ProjectsPageClient'
import { getProfile, getProjects } from '@/lib/content/loader.server'

export default function ProjectsPage() {
  const projects = getProjects()
  const profile = getProfile()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <ProjectsPageClient projects={projects} />
      </main>
      
      <Footer profile={profile} />
    </div>
  )
}
