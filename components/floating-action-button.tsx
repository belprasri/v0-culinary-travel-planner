import { MessageCircle } from 'lucide-react'

interface FloatingActionButtonProps {
  onClick: () => void
}

export default function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-primary-foreground border-4 border-border flex items-center justify-center shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all font-black text-xl"
      aria-label="Open chat"
    >
      <MessageCircle size={28} />
    </button>
  )
}
