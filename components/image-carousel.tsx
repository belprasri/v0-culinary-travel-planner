'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const CAROUSEL_IMAGES = [
  {
    id: 1,
    src: '/carousel-1.jpg',
    title: 'Street Food in Bangkok',
    description: 'Experience authentic Thai flavors'
  },
  {
    id: 2,
    src: '/carousel-2.jpg',
    title: 'Wine Country in Tuscany',
    description: 'Discover world-class Italian cuisine'
  },
  {
    id: 3,
    src: '/carousel-3.jpg',
    title: 'Ramen in Tokyo',
    description: 'Master the art of Japanese noodles'
  },
]

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
  }

  const current = CAROUSEL_IMAGES[currentIndex]

  return (
    <div className="relative">
      {/* Image Container */}
      <div className="relative w-full aspect-video bg-muted border-4 border-border overflow-hidden shadow-[6px_6px_0_0] shadow-border">
        <Image
          src={current.src}
          alt={current.title}
          fill
          priority
          className="object-cover"
        />
        {/* Overlay with text */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 font-serif font-black text-white drop-shadow-lg" style={{ textShadow: '4px 4px 0 #0a0a0a' }}>
              {current.title.split(' ')[0]}
            </div>
            <p className="text-xl font-bold text-white drop-shadow-md">{current.description}</p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary text-primary-foreground border-4 border-border flex items-center justify-center font-black shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary text-primary-foreground border-4 border-border flex items-center justify-center font-black shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="flex gap-3 justify-center mt-6">
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-4 border-3 border-border transition-all shadow-[2px_2px_0_0] shadow-border ${
              index === currentIndex
                ? 'bg-primary w-8'
                : 'bg-muted w-4 hover:bg-secondary'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
