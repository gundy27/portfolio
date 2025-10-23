import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

interface SourceCitationProps {
  source: {
    title: string
    url: string
    similarity: number
  }
}

export function SourceCitation({ source }: SourceCitationProps) {
  return (
    <Link
      href={source.url}
      className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors group"
    >
      <ExternalLink className="h-3 w-3" />
      <span className="underline-offset-2 group-hover:underline">
        {source.title}
      </span>
      <span className="text-slate-500">
        ({Math.round(source.similarity * 100)}% match)
      </span>
    </Link>
  )
}

