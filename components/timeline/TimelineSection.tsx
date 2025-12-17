'use client'

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
}

export function TimelineSection({ event, alignment, index, isActive }: TimelineSectionProps) {
  const formatDate = (date: string) => {
    const [year, month] = date.split('-')
    return `${new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'short' })} ${year}`
  }

  const dateRange = event.endDate
    ? `${formatDate(event.startDate)} - ${formatDate(event.endDate)}`
    : `${formatDate(event.startDate)} - Present`

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
    }
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
      viewport={{ once: true, amount: 0.3 }}
      variants={contentVariants}
      className="flex flex-col justify-center h-full px-6 sm:px-8 lg:px-12"
    >
      <div className="max-w-xl">
        <div className="text-secondary text-xs sm:text-sm mb-3">{dateRange}</div>
        <h3 className={`font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-4 transition-colors duration-300 ${isActive ? 'text-accent' : 'text-primary'}`}>
          {event.company}
        </h3>
        <h4 className="font-heading text-lg sm:text-xl lg:text-2xl font-medium text-primary mb-4 sm:mb-6">
          {event.role}
        </h4>
        <p className="text-base sm:text-lg mb-6 text-body leading-relaxed">
          {event.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {event.tags.map((tag) => (
            <Label key={tag}>{tag}</Label>
          ))}
        </div>

        {event.projectLinks && event.projectLinks.length > 0 && (
          <div className="space-y-2">
            <Label variant="accent">Related Projects:</Label>
            <div className="flex flex-wrap gap-3 mt-2">
              {event.projectLinks.map((projectId) => (
                <Link
                  key={projectId}
                  href={`/projects/${projectId}`}
                  className="text-accent hover:underline text-sm sm:text-base font-medium"
                >
                  View Project →
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )

  // Image block component
  const ImageBlock = (
    <div className="relative h-full">
      <div className="sticky top-0 h-screen flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={imageVariants}
          className="relative w-full h-[60vh] sm:h-[70vh] rounded-lg overflow-hidden bg-gray-100 shadow-lg"
        >
          <Image
            src={event.image}
            alt={event.company}
            fill
            className="object-cover"
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
        {/* Image at top */}
        <div className="h-[40vh] sm:h-[45vh] relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
            className="relative w-full h-full"
          >
            <Image
              src={event.image}
              alt={event.company}
              fill
              className="object-cover"
              priority={index < 2}
            />
          </motion.div>
        </div>
        
        {/* Content below */}
        <div className="flex-1 flex items-start py-8">
          {ContentBlock}
        </div>
      </div>
    </section>
  )
}
