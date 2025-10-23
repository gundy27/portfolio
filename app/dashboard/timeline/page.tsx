import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const metadata = {
  title: 'Manage Timeline | Dashboard',
}

export default function DashboardTimelinePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Timeline</h1>
          <p className="text-slate-400">
            Document your career journey and professional milestones
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <Card className="card">
        <CardHeader>
          <CardTitle>No Timeline Events Yet</CardTitle>
          <CardDescription>
            Build your professional timeline by adding work experience, education, achievements, and key milestones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500 mb-4">
            Timeline management interface will be implemented in Phase 8 of the project plan.
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add First Event
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

