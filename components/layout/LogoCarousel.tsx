'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface Logo {
  name: string
  image: string
  url?: string
}

interface LogoCarouselProps {
  logos: Logo[]
}

export function LogoCarousel({ logos }: LogoCarouselProps) {
  return (
    <div className="overflow-hidden py-8">
      <motion.div
        className="flex gap-12"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
          },
        }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex-shrink-0 h-12 w-32 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
          >
            {logo.url ? (
              <a href={logo.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={128}
                  height={48}
                  className="object-contain h-full w-full"
                />
              </a>
            ) : (
              <Image
                src={logo.image}
                alt={logo.name}
                width={128}
                height={48}
                className="object-contain h-full w-full"
              />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

