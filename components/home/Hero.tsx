'use client'

import { motion } from 'framer-motion'
import MagnetLines from '@/components/ui/MagnetLines'
import TextType from '@/components/ui/TextType'
import { Label } from '@/components/ui/Label'

interface HeroProps {
  name: string
}

export function Hero({ name }: HeroProps) {
  return (
    <section className="section-spacing-large">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-block">
            <div className="space-before-h1">
              <Label className="text-accent section-label text-center">
                SENIOR PRODUCT MANAGER
              </Label>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-3"
              >
                {name.toUpperCase()}
              </motion.h1>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TextType
                as="p"
                className="text-lg sm:text-xl lg:text-2xl text-body font-medium"
                text={[
                  'Growth Product Manager',
                  'AI Implementation Technologist',
                  'Product Strategy Consultant',
                  'UX Designer',
                  'Avid Golfer'
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />
            </motion.div>
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

