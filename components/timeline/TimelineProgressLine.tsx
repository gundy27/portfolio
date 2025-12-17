'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { TimelineEvent } from '@/lib/content/types'

interface TimelineProgressLineProps {
  events: TimelineEvent[]
  activeIndex: number
  containerRef: React.RefObject<HTMLDivElement | null>
}

export function TimelineProgressLine({ events, activeIndex, containerRef }: TimelineProgressLineProps) {
  const [isMounted, setIsMounted] = useState(false)
  
  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  // Transform scroll progress to line height percentage
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || events.length === 0) return null

  return (
    <>
      {/* Desktop: Centered progress line */}
      <div className="hidden lg:block fixed left-1/2 top-0 bottom-0 -translate-x-1/2 z-20 pointer-events-none">
        {/* Background line (gray) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-24 bottom-24 w-0.5 bg-gray-200" />
        
        {/* Progress line (accent color) */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 top-24 w-0.5 bg-accent origin-top"
          style={{ height: lineHeight }}
        />

        {/* Event dots */}
        <div className="absolute left-1/2 -translate-x-1/2 top-24 bottom-24 flex flex-col justify-between">
          {events.map((event, index) => {
            const isCompleted = index < activeIndex
            const isActive = index === activeIndex
            
            return (
              <motion.div
                key={event.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative flex items-center justify-center"
              >
                {/* Dot */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    backgroundColor: isCompleted || isActive ? '#4A67FF' : '#FFFFFF',
                    borderColor: isCompleted || isActive ? '#4A67FF' : '#9CA3AF',
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-4 h-4 rounded-full border-2"
                />
                
                {/* Active pulse ring */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute w-4 h-4 rounded-full bg-accent"
                  />
                )}

                {/* Year label - alternating sides */}
                <motion.span
                  initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  className={`absolute whitespace-nowrap text-xs font-label uppercase tracking-wider ${
                    isActive ? 'text-accent font-semibold' : 'text-secondary'
                  } ${index % 2 === 0 ? 'right-8' : 'left-8'}`}
                >
                  {event.startDate.split('-')[0]}
                </motion.span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Mobile/Tablet: Right side progress line */}
      <div className="lg:hidden fixed right-4 top-24 bottom-24 z-20 pointer-events-none">
        {/* Background line */}
        <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gray-200" />
        
        {/* Progress line */}
        <motion.div 
          className="absolute right-0 top-0 w-0.5 bg-accent origin-top"
          style={{ height: lineHeight }}
        />

        {/* Event dots */}
        <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between">
          {events.map((event, index) => {
            const isCompleted = index < activeIndex
            const isActive = index === activeIndex
            
            return (
              <motion.div
                key={event.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative -translate-x-1/2"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    backgroundColor: isCompleted || isActive ? '#4A67FF' : '#FFFFFF',
                    borderColor: isCompleted || isActive ? '#4A67FF' : '#9CA3AF',
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-3 h-3 rounded-full border-2"
                />
                
                {isActive && (
                  <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 w-3 h-3 rounded-full bg-accent"
                  />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </>
  )
}
