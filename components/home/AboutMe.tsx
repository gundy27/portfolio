'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { RotatingText } from '@/components/ui/RotatingText'

interface AboutMeProps {
  tagline: string
  rotatingText?: string[]
}

export function AboutMe({ tagline, rotatingText = [] }: AboutMeProps) {
  return (
    <section className="section-spacing-large">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-block">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-before-h2"
          >
            About Me
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p>{tagline}</p>
            
            <p>
              Sometimes, that takes the form of:{' '}
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full">
                <RotatingText items={rotatingText} />
              </span>
            </p>
            
            <div className="pt-4">
              <Button asChild href="/timeline" size="lg">
                VIEW MY JOURNEY
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

