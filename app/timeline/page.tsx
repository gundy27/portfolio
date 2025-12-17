'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
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
  const sectionElsRef = useRef<(HTMLElement | null)[]>([])

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

  const isDesktopSnap = useMemo(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(min-width: 1024px)').matches
  }, [])

  // Track which timeline section is active (excludes header/footer snap sections)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (!events.length) return

    const els = sectionElsRef.current.filter(Boolean) as HTMLElement[]
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))

        const top = intersecting[0]
        if (!top?.target) return

        const idx = Number((top.target as HTMLElement).dataset.timelineIndex)
        if (Number.isFinite(idx)) setActiveIndex(idx)
      },
      {
        root: container,
        // Treat the middle band of the viewport as the activation zone.
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    els.forEach((el) => {
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [events.length])

  const setSectionEl = (index: number) => (el: HTMLElement | null) => {
    sectionElsRef.current[index] = el
  }

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
                color={event.color}
                ref={setSectionEl(index)}
              />
            ))}

            {/* Progress line overlay */}
            <TimelineProgressLine
              events={events}
              activeIndex={activeIndex}
              containerRef={containerRef}
              isDesktopSnap={isDesktopSnap}
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
