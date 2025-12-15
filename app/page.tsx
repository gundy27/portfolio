import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { AboutMe } from '@/components/home/AboutMe'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'
import { getProfile, getFeaturedProjects } from '@/lib/content/loader.server'

export default async function HomePage() {
  const profile = getProfile()
  const featuredProjects = getFeaturedProjects()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero name={profile.name} headline={profile.headline} />
        <AboutMe tagline={profile.tagline} rotatingText={profile.rotatingText} />
        <FeaturedProjects projects={featuredProjects} />
      </main>
      
      <Footer profile={profile} />
    </div>
  )
}
