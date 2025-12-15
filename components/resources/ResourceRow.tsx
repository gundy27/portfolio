'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Resource } from '@/lib/content/types'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'

interface ResourceRowProps {
  resource: Resource
  onRatingChange: (id: string, delta: number) => void
}

export function ResourceRow({ resource, onRatingChange }: ResourceRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-gray-200 py-4"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading text-lg font-semibold text-primary">
              {resource.title}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'COLLAPSE' : 'EXPAND'}
            </Button>
          </div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-body mb-4">{resource.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isExpanded && (
            <p className="text-body text-sm line-clamp-2">{resource.description}</p>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onRatingChange(resource.id, -1)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              aria-label="Decrease rating"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <span className="font-heading text-lg font-semibold text-primary min-w-[3rem] text-center">
              {resource.rating >= 0 ? '+' : ''}{resource.rating}
            </span>
            <button
              onClick={() => onRatingChange(resource.id, 1)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              aria-label="Increase rating"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

