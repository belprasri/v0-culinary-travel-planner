'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  mode: 'login' | 'register'
  onClose: () => void
  onModeChange: (mode: 'login' | 'register') => void
}

export default function AuthModal({ isOpen, mode, onClose, onModeChange }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    console.log(`[v0] ${mode} submitted:`, { email, password, ...(mode === 'register' && { name }) })
    
    // Reset and close
    setEmail('')
    setPassword('')
    setName('')
    setIsSubmitting(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* Modal Container - Neo-Brutalism Style */}
      <div className="bg-background text-foreground border-4 border-border w-full max-w-md shadow-[8px_8px_0_0] shadow-border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-border bg-primary text-primary-foreground">
          <h2 className="text-2xl font-black font-serif">
            {mode === 'login' ? 'Masuk' : 'Daftar'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-secondary text-secondary-foreground border-3 border-border shadow-[2px_2px_0_0] shadow-border hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Name Field (Register only) */}
          {mode === 'register' && (
            <div className="mb-6">
              <label className="block text-sm font-black mb-3">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap"
                required={mode === 'register'}
                className="w-full px-4 py-3 border-4 border-border bg-card text-foreground font-bold placeholder-muted-foreground focus:outline-none shadow-[4px_4px_0_0] shadow-border focus:shadow-[2px_2px_0_0] focus:shadow-border focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
              />
            </div>
          )}

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-sm font-black mb-3">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@example.com"
              required
              className="w-full px-4 py-3 border-4 border-border bg-card text-foreground font-bold placeholder-muted-foreground focus:outline-none shadow-[4px_4px_0_0] shadow-border focus:shadow-[2px_2px_0_0] focus:shadow-border focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
            />
          </div>

          {/* Password Field */}
          <div className="mb-8">
            <label className="block text-sm font-black mb-3">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border-4 border-border bg-card text-foreground font-bold placeholder-muted-foreground focus:outline-none shadow-[4px_4px_0_0] shadow-border focus:shadow-[2px_2px_0_0] focus:shadow-border focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 bg-secondary text-secondary-foreground border-4 border-border font-black text-lg mb-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              isSubmitting 
                ? 'shadow-none translate-x-[4px] translate-y-[4px]' 
                : 'shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px]'
            }`}
          >
            {isSubmitting ? 'Loading...' : (mode === 'login' ? 'Masuk' : 'Daftar')}
          </button>

          {/* Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              setEmail('')
              setPassword('')
              setName('')
              onModeChange(mode === 'login' ? 'register' : 'login')
            }}
            className="w-full py-3 text-muted-foreground font-black border-4 border-border shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-muted transition-all"
          >
            {mode === 'login' 
              ? 'Belum punya akun? Daftar' 
              : 'Sudah punya akun? Masuk'}
          </button>
        </form>
      </div>
    </div>
  )
}
