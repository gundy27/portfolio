'use client'

import * as React from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils/cn'

export type TimelineEntry = {
  dateRange: string
  company: string
  title: string
  description: string
  tags: readonly string[]
  imageUrl?: string
}

type TimelineStickyProps = {
  entries: readonly TimelineEntry[]
}

export function TimelineSticky({ entries }: TimelineStickyProps) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const sectionRefs = React.useRef<Array<HTMLElement | null>>([])

  React.useEffect(() => {
    const getNodes = () => sectionRefs.current.filter(Boolean) as HTMLElement[]

    const pickClosestToCenter = () => {
      const nodes = getNodes()
      if (!nodes.length) return

      const viewportCenter = window.innerHeight / 2
      let bestIdx = 0
      let bestDistance = Number.POSITIVE_INFINITY

      for (const node of nodes) {
        const rect = node.getBoundingClientRect()
        // Only consider items that are at least partially on screen.
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) continue
        const nodeCenter = rect.top + rect.height / 2
        const dist = Math.abs(nodeCenter - viewportCenter)
        if (dist < bestDistance) {
          bestDistance = dist
          const idx = Number((node as HTMLElement).dataset.index)
          if (Number.isFinite(idx)) bestIdx = idx
        }
      }

      setActiveIndex((prev) => (prev === bestIdx ? prev : bestIdx))
    }

    // Extra fallback: some layouts/browsers can be finicky; keep index in sync on scroll.
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        pickClosestToCenter()
      })
    }

    let observer: IntersectionObserver | null = null
    let initRaf = 0

    const init = () => {
      const nodes = getNodes()
      if (!nodes.length) {
        initRaf = window.requestAnimationFrame(init)
        return
      }

      observer = new IntersectionObserver(
        (observerEntries) => {
          const visible = observerEntries
            .filter((e) => e.isIntersecting)
            .map((e) => {
              const idx = Number((e.target as HTMLElement).dataset.index)
              const rect = e.boundingClientRect
              const distanceToCenter = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2)
              return { idx, ratio: e.intersectionRatio, distanceToCenter }
            })
            .sort((a, b) => b.ratio - a.ratio || a.distanceToCenter - b.distanceToCenter)

          if (visible[0] && Number.isFinite(visible[0].idx)) {
            setActiveIndex(visible[0].idx)
            return
          }

          // Fallback: if nothing is intersecting within our “center band”, pick the closest.
          pickClosestToCenter()
        },
        {
          root: null,
          rootMargin: '-35% 0px -55% 0px',
          threshold: [0.15, 0.3, 0.5, 0.7],
        }
      )

      nodes.forEach((n) => {
        observer?.observe(n)
      })

      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll, { passive: true })
      // Prime initial state.
      onScroll()
    }

    init()

    return () => {
      if (initRaf) window.cancelAnimationFrame(initRaf)
      if (observer) observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  const safeActiveIndex = Math.min(Math.max(activeIndex, 0), Math.max(entries.length - 1, 0))
  const active = entries[safeActiveIndex]

  if (!entries.length) return null

  return (
    <section className="mt-20">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {/* Left: timeline */}
        <div className="relative">
          {/* Single vertical timeline line */}
          <div className="absolute left-4 sm:left-6 lg:left-8 top-0 bottom-0 w-px bg-gray-200" aria-hidden="true" />

          <ul className="space-y-14 sm:space-y-20">
            {entries.map((entry, i) => {
              const isActive = i === safeActiveIndex
              return (
                <li
                  key={`${entry.company}-${entry.dateRange}`}
                  ref={(el) => {
                    sectionRefs.current[i] = el
                  }}
                  data-index={i}
                  className="relative pl-12 sm:pl-16 lg:pl-20 py-14 sm:py-16 lg:py-20 min-h-[82vh] scroll-mt-28"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.25, margin: '-10% 0px -55% 0px' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    {/* Timeline marker (aligned to the vertical line) */}
                    <span
                      className={cn(
                        'absolute left-4 sm:left-6 lg:left-8 top-16 w-3.5 h-3.5 rounded-full border-2 bg-white transition-colors',
                        'border-accent',
                        isActive && 'bg-accent'
                      )}
                      aria-hidden="true"
                    />

                    <div className="max-w-[48rem]">
                      <div className="text-secondary text-xs sm:text-sm mb-3">{entry.dateRange}</div>

                      <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary mb-3">
                        {entry.company}
                      </h3>

                      <h4 className="font-heading text-lg sm:text-xl font-medium text-primary mb-5">{entry.title}</h4>

                      <p className="text-body text-base sm:text-lg leading-relaxed mb-8">{entry.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag) => (
                          <Label key={tag}>{tag}</Label>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Right: sticky image/details */}
        <div className="md:sticky md:top-24 md:self-start">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="relative aspect-[4/3] w-full bg-gray-50">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${active.company}-${active.dateRange}`}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {active.imageUrl ? (
                    <Image src={active.imageUrl} alt={`${active.company} image`} fill className="object-contain p-10" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-secondary text-sm">
                      Image placeholder
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-1 p-5">
              <p className="text-xs font-label uppercase tracking-wider text-secondary">{active.dateRange}</p>
              <p className="text-base font-heading font-semibold text-primary">{active.company}</p>
              <p className="text-sm text-secondary">{active.title}</p>
              <p className="text-sm text-secondary mt-2">{active.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

