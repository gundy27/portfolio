import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Analytics | Dashboard',
}

export default function DashboardAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-2">Analytics</h1>
        <p className="text-slate-400">
          View chatbot conversation logs and visitor analytics
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="card">
          <CardHeader className="pb-2">
            <CardDescription>Total Conversations</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-500">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="card">
          <CardHeader className="pb-2">
            <CardDescription>Avg. Messages per Session</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-500">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="card">
          <CardHeader className="pb-2">
            <CardDescription>Citations Used</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-500">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card className="card">
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
          <CardDescription>
            Recent chatbot interactions and visitor questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500">
            Conversation logs will appear here once the RAG backend is integrated and visitors start using the chatbot.
          </p>
        </CardContent>
      </Card>

      <Card className="card">
        <CardHeader>
          <CardTitle>Popular Questions</CardTitle>
          <CardDescription>
            Most frequently asked questions by visitors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500">
            Analytics interface will be implemented in Phase 8 of the project plan.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

