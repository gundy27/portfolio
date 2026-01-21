'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Label } from '@/components/ui/Label'

interface TimelineSectionProps {
  dateRange: string
  company: string
  title: string
  description: string
  tags: readonly string[]
  imageUrl?: string
}

export function TimelineSection({
  dateRange,
  company,
  title,
  description,
  tags,
  imageUrl,
}: TimelineSectionProps) {
  const sectionRef = useRef<HTMLLIElement | null>(null)

  /**
   * Scroll math (per-section):
   * - progress = 0 when the section's top hits the bottom of the viewport
   * - progress = 1 when the section's bottom hits the top of the viewport
   *
   * This gives us a stable 0..1 signal to:
   * - fade/slide text in near the start
   * - keep it readable through the middle
   * - fade it out near the end
   *
   * Sticky note:
   * - the media column uses `lg:sticky` so it "pins" within this section only.
   * - it naturally unpins when the section scrolls out because sticky is bounded by the section height.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const textOpacity = useTransform(scrollYProgress, [0, 0.18, 0.62, 0.88, 1], [0, 1, 1, 0.25, 0])
  const textY = useTransform(scrollYProgress, [0, 0.18, 0.62, 0.9, 1], [22, 0, 0, -10, -22])

  const mediaOpacity = useTransform(scrollYProgress, [0, 0.2, 0.65, 0.9, 1], [0, 1, 1, 0.35, 0])
  const mediaY = useTransform(scrollYProgress, [0, 0.25, 0.7, 1], [56, 0, 0, -28])
  const mediaScale = useTransform(scrollYProgress, [0, 0.3, 1], [0.985, 1, 1.01])

  return (
    <li
      ref={sectionRef}
      className="relative pl-12 sm:pl-16 lg:pl-20 py-14 sm:py-16 lg:py-20 min-h-[90vh] lg:min-h-[110vh]"
    >
      {/* Timeline marker (aligned to the page-level vertical line) */}
      <span
        className="absolute left-4 sm:left-6 lg:left-8 top-16 w-3.5 h-3.5 rounded-full border-2 bg-white"
        style={{ borderColor: '#598392' }}
        aria-hidden="true"
      />

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
        {/* Mobile: media above text (no sticky) */}
        <div className="order-0 lg:order-none w-full lg:w-[44%]">
          <div className="lg:sticky lg:top-[18vh]">
            <motion.div
              style={{ opacity: mediaOpacity, y: mediaY, scale: mediaScale }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shadow-sm"
            >
              {imageUrl ? (
                <Image src={imageUrl} alt={`${company} image`} fill className="object-contain p-10" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-secondary text-sm">
                  Image placeholder
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Text column (aligned near the timeline line, with generous whitespace) */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="order-1 lg:order-none w-full lg:flex-1"
        >
          <div className="max-w-[48rem]">
            <div className="text-secondary text-xs sm:text-sm mb-3">{dateRange}</div>

            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary mb-3">
              {company}
            </h3>

            <h4 className="font-heading text-lg sm:text-xl font-medium text-primary mb-5">{title}</h4>

            <p className="text-body text-base sm:text-lg leading-relaxed mb-8">{description}</p>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Label key={tag}>{tag}</Label>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </li>
  )
}
