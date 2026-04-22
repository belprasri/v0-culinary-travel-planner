import { ReactNode } from 'react'

interface ChatBubbleProps {
  message?: string
  sender: 'user' | 'ai'
  isLoading?: boolean
  children?: ReactNode
}

export default function ChatBubble({ message, sender, isLoading, children }: ChatBubbleProps) {
  const isUser = sender === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`${
          children ? 'max-w-2xl' : 'max-w-xs md:max-w-md lg:max-w-lg'
        } border-4 border-border font-bold shadow-[4px_4px_0_0] shadow-border ${
          isUser
            ? 'bg-primary text-primary-foreground px-5 py-3'
            : 'bg-card text-card-foreground'
        }`}
      >
        {isLoading ? (
          <div className="flex gap-2 py-3 px-5">
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        ) : children ? (
          children
        ) : (
          <div className="px-5 py-3">{message}</div>
        )}
      </div>
    </div>
  )
}
