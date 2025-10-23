import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Timeline | Dan Gunderson',
  description: 'Follow my career journey, milestones, and professional experience.',
}

export default function TimelinePage() {
  // TODO: Fetch timeline events from Supabase
  const events: any[] = []

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hexagon-pattern border-b border-slate-800/50">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-gradient mb-4">
                My Journey
              </h1>
              <p className="text-xl text-slate-400">
                A timeline of my professional experience, education, and key milestones.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            {events.length === 0 ? (
              <Card className="card max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-center">No Timeline Events Yet</CardTitle>
                  <CardDescription className="text-center">
                    Timeline events will appear here once you add them via the dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button asChild>
                    <Link href="/dashboard/timeline">
                      Add Timeline Event <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                {events.map((event, index) => (
                  <div key={event.id} className="relative pl-8 border-l-2 border-blue-600/30">
                    {/* Hexagon marker */}
                    <div className="absolute -left-3 top-0 w-6 h-6 clip-hexagon bg-blue-600" />
                    
                    <Card className="card-hover">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{event.title}</CardTitle>
                            {event.company && (
                              <p className="text-slate-400 mt-1">{event.company}</p>
                            )}
                          </div>
                          <span className="px-3 py-1 text-xs bg-blue-600/10 text-blue-400 rounded-full">
                            {event.event_type}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">
                          {/* TODO: Format date range */}
                          {event.start_date} - {event.end_date || 'Present'}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-300">{event.description}</p>
                        {event.location && (
                          <p className="text-sm text-slate-500 mt-2">{event.location}</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

