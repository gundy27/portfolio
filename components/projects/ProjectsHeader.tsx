'use client'

import { motion } from 'framer-motion'

export function ProjectsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-before-h2"
    >
      <h1>Projects</h1>
      <p className="text-secondary mt-4">Deep dive into work that I am most proud of</p>
    </motion.div>
  )
}

