import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Download, ArrowRight, FileText, Code, Video, File } from 'lucide-react'

export const metadata = {
  title: 'Resources | Dan Gunderson',
  description: 'Free templates, documents, code snippets, and resources for product managers and developers.',
}

const resourceTypeIcons = {
  template: FileText,
  document: FileText,
  code: Code,
  video: Video,
  other: File,
}

export default function ResourcesPage() {
  // TODO: Fetch resources from Supabase
  const resources: any[] = []

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hexagon-pattern border-b border-slate-800/50">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-gradient mb-4">
                Free Resources
              </h1>
              <p className="text-xl text-slate-400">
                Templates, frameworks, code snippets, and tools to help you succeed in product management and development.
              </p>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {resources.length === 0 ? (
              <Card className="card max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-center">No Resources Yet</CardTitle>
                  <CardDescription className="text-center">
                    Resources will appear here once you add them via the dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button asChild>
                    <Link href="/dashboard/resources">
                      Add Resource <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((resource: any) => {
                  const Icon = resourceTypeIcons[resource.resource_type as keyof typeof resourceTypeIcons] || File
                  
                  return (
                    <Card key={resource.id} className="card-hover">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-purple-600/10 flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-purple-400" />
                        </div>
                        <CardTitle>{resource.title}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {resource.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-slate-800 text-slate-300 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Button className="w-full" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

