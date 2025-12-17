'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { TimelineEvent } from '@/lib/content/types'
import { Label } from '@/components/ui/Label'

interface TimelineSectionProps {
  event: TimelineEvent
  alignment: 'left' | 'right'
  index: number
  isActive: boolean
  color?: string
}

export const TimelineSection = forwardRef<HTMLElement, TimelineSectionProps>(function TimelineSection(
  { event, alignment, index, isActive, color },
  ref
) {
  const formatDate = (date: string) => {
    const [year, month] = date.split('-')
    return `${new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'short' })} ${year}`
  }

  const dateRange = event.endDate
    ? `${formatDate(event.startDate)} - ${formatDate(event.endDate)}`
    : `${formatDate(event.startDate)} - Present`

  const eventColor = color ?? event.color ?? '#4A67FF'

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
        when: 'beforeChildren' as const,
        staggerChildren: 0.06,
        delayChildren: 0.12,
      },
    },
  }

  const contentItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  }

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  }

  // Content block component
  const ContentBlock = (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      className="flex flex-col justify-center h-full px-6 sm:px-8 lg:px-12"
    >
      <motion.div
        variants={cardVariants}
        className="max-w-xl bg-white rounded-lg border border-gray-200 p-6 sm:p-8 shadow-sm transition-colors duration-300"
        style={isActive ? { borderLeftWidth: 4, borderLeftColor: eventColor } : undefined}
      >
        <motion.div variants={contentItemVariants} className="text-secondary text-xs sm:text-sm mb-3">
          {dateRange}
        </motion.div>

        <motion.h3
          variants={contentItemVariants}
          className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-4 transition-colors duration-300"
          style={{ color: isActive ? eventColor : '#111111' }}
        >
          {event.company}
        </motion.h3>

        <motion.h4
          variants={contentItemVariants}
          className="font-heading text-lg sm:text-xl lg:text-2xl font-medium text-primary mb-4 sm:mb-6"
        >
          {event.role}
        </motion.h4>

        <motion.p
          variants={contentItemVariants}
          className="text-base sm:text-lg mb-6 text-body leading-relaxed"
        >
          {event.description}
        </motion.p>

        <motion.div variants={contentItemVariants} className="flex flex-wrap gap-2 mb-6">
          {event.tags.map((tag) => (
            <Label key={tag}>{tag}</Label>
          ))}
        </motion.div>

        {event.projectLinks && event.projectLinks.length > 0 && (
          <motion.div variants={contentItemVariants} className="space-y-2">
            <Label variant="accent">Related Projects:</Label>
            <div className="flex flex-wrap gap-3 mt-2">
              {event.projectLinks.map((projectId) => (
                <Link
                  key={projectId}
                  href={`/projects/${projectId}`}
                  className="hover:underline text-sm sm:text-base font-medium"
                  style={{ color: eventColor }}
                >
                  View Project →
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )

  // Image block component
  const ImageBlock = (
    <div className="relative h-full">
      <div className="sticky top-1/2 -translate-y-1/2 h-screen flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={imageVariants}
          animate={{
            opacity: isActive ? 1 : 0.08,
            scale: isActive ? 1 : 0.98,
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="relative w-full h-[60vh] sm:h-[70vh] rounded-lg overflow-hidden bg-gray-100 shadow-lg"
        >
          <Image
            src={event.image}
            alt={event.company}
            fill
            className="object-contain"
            priority={index < 2}
          />
        </motion.div>
      </div>
    </div>
  )

  return (
    <section 
      className="timeline-snap-section min-h-screen"
      data-event-id={event.id}
      data-timeline-index={index}
      ref={ref}
    >
      {/* Desktop: Two-column grid with alternating layout */}
      <div className="hidden lg:grid lg:grid-cols-2 min-h-screen">
        {alignment === 'left' ? (
          <>
            {ContentBlock}
            {ImageBlock}
          </>
        ) : (
          <>
            {ImageBlock}
            {ContentBlock}
          </>
        )}
      </div>

      {/* Mobile/Tablet: Stacked layout */}
      <div className="lg:hidden min-h-screen flex flex-col">
        {/* Content only by default (images intentionally hidden on mobile) */}
        <div className="flex-1 flex items-start py-8 pl-10 sm:pl-14">
          {ContentBlock}
        </div>
      </div>
    </section>
  )
})
