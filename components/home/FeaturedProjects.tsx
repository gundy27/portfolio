'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Label } from '@/components/ui/Label'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { Project } from '@/lib/content/types'

interface FeaturedProjectsProps {
  projects: Project[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  
  if (projects.length === 0) {
    return null
  }
  
  return (
    <section className="section-spacing-large bg-white !mt-32 sm:!mt-48 lg:!mt-64">
      <div className="container-wide pt-16 sm:pt-20 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-before-h2 text-center"
        >
          <SectionHeader
            label="FEATURED PROJECTS"
            heading="Featured Projects"
            headingLevel="h2"
            className="items-center"
            labelClassName="text-center"
            headingClassName="text-center"
          />
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12 lg:mt-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.id}`} className="block group">
                <div className="relative aspect-video mb-4 overflow-hidden bg-gray-100 rounded-lg">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {project.companyLogo && (
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded p-2">
                      <Image
                        src={project.companyLogo}
                        alt={project.company || 'Company logo'}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Label key={tag}>{tag}</Label>
                  ))}
                </div>
                
                <h3 className="font-heading text-lg sm:text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-body text-xs sm:text-sm">{project.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

