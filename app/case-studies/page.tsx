import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Case Studies | Dan Gunderson',
  description: 'Explore detailed project breakdowns showcasing my work in product management and development.',
}

export default function CaseStudiesPage() {
  // TODO: Fetch case studies from Supabase
  const caseStudies: any[] = []

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hexagon-pattern border-b border-slate-800/50">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-gradient mb-4">
                Case Studies
              </h1>
              <p className="text-xl text-slate-400">
                Detailed breakdowns of projects I've worked on, from problem identification to measurable results.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {caseStudies.length === 0 ? (
              <Card className="card max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-center">No Case Studies Yet</CardTitle>
                  <CardDescription className="text-center">
                    Case studies will appear here once you add them via the dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button asChild>
                    <Link href="/dashboard/case-studies">
                      Add Case Study <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {caseStudies.map((study) => (
                  <Link key={study.id} href={`/case-studies/${study.slug}`} className="group">
                    <Card className="card-hover h-full">
                      {study.thumbnail_url && (
                        <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                          <img
                            src={study.thumbnail_url}
                            alt={study.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle>{study.title}</CardTitle>
                        <CardDescription>{study.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {study.technologies.slice(0, 3).map((tech: string) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs bg-blue-600/10 text-blue-400 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <span className="text-blue-400 group-hover:text-blue-300 transition-colors flex items-center gap-2">
                          Read More <ArrowRight className="h-4 w-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
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

