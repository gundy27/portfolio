export { cn } from './cn'

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

export function formatDateRange(startDate: string, endDate?: string | null): string {
  const start = new Date(startDate)
  const startFormatted = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
  }).format(start)
  
  if (!endDate) {
    return `${startFormatted} - Present`
  }
  
  const end = new Date(endDate)
  const endFormatted = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
  }).format(end)
  
  return `${startFormatted} - ${endFormatted}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

