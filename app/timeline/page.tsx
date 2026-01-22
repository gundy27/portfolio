import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { GetInTouch } from '@/components/layout/GetInTouch'
import { TimelineHeader } from '@/components/timeline/TimelineHeader'
import { TimelineSticky } from '@/components/timeline/TimelineSticky'
import { getTimelineEvents } from '@/lib/content/loader.server'

const formatDateRange = (startDate: string, endDate: string | null) => {
  const startYear = startDate.split('-')[0] || startDate
  const endYear = endDate ? endDate.split('-')[0] || endDate : 'Present'
  return `${startYear} – ${endYear}`
}

export default function TimelinePage() {
  const timelineEvents = getTimelineEvents()
  const timelineEntries = timelineEvents.map((event) => ({
    dateRange: formatDateRange(event.startDate, event.endDate),
    company: event.company,
    title: event.role,
    description: event.description,
    tags: event.tags,
    imageUrl: event.image,
  }))

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container-wide">
          <div className="text-center">
            <TimelineHeader />
          </div>

          {timelineEntries.length === 0 ? (
            <div className="mt-16 text-center text-secondary">
              <p>No timeline entries yet. Add events to the content file to get started.</p>
            </div>
          ) : (
            <TimelineSticky entries={timelineEntries} />
          )}
        </div>
      </main>

      <GetInTouch />
      <Footer />
    </div>
  )
}
