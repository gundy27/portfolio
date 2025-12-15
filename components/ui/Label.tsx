import { cn } from '@/lib/utils/cn'

interface LabelProps {
  children: React.ReactNode
  className?: string
}

export function Label({ children, className }: LabelProps) {
  return (
    <span className={cn('font-label text-secondary', className)}>
      {children}
    </span>
  )
}

