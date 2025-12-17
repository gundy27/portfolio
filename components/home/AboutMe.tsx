'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { RotatingText } from '@/components/ui/RotatingText'
import { SectionHeader } from '@/components/ui/SectionHeader'

interface AboutMeProps {
  tagline: string
  rotatingText?: string[]
}

export function AboutMe({ tagline, rotatingText = [] }: AboutMeProps) {
  return (
    <section className="section-spacing-large !mb-32 sm:!mb-48 lg:!mb-64">
      <div className="container-wide">
        <div className="text-block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-before-h2"
          >
            <SectionHeader
              label="ABOUT ME"
              heading="About Me"
              headingLevel="h2"
            />
          </motion.div>
          
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

