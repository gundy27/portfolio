'use client'

import { motion } from 'framer-motion'
import { Label } from '@/components/ui/Label'

interface HeroProps {
  name: string
}

const defaultBio =
  'Dan is a Senior Product Manager with 12+ years of experience who is exploring a pivot into Growth Engineering. He specializes in building scalable systems that consistently turn complexity into activation, retention, and revenue. Based out of Irvine, CA but open to remote work.'

export function Hero({ name }: HeroProps) {
  return (
    <section className="section-spacing-large relative py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <div className="space-before-h1 max-w-2xl">
          <Label className="text-accent section-label">ABOUT</Label>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-3"
          >
            {name}
          </motion.h1>
          <p className="text-base sm:text-lg text-[var(--color-text-body)]">{defaultBio}</p>
        </div>
      </div>
    </section>
  )
}

