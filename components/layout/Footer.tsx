import { Button } from '@/components/ui/Button'
import { LogoCarousel } from './LogoCarousel'
import { getProfile } from '@/lib/content/loader.server'

interface FooterProps {
  logos?: Array<{ name: string; image: string; url?: string }>
}

export function Footer({ logos = [] }: FooterProps = {}) {
  const profile = getProfile()

  return (
    <footer className="bg-white border-t border-gray-200">
      {logos.length > 0 && (
        <div className="border-b border-gray-200">
          <LogoCarousel logos={logos} />
        </div>
      )}
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-primary">
              Want to work together?
            </h3>
            <div className="space-y-2 text-body">
              <p>{profile.email}</p>
              {profile.location && <p className="text-secondary">{profile.location}</p>}
            </div>
          </div>
          
          <Button asChild href="https://cal.com/dangunderson" size="lg">
            SCHEDULE MEETING
          </Button>
        </div>
      </div>
    </footer>
  )
}

