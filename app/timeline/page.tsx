'use client'

// React hooks
import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TimelineHeader } from '@/components/timeline/TimelineHeader'
import { TimelineSection } from '@/components/timeline/TimelineSection'
import type { TimelineEvent, Profile } from '@/lib/content/types'

export default function TimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    fetch('/api/timeline')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(() => setEvents([]))

    fetch('/api/profile')
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(() => setProfile({ email: '', name: '', headline: '', tagline: '', bio: '', links: {} }))
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container-wide">
          <div className="text-center">
            <TimelineHeader />
          </div>

          <div className="mt-16 relative">
            {/* Subtle vertical timeline line */}
            <div className="absolute left-2 sm:left-3 top-0 bottom-0 w-px bg-gray-200" aria-hidden="true" />

            {events.length > 0 ? (
              <ul>
                {events.map((event, index) => (
                  <TimelineSection
                    key={event.id}
                    event={event}
                    index={index}
                  />
                ))}
              </ul>
            ) : (
              <div className="text-center text-secondary py-24">
                <p>No timeline events yet. Add events to `content/timeline/events.json`.</p>
              </div>
            )}
          </div>
        </div>

        {profile && (
          <div className="mt-24">
            <Footer profile={profile} />
          </div>
        )}
      </main>
    </div>
  )
}
