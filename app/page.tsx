import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ChatInterface } from '@/components/chatbot/ChatInterface'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ArrowRight, Briefcase, FileText, Calendar } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Chatbot */}
        <section className="relative hexagon-pattern overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
          
          <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Intro */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                    <span className="text-gradient">Dan Gunderson</span>
                  </h1>
                  <p className="text-2xl text-slate-300 font-medium">
                    Product Manager & Full-Stack Developer
                  </p>
                </div>
                
                <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                  I build innovative solutions at the intersection of product management and technology. 
                  Passionate about creating user-centric experiences and leveraging AI to solve complex problems.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg">
                    <Link href="/case-studies">
                      View My Work <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/resources">
                      Free Resources
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Right: Chatbot */}
              <div className="lg:h-[600px]">
                <ChatInterface />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation Cards */}
        <section className="py-20 bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Explore My Portfolio
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Discover my work, download free resources, and learn about my journey
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/case-studies" className="group">
                <Card className="card-hover h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition-colors">
                      <Briefcase className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle>Case Studies</CardTitle>
                    <CardDescription>
                      Explore detailed project breakdowns with problems, solutions, and results
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-blue-400 group-hover:text-blue-300 transition-colors flex items-center gap-2">
                      View Projects <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/resources" className="group">
                <Card className="card-hover h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-purple-600/10 flex items-center justify-center mb-4 group-hover:bg-purple-600/20 transition-colors">
                      <FileText className="h-6 w-6 text-purple-400" />
                    </div>
                    <CardTitle>Resources</CardTitle>
                    <CardDescription>
                      Download free templates, documents, and code snippets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-blue-400 group-hover:text-blue-300 transition-colors flex items-center gap-2">
                      Browse Resources <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/timeline" className="group">
                <Card className="card-hover h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-cyan-600/10 flex items-center justify-center mb-4 group-hover:bg-cyan-600/20 transition-colors">
                      <Calendar className="h-6 w-6 text-cyan-400" />
                    </div>
                    <CardTitle>Timeline</CardTitle>
                    <CardDescription>
                      Follow my career journey and professional milestones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-blue-400 group-hover:text-blue-300 transition-colors flex items-center gap-2">
                      View Timeline <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Work Section - Placeholder */}
        <section className="py-20 hexagon-pattern">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Featured Work
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Highlighted projects showcasing my approach to problem-solving
              </p>
            </div>
            
            <Card className="card-hover max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Coming Soon</CardTitle>
                <CardDescription className="text-center">
                  Featured case studies will appear here once content is added via the dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild variant="outline">
                  <Link href="/dashboard">
                    Add Content in Dashboard
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
