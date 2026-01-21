import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TimelineHeader } from '@/components/timeline/TimelineHeader'
import { TimelineSection } from '@/components/timeline/TimelineSection'
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
            <div className="mt-20 relative">
              {/* Single vertical timeline line (not a rigid grid) */}
              <div
                className="absolute left-4 sm:left-6 lg:left-8 top-0 bottom-0 w-px bg-gray-200"
                aria-hidden="true"
              />

              <ul className="space-y-14 sm:space-y-20">
                {timelineEntries.map((entry) => (
                  <TimelineSection key={`${entry.company}-${entry.dateRange}`} {...entry} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
