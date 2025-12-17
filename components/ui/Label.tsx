import { cn } from '@/lib/utils/cn'

interface LabelProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'accent'
}

export function Label({ children, className, variant = 'default' }: LabelProps) {
  return (
    <span className={cn(
      'font-label',
      variant === 'accent' ? 'text-accent' : 'text-secondary',
      className
    )}>
      {children}
    </span>
  )
}

