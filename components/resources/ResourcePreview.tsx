'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { Resource } from '@/lib/content/types'

interface ResourcePreviewProps {
  resource: Resource | null
  onDownload: (id: string) => void
}

export function ResourcePreview({ resource, onDownload }: ResourcePreviewProps) {
  if (!resource) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-secondary">
        <p>Select a resource to preview</p>
      </div>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8"
    >
      <div className="relative aspect-video mb-4 sm:mb-6 overflow-hidden bg-gray-100 rounded-lg">
          <Image
            src="/assets/resources/preview-placeholder.svg"
            alt={resource.title}
            fill
            className="object-cover"
          />
      </div>
      
      <Button
        variant="primary"
        size="lg"
        onClick={() => onDownload(resource.id)}
        className="w-full text-xs sm:text-sm"
      >
        DOWNLOAD ({resource.downloads} downloads)
      </Button>
    </motion.div>
  )
}

