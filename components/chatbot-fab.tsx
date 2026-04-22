'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, X, MessageCircle } from 'lucide-react'
import ChatBubble from './chat-bubble'
import RichDestinationCard from './rich-destination-card'

interface Message {
  id: string
  text?: string
  sender: 'user' | 'ai'
  type?: 'text' | 'destination'
  destination?: {
    name: string
    image: string
    status: 'Ramai' | 'Sedang' | 'Sepi'
  }
}

const DESTINATIONS = [
  { name: 'Bali', image: '/bali.jpg', status: 'Ramai' as const },
  { name: 'Yogyakarta', image: '/yogyakarta.jpg', status: 'Sedang' as const },
  { name: 'Jakarta', image: '/jakarta.jpg', status: 'Ramai' as const },
  { name: 'Labuan Bajo', image: '/labuan-bajo.jpg', status: 'Sepi' as const },
  { name: 'Bontang', image: '/bontang.jpg', status: 'Sedang' as const },
]

export default function ChatbotFAB() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Halo! Saya adalah AI asisten perjalanan Anda. Tanya saya tentang destinasi di Indonesia!',
      sender: 'ai',
      type: 'text',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      type: 'text',
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response with destination card
    setTimeout(() => {
      const userInput = inputValue.toLowerCase()
      let aiResponse: Message

      // Check if user is asking for recommendations
      if (
        userInput.includes('rekomendasi') ||
        userInput.includes('destinasi') ||
        userInput.includes('mana')
      ) {
        // Send destination card
        const randomDestination =
          DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)]
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          type: 'destination',
          destination: randomDestination,
        }
      } else {
        // Send text response
        const textResponses = [
          'Bagus! Saya punya rekomendasi sempurna untuk Anda. Klik "Dapatkan Rekomendasi" untuk melihat destinasi terbaik!',
          'Itu menarik! Saya telah menyiapkan beberapa pilihan destinasi yang sesuai dengan preferensi Anda.',
          'Tentang itu, saya punya beberapa ide brilian. Mari saya tunjukkan destinasi yang paling cocok!',
        ]
        aiResponse = {
          id: (Date.now() + 1).toString(),
          text: textResponses[Math.floor(Math.random() * textResponses.length)],
          sender: 'ai',
          type: 'text',
        }
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleAddToPlan = (destination: string) => {
    const confirmMessage: Message = {
      id: Date.now().toString(),
      text: `Bagus! "${destination}" telah ditambahkan ke rencana perjalanan Anda.`,
      sender: 'ai',
      type: 'text',
    }
    setMessages((prev) => [...prev, confirmMessage])
  }

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 border-4 border-border flex items-center justify-center font-black text-xl transition-all duration-200 z-50 shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] ${
          isOpen
            ? 'bg-secondary text-secondary-foreground'
            : 'bg-primary text-primary-foreground'
        }`}
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 w-96 h-[500px] bg-background text-foreground border-4 border-border flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-4 duration-300 shadow-[8px_8px_0_0] shadow-border"
        >
          {/* Chat Header */}
          <div className="border-b-4 border-border bg-primary text-primary-foreground p-4">
            <h3 className="font-black text-lg">Indo Travel AI</h3>
            <p className="text-sm font-bold opacity-90">Rekomendasi destinasi personal</p>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {messages.map((message) => (
              <div key={message.id}>
                {message.type === 'destination' && message.destination ? (
                  <ChatBubble sender={message.sender}>
                    <div className="p-0">
                      <RichDestinationCard
                        destination={message.destination.name}
                        image={message.destination.image}
                        status={message.destination.status}
                        onAddToPlan={() =>
                          handleAddToPlan(message.destination!.name)
                        }
                      />
                    </div>
                  </ChatBubble>
                ) : (
                  <ChatBubble
                    message={message.text}
                    sender={message.sender}
                    isLoading={
                      isLoading &&
                      message.sender === 'ai' &&
                      message.id === messages[messages.length - 1].id
                    }
                  />
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t-4 border-border bg-background p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tanya rekomendasi..."
                className="flex-1 px-4 py-2 border-4 border-border bg-card text-foreground placeholder-muted-foreground font-bold focus:outline-none shadow-[4px_4px_0_0] shadow-border focus:shadow-[2px_2px_0_0] focus:shadow-border focus:translate-x-[2px] focus:translate-y-[2px] transition-all text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="px-4 py-2 bg-secondary text-secondary-foreground border-4 border-border font-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Overlay when chat is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
