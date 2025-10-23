import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

export const metadata = {
  title: 'Media Library | Dashboard',
}

export default function DashboardMediaPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Media Library</h1>
          <p className="text-slate-400">
            Upload and manage images, videos, gifs, and other media files
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </div>

      <Card className="card">
        <CardHeader>
          <CardTitle>Media Library</CardTitle>
          <CardDescription>
            Centralized storage for all your portfolio media assets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500 mb-4">
            Media library interface will be implemented in Phase 8 of the project plan.
          </p>
          <p className="text-sm text-slate-400 mb-6">
            Features will include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-400 mb-6">
            <li>Upload images, videos, gifs, and audio files</li>
            <li>Preview media with metadata</li>
            <li>Search and filter by type</li>
            <li>Storage analytics and usage</li>
            <li>Direct integration with case studies and resources</li>
          </ul>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Media
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

