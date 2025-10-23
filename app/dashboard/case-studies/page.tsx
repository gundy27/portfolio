import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const metadata = {
  title: 'Manage Case Studies | Dashboard',
}

export default function DashboardCaseStudiesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Case Studies</h1>
          <p className="text-slate-400">
            Create and manage your project showcases
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Case Study
        </Button>
      </div>

      <Card className="card">
        <CardHeader>
          <CardTitle>No Case Studies Yet</CardTitle>
          <CardDescription>
            Get started by creating your first case study. Showcase your projects with detailed problem statements, solutions, and results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500 mb-4">
            Case study management interface will be implemented in Phase 8 of the project plan.
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Case Study
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

