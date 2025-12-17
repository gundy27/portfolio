'use client'

import { motion } from 'framer-motion'
import MagnetLines from '@/components/ui/MagnetLines'

interface HeroProps {
  name: string
  headline: string
}

export function Hero({ name, headline }: HeroProps) {
  return (
    <section className="section-spacing-large">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
              className="text-lg sm:text-xl lg:text-2xl text-body font-medium"
            >
              {headline}
            </motion.p>
          </div>
          
          <div className="flex justify-center lg:justify-end items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <MagnetLines
                rows={9}
                columns={9}
                containerSize="60vmin"
                lineColor="#efefef"
                lineWidth="0.8vmin"
                lineHeight="5vmin"
                baseAngle={0}
                style={{ margin: '0 auto' }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

