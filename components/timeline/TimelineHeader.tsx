'use client'

import { motion } from 'framer-motion'

export function TimelineHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-before-h2"
    >
      <h1>Career Timeline</h1>
      <p className="text-secondary mt-4">Scroll down to explore my career journey</p>
    </motion.div>
  )
}

