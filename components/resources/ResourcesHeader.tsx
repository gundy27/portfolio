'use client'

import { motion } from 'framer-motion'

export function ResourcesHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-before-h2"
    >
      <h1>Resources</h1>
      <p className="text-secondary mt-4">
        Arrows in my quiver that have helped me hit my targets, maybe they will for you as well.
      </p>
    </motion.div>
  )
}

