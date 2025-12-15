import Link from 'next/link'
import { Label } from '@/components/ui/Label'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-heading text-xl font-semibold text-primary">
            Dan Gunderson
          </Link>
          
          <div className="flex items-center gap-8">
            <Link href="/timeline">
              <Label>CAREER TIMELINE</Label>
            </Link>
            <Link href="/projects">
              <Label>PROJECTS</Label>
            </Link>
            <Link href="/resources">
              <Label>RESOURCES</Label>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

