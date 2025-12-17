'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RotatingTextProps {
  items: string[]
  className?: string
}

export function RotatingText({ items, className }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Calculate the maximum width needed to accommodate all items
  const maxWidth = useMemo(() => {
    if (items.length === 0) return 'auto'
    // Find the longest item and estimate width (rough approximation)
    const longestItem = items.reduce((a, b) => (a.length > b.length ? a : b))
    // Use a reasonable min-width based on character count
    // Approximately 0.5rem per character for label font at smaller size
    return `${Math.max(longestItem.length * 0.5, 7)}rem`
  }, [items])

  useEffect(() => {
    if (items.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [items.length])

  if (items.length === 0) return null

  return (
    <span className={className}>
      <span 
        className="inline-block relative overflow-hidden text-center"
        style={{ minWidth: maxWidth }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="inline-block font-label text-[10px] leading-tight"
          >
            {items[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}

