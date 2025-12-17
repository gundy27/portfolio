'use client'

// Framer Motion for animations
import { motion } from 'framer-motion'

export function TimelineHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold text-primary mb-32">
        Career Timeline
      </h1>
      
      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center text-secondary"
      >
        <span className="text-sm font-label uppercase tracking-wider mb-2">Scroll to explore</span>
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-label="Scroll down indicator"
        >
          <title>Scroll down</title>
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

