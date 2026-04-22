'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import QuizModal from '../quiz-modal'

interface HomeScreenProps {
  onSelectDestination: (destination: string) => void
}

const DESTINATIONS = [
  {
    id: 'bali',
    name: 'Bali',
    image: '/bali.jpg',
    description: 'Pulau surgawi dengan pantai indah dan budaya kaya',
    rating: 4.8,
  },
  {
    id: 'yogyakarta',
    name: 'Yogyakarta',
    image: '/yogyakarta.jpg',
    description: 'Jantung budaya Jawa dengan candi Borobudur',
    rating: 4.7,
  },
  {
    id: 'jakarta',
    name: 'Jakarta',
    image: '/jakarta.jpg',
    description: 'Ibu kota yang dinamis dan penuh energi',
    rating: 4.5,
  },
  {
    id: 'labuan-bajo',
    name: 'Labuan Bajo',
    image: '/labuan-bajo.jpg',
    description: 'Gerbang Komodo dengan kepulauan eksotis',
    rating: 4.9,
  },
  {
    id: 'bontang',
    name: 'Bontang',
    image: '/bontang.jpg',
    description: 'Kota industri di hati Kalimantan Timur',
    rating: 4.3,
  },
]

export default function HomeScreen({ onSelectDestination }: HomeScreenProps) {
  const [showQuiz, setShowQuiz] = useState(false)

  return (
    <div className="w-full h-full overflow-y-auto bg-background">
      {/* Hero Section */}
      <section className="bg-primary/30 border-b-4 border-border">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold font-serif mb-4 text-balance text-foreground">
              Jelajahi Keindahan Indonesia
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto text-balance">
              Temukan destinasi impian Anda dengan rekomendasi AI yang dipersonalisasi
            </p>
          </div>

          {/* Quiz CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowQuiz(true)}
              className="px-8 py-4 bg-secondary text-secondary-foreground border-4 border-border font-black text-lg flex items-center gap-3 shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
            >
              <Sparkles size={24} />
              Cari Destinasi dengan AI
            </button>
          </div>
        </div>
      </section>

      {/* Destination Cards Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h3 className="text-3xl font-black font-serif mb-8">Destinasi Unggulan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((destination) => (
            <button
              key={destination.id}
              onClick={() => onSelectDestination(destination.id)}
              className="group text-left border-4 border-border overflow-hidden bg-card text-card-foreground shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
            >
              {/* Image */}
              <div className="relative w-full h-48 bg-muted overflow-hidden border-b-4 border-border">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="text-2xl font-black font-serif mb-2">{destination.name}</h4>
                <p className="text-muted-foreground mb-4">{destination.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black bg-primary text-primary-foreground px-3 py-1 border-4 border-border shadow-[3px_3px_0_0] shadow-border">
                    {destination.rating}
                  </span>
                  <span className="text-sm font-black text-secondary">Pelajari &rarr;</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Quiz Modal */}
      {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} />}
    </div>
  )
}
