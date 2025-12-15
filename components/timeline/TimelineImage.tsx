'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import type { TimelineEvent } from '@/lib/content/types'

interface TimelineImageProps {
  currentEvent: TimelineEvent | null
}

export function TimelineImage({ currentEvent }: TimelineImageProps) {
  return (
    <div className="sticky top-32 h-[600px] z-10">
      <AnimatePresence mode="wait">
        {currentEvent ? (
          <motion.div
            key={currentEvent.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full rounded-lg overflow-hidden bg-gray-100"
          >
            <Image
              src={currentEvent.image}
              alt={currentEvent.company}
              fill
              className="object-cover"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center"
          >
            <p className="text-secondary">Some sort of helpful illustration that fades in depending on where user is at in timeline</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

