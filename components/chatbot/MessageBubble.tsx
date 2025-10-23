import { cn } from '@/lib/utils'
import { SourceCitation } from './SourceCitation'

interface Message {
  role: 'user' | 'assistant'
  content: string
  sources?: { title: string; url: string; similarity: number }[]
}

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3',
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-slate-800/50 text-slate-100 border border-slate-700/50'
        )}
      >
        <p className="text-base leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 space-y-1">
            <p className="text-xs text-slate-400 font-medium">Sources:</p>
            {message.sources.map((source, index) => (
              <SourceCitation key={index} source={source} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

