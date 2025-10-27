import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  const { data: caseStudy } = await supabase
    .from('case_studies')
    .select('title, description')
    .eq('slug', params.slug)
    .single()
  
  if (!caseStudy) return { title: 'Case Study Not Found' }
  
  return {
    title: \`\${caseStudy.title} | Dan Gunderson\`,
    description: caseStudy.description,
  }
}

export default async function CaseStudyDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const supabase = await createClient()
  
  // Fetch the case study
  const { data: caseStudy } = await supabase
    .from('case_studies')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()
  
  if (!caseStudy) {
    notFound()
  }
  
  // Fetch related media
  const { data: media } = await supabase
    .from('case_study_media')
    .select('*')
    .eq('case_study_id', caseStudy.id)
    .order('display_order', { ascending: true })
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hexagon-pattern border-b border-slate-800/50">
          <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
            <Link 
              href="/case-studies" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Case Studies
            </Link>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-gradient mb-4">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-slate-400 mb-6">
              {caseStudy.description}
            </p>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-6">
              {caseStudy.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-600/10 text-blue-400 rounded-lg text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Project Link */}
            {caseStudy.project_url && (
              <Button asChild variant="outline">
                <a href={caseStudy.project_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Project
                </a>
              </Button>
            )}
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-12">
            {/* Problem */}
            <Card className="card">
              <CardHeader>
                <CardTitle className="text-2xl">The Problem</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {caseStudy.problem}
                </p>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card className="card">
              <CardHeader>
                <CardTitle className="text-2xl">The Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {caseStudy.solution}
                </p>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="card">
              <CardHeader>
                <CardTitle className="text-2xl">Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {caseStudy.results}
                </p>
              </CardContent>
            </Card>

            {/* Media Gallery */}
            {media && media.length > 0 && (
              <Card className="card">
                <CardHeader>
                  <CardTitle className="text-2xl">Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {media.map((item) => (
                      <div key={item.id} className="space-y-2">
                        {item.media_type === 'image' && (
                          <img
                            src={item.url}
                            alt={item.caption || caseStudy.title}
                            className="w-full h-auto rounded-lg"
                          />
                        )}
                        {item.media_type === 'video' && (
                          <video
                            src={item.url}
                            controls
                            className="w-full h-auto rounded-lg"
                          />
                        )}
                        {item.caption && (
                          <p className="text-sm text-slate-400">{item.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pricing Info (if available) */}
            {caseStudy.pricing_info && (
              <Card className="card">
                <CardHeader>
                  <CardTitle className="text-2xl">Pricing Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-slate-300 whitespace-pre-wrap">
                    {JSON.stringify(caseStudy.pricing_info, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Back to Case Studies */}
        <section className="py-12 border-t border-slate-800/50">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <Button asChild size="lg">
              <Link href="/case-studies">
                <ArrowLeft className="mr-2 h-4 w-4" />
                View All Case Studies
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
