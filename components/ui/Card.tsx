import { cn } from '@/lib/utils/cn'
import { Label } from '@/components/ui/Label'

interface CardProps {
  label: string
  title: string
  description: string
  icon?: React.ReactNode
  hover?: boolean
  className?: string
}

export function Card({
  label,
  title,
  description,
  icon,
  hover = true,
  className,
}: CardProps) {
  const hoverClasses = hover
    ? 'transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl'
    : ''

  return (
    <div
      className={cn(
        'rounded-2xl border border-gray-200 bg-white p-6 shadow-md',
        hoverClasses,
        className
      )}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <Label className="text-accent">{label}</Label>
          <h3 className="font-heading text-2xl font-semibold text-primary">{title}</h3>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
          {icon ?? <div className="h-4 w-4 rounded-sm bg-gray-200" />}
        </div>
      </div>
      <div className="my-4 h-px w-full bg-gray-200" />
      <p className="text-sm leading-relaxed text-secondary">{description}</p>
    </div>
  )
}
