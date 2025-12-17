'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TimelineHeader } from '@/components/timeline/TimelineHeader'
import { TimelineSection } from '@/components/timeline/TimelineSection'
import { TimelineProgressLine } from '@/components/timeline/TimelineProgressLine'
import type { TimelineEvent, Profile } from '@/lib/content/types'

export default function TimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

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

  // Track which section is currently in view
  const handleScroll = useCallback(() => {
    if (!containerRef.current || events.length === 0) return

    const container = containerRef.current
    const scrollTop = container.scrollTop
    const sectionHeight = container.clientHeight
    
    // Calculate which section we're in (accounting for header section)
    const currentSection = Math.round(scrollTop / sectionHeight) - 1 // -1 for header
    const clampedIndex = Math.max(0, Math.min(currentSection, events.length - 1))
    
    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex)
    }
  }, [events.length, activeIndex])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Scroll snap container */}
      <main 
        ref={containerRef}
        className="flex-1 timeline-snap-container"
      >
        {/* Header section - snap point */}
        <section className="timeline-snap-section min-h-screen flex items-center justify-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TimelineHeader />
          </div>
        </section>

        {/* Timeline sections */}
        {events.length > 0 ? (
          <>
            {events.map((event, index) => (
              <TimelineSection
                key={event.id}
                event={event}
                alignment={index % 2 === 0 ? 'left' : 'right'}
                index={index}
                isActive={index === activeIndex}
              />
            ))}

            {/* Progress line overlay */}
            <TimelineProgressLine
              events={events}
              activeIndex={activeIndex}
              containerRef={containerRef}
            />
          </>
        ) : (
          <section className="timeline-snap-section min-h-screen flex items-center justify-center">
            <div className="text-center text-secondary">
              <p>No timeline events yet. Add events to the timeline content file.</p>
            </div>
          </section>
        )}

        {/* Footer section - snap point */}
        {profile && (
          <section className="timeline-snap-section min-h-screen flex flex-col">
            <div className="flex-1" />
            <Footer profile={profile} />
          </section>
        )}
      </main>
    </div>
  )
}
