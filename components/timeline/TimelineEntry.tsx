'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import type { TimelineEvent } from '@/lib/content/types'
import { Label } from '@/components/ui/Label'

interface TimelineEntryProps {
  event: TimelineEvent
  isSticky: boolean
  onStickyChange: (id: string, isSticky: boolean) => void
}

export function TimelineEntry({ event, isSticky, onStickyChange }: TimelineEntryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-50% 0px' })
  
  useEffect(() => {
    if (inView && !isSticky) {
      onStickyChange(event.id, true)
    } else if (!inView && isSticky) {
      onStickyChange(event.id, false)
    }
  }, [inView, isSticky, event.id, onStickyChange])
  
  const formatDate = (date: string) => {
    const [year, month] = date.split('-')
    return `${new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'short' })} ${year}`
  }
  
  const dateRange = event.endDate
    ? `${formatDate(event.startDate)} - ${formatDate(event.endDate)}`
    : `${formatDate(event.startDate)} - Present`
  
  return (
    <div ref={ref} className="relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`subsection-spacing ${isSticky ? 'sticky top-32' : ''}`}
      >
        <div className={`text-block pr-8 lg:pr-12 ${isSticky ? 'border-l-4 border-accent pl-6' : ''}`}>
          <div className="text-secondary text-sm mb-2">{dateRange}</div>
          <h3 className={`font-heading text-2xl font-semibold text-primary mb-4 ${isSticky ? 'text-accent' : ''}`}>
            {event.company}
          </h3>
          <h4 className="font-heading text-lg font-medium text-primary mb-4">{event.role}</h4>
          <p className="mb-4">{event.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.map((tag) => (
              <Label key={tag}>{tag}</Label>
            ))}
          </div>
          
          {event.projectLinks && event.projectLinks.length > 0 && (
            <div className="space-y-2">
              <Label>Related Projects:</Label>
              <div className="flex flex-wrap gap-2">
                {event.projectLinks.map((projectId) => (
                  <Link
                    key={projectId}
                    href={`/projects/${projectId}`}
                    className="text-accent hover:underline"
                  >
                    View Project →
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

