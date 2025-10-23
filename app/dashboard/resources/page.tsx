import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

export const metadata = {
  title: 'Manage Resources | Dashboard',
}

export default function DashboardResourcesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Resources</h1>
          <p className="text-slate-400">
            Upload and manage downloadable templates and resources
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Resource
        </Button>
      </div>

      <Card className="card">
        <CardHeader>
          <CardTitle>No Resources Yet</CardTitle>
          <CardDescription>
            Start sharing your knowledge by uploading templates, documents, code snippets, and other helpful resources.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500 mb-4">
            Resource management interface will be implemented in Phase 8 of the project plan.
          </p>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload First Resource
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

