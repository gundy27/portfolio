'use client'

import { motion } from 'framer-motion'
import type { TimelineEvent } from '@/lib/content/types'

interface TimelineLineProps {
  events: TimelineEvent[]
  activeEventId: string | null
}

export function TimelineLine({ events, activeEventId }: TimelineLineProps) {
  return (
    <>
      {/* Desktop: Fixed in middle (between columns) */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 z-0">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${
              activeEventId === event.id
                ? 'bg-accent border-accent'
                : 'bg-white border-gray-400'
            }`}
            style={{
              top: `${(index / events.length) * 100}%`,
            }}
          />
        ))}
      </div>
      
      {/* Mobile/Tablet: Fixed on right */}
      <div className="lg:hidden absolute right-0 top-0 bottom-0 w-0.5 bg-gray-200 z-0">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`absolute right-0 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${
              activeEventId === event.id
                ? 'bg-accent border-accent'
                : 'bg-white border-gray-400'
            }`}
            style={{
              top: `${(index / events.length) * 100}%`,
            }}
          />
        ))}
      </div>
    </>
  )
}

