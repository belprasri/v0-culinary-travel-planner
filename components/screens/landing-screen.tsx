'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ImageCarousel from '../image-carousel'
import CityStatusGrid from '../city-status-grid'

interface LandingScreenProps {
  onNavigateToChat: () => void
}

export default function LandingScreen({ onNavigateToChat }: LandingScreenProps) {
  return (
    <div className="w-full h-full overflow-y-auto">
      {/* Hero Carousel */}
      <section className="border-b-4 border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <ImageCarousel />
        </div>
      </section>

      {/* City Status Grid */}
      <section className="border-b-4 border-border bg-muted">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-black mb-8 font-serif">Top Destinations</h2>
          <CityStatusGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary text-secondary-foreground border-t-4 border-border">
        <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col items-center text-center">
          <h2 className="text-4xl font-black mb-4 font-serif">Ready to Explore?</h2>
          <p className="text-lg font-bold mb-8 max-w-md">
            Chat with our AI to discover culinary adventures tailored to your taste
          </p>
          <button
            onClick={onNavigateToChat}
            className="px-8 py-4 bg-primary text-primary-foreground font-black text-lg border-4 border-border shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
          >
            Start Planning Your Journey
          </button>
        </div>
      </section>
    </div>
  )
}
