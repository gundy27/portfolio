import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'

export const metadata = {
  title: 'Profile Settings | Dashboard',
}

export default function DashboardProfilePage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-2">Profile Settings</h1>
        <p className="text-slate-400">
          Manage your personal information and profile details
        </p>
      </div>

      <Card className="card">
        <CardHeader>
          <CardTitle>Profile Management</CardTitle>
          <CardDescription>
            Update your name, headline, bio, and profile picture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500 mb-4">
            Profile management interface will be implemented in Phase 8 of the project plan.
          </p>
          <p className="text-sm text-slate-400 mb-6">
            Current profile information is loaded from the database. You'll be able to edit:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-400 mb-6">
            <li>Name and headline</li>
            <li>Bio and about section</li>
            <li>Profile picture</li>
            <li>Contact email</li>
          </ul>
          <Button disabled>
            <Save className="mr-2 h-4 w-4" />
            Save Changes (Coming Soon)
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

