'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TimelineHeader } from '@/components/timeline/TimelineHeader'
import { TimelineEntry } from '@/components/timeline/TimelineEntry'
import { TimelineImage } from '@/components/timeline/TimelineImage'
import { TimelineLine } from '@/components/timeline/TimelineLine'
import type { TimelineEvent } from '@/lib/content/types'

export default function TimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [stickyEvents, setStickyEvents] = useState<Set<string>>(new Set())
  const [activeEventId, setActiveEventId] = useState<string | null>(null)
  
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
  
  const handleStickyChange = (id: string, isSticky: boolean) => {
    setStickyEvents((prev) => {
      const next = new Set(prev)
      if (isSticky) {
        next.add(id)
        setActiveEventId(id)
      } else {
        next.delete(id)
        if (activeEventId === id) {
          const remaining = Array.from(next)
          setActiveEventId(remaining.length > 0 ? remaining[remaining.length - 1] : null)
        }
      }
      return next
    })
  }
  
  const currentEvent = events.find((e) => e.id === activeEventId) || null
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <TimelineHeader />
          
          {events.length > 0 ? (
            <div className="relative mt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left column - Timeline entries */}
                <div className="relative">
                  <div className="space-y-8">
                    {events.map((event) => (
                      <TimelineEntry
                        key={event.id}
                        event={event}
                        isSticky={stickyEvents.has(event.id)}
                        onStickyChange={handleStickyChange}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Right column - Image (hidden on small screens) */}
                <div className="hidden lg:block">
                  <TimelineImage currentEvent={currentEvent} />
                </div>
              </div>
              
              {/* Timeline line - fixed in middle, responsive */}
              <TimelineLine events={events} activeEventId={activeEventId} />
            </div>
          ) : (
            <div className="text-center mt-16 text-secondary">
              <p>No timeline events yet. Add events to the timeline content file.</p>
            </div>
          )}
        </div>
      </main>
      
      {profile && <Footer profile={profile} />}
    </div>
  )
}
