import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Briefcase, FileText, Calendar, MessageSquare, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Dashboard | Dan Gunderson',
  description: 'Manage your portfolio content',
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-2">Dashboard</h1>
        <p className="text-slate-400">
          Welcome back! Manage your portfolio content from here.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="card">
          <CardHeader className="pb-2">
            <CardDescription>Case Studies</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-500">0 published</p>
          </CardContent>
        </Card>

        <Card className="card">
          <CardHeader className="pb-2">
            <CardDescription>Resources</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-500">0 downloads</p>
          </CardContent>
        </Card>

        <Card className="card">
          <CardHeader className="pb-2">
            <CardDescription>Timeline Events</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-500">No events yet</p>
          </CardContent>
        </Card>

        <Card className="card">
          <CardHeader className="pb-2">
            <CardDescription>Chat Logs</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-500">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/dashboard/case-studies">
            <Card className="card-hover cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center mb-3">
                  <Briefcase className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-lg">Add Case Study</CardTitle>
                <CardDescription>Create a new project showcase</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard/resources">
            <Card className="card-hover cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-600/10 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-lg">Upload Resource</CardTitle>
                <CardDescription>Share templates and tools</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard/timeline">
            <Card className="card-hover cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-cyan-600/10 flex items-center justify-center mb-3">
                  <Calendar className="h-6 w-6 text-cyan-400" />
                </div>
                <CardTitle className="text-lg">Add Timeline Event</CardTitle>
                <CardDescription>Document career milestones</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard/analytics">
            <Card className="card-hover cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-600/10 flex items-center justify-center mb-3">
                  <MessageSquare className="h-6 w-6 text-green-400" />
                </div>
                <CardTitle className="text-lg">View Chat Logs</CardTitle>
                <CardDescription>See visitor questions</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>

      {/* Setup Guide */}
      <Card className="card">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Complete these steps to set up your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs text-blue-400 font-bold">1</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-200">Update your profile</p>
              <p className="text-sm text-slate-400">Add your bio, headline, and profile picture</p>
              <Button asChild variant="link" size="sm" className="px-0 mt-1">
                <Link href="/dashboard/profile">
                  Update Profile <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs text-blue-400 font-bold">2</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-200">Add your first case study</p>
              <p className="text-sm text-slate-400">Showcase a project you're proud of</p>
              <Button asChild variant="link" size="sm" className="px-0 mt-1">
                <Link href="/dashboard/case-studies">
                  Add Case Study <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs text-blue-400 font-bold">3</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-200">Configure the RAG backend</p>
              <p className="text-sm text-slate-400">Set up the chatbot to answer questions about your work</p>
              <Button asChild variant="link" size="sm" className="px-0 mt-1">
                <a href="https://github.com/yourusername/portfolio#setup" target="_blank" rel="noopener noreferrer">
                  View Setup Guide <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

