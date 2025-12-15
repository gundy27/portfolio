'use client'

import { motion } from 'framer-motion'

interface HeroProps {
  name: string
  headline: string
}

export function Hero({ name, headline }: HeroProps) {
  return (
    <section className="section-spacing-large">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-block">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-before-h1"
          >
            {name.toUpperCase()}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl text-body font-medium"
          >
            {headline}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

