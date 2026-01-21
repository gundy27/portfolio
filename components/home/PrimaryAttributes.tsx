'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function PrimaryAttributes() {
  return (
    <section className="section-spacing-large bg-gray-100 !mt-32 sm:!mt-48 lg:!mt-64">
      <div className="container-wide pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-before-h2 text-center"
        >
          <SectionHeader
            label="WHAT I DO"
            heading="Primary Attributes"
            headingLevel="h2"
            className="items-center"
            labelClassName="text-center"
            headingClassName="text-center"
          />
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12 lg:mt-16">
          {/* Placeholder content - replace with your actual attributes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-lg p-6 sm:p-8"
          >
            <h3 className="font-heading text-lg sm:text-xl font-semibold text-primary mb-2">
              Attribute 1
            </h3>
            <p className="text-body text-sm">
              Description of your first primary attribute goes here.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg p-6 sm:p-8"
          >
            <h3 className="font-heading text-lg sm:text-xl font-semibold text-primary mb-2">
              Attribute 2
            </h3>
            <p className="text-body text-sm">
              Description of your second primary attribute goes here.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg p-6 sm:p-8"
          >
            <h3 className="font-heading text-lg sm:text-xl font-semibold text-primary mb-2">
              Attribute 3
            </h3>
            <p className="text-body text-sm">
              Description of your third primary attribute goes here.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
