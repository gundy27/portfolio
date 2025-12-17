'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

type FilterType = 'all' | 'paid' | 'personal'

interface ProjectFiltersProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export function ProjectFilters({ activeFilter, onFilterChange }: ProjectFiltersProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'paid', label: 'PAID' },
    { value: 'personal', label: 'PERSONAL' },
    { value: 'all', label: 'ALL' },
  ]
  
  return (
    <div className="flex gap-4 justify-center mb-12">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? 'primary' : 'outline'}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}

