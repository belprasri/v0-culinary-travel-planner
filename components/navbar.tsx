'use client'

import { useState } from 'react'
import { Home, MapPin, Newspaper, LogIn, UserPlus } from 'lucide-react'
import AuthModal from './auth-modal'

interface NavbarProps {
  currentScreen: 'home' | 'city' | 'news' | 'detail'
  onScreenChange: (screen: 'home' | 'city' | 'news' | 'detail') => void
}

export default function Navbar({ currentScreen, onScreenChange }: NavbarProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  const navItems = [
    { id: 'home', label: 'Destinasi Unggulan', icon: Home },
    { id: 'city', label: 'Keadaan Kotaku', icon: MapPin },
    { id: 'news', label: 'Berita Terkini', icon: Newspaper },
  ] as const

  return (
    <>
      <nav className="border-t-4 border-border bg-background sticky bottom-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex gap-1 flex-wrap">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentScreen === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onScreenChange(item.id as any)}
                  className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 border-4 border-border font-black transition-all shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm">{item.label}</span>
                </button>
              )
            })}

            {/* Auth Buttons */}
            <button
              onClick={() => {
                setAuthMode('login')
                setAuthModalOpen(true)
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-secondary text-secondary-foreground border-4 border-border font-black transition-all shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
            >
              <LogIn size={20} />
              <span className="text-sm hidden sm:inline">Masuk</span>
            </button>

            <button
              onClick={() => {
                setAuthMode('register')
                setAuthModalOpen(true)
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-primary text-primary-foreground border-4 border-border font-black transition-all shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
            >
              <UserPlus size={20} />
              <span className="text-sm hidden sm:inline">Daftar</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onModeChange={setAuthMode}
      />
    </>
  )
}
