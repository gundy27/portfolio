import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ResourcesPageClient } from '@/components/resources/ResourcesPageClient'
import { getProfile, getResources } from '@/lib/content/loader.server'

export default function ResourcesPage() {
  const resources = getResources()
  const profile = getProfile()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <ResourcesPageClient initialResources={resources} />
      </main>

      <Footer profile={profile} />
    </div>
  )
}
