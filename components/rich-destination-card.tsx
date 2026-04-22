'use client'

import Image from 'next/image'
import { Plus } from 'lucide-react'

interface RichDestinationCardProps {
  destination: string
  image: string
  status: 'Ramai' | 'Sedang' | 'Sepi'
  onAddToPlan: () => void
}

export default function RichDestinationCard({
  destination,
  image,
  status,
  onAddToPlan,
}: RichDestinationCardProps) {
  const statusColor =
    status === 'Ramai' ? '#ef4444' : status === 'Sedang' ? '#eab308' : '#22c55e'
  const statusBgColor =
    status === 'Ramai' ? '#fecaca' : status === 'Sedang' ? '#fde047' : '#bbf7d0'

  return (
    <div className="w-full bg-card text-card-foreground border-4 border-border overflow-hidden shadow-[4px_4px_0_0] shadow-border">
      {/* Destination Image */}
      <div className="relative w-full h-40 bg-muted overflow-hidden border-b-4 border-border">
        <Image
          src={image}
          alt={destination}
          fill
          className="object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Destination Name */}
        <h4 className="text-xl font-black font-serif mb-3">{destination}</h4>

        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-black">Status Saat Ini:</span>
          <span
            className="px-3 py-1 border-3 border-border font-black text-sm shadow-[2px_2px_0_0] shadow-border"
            style={{
              backgroundColor: statusBgColor,
              color: '#0a0a0a',
            }}
          >
            {status === 'Ramai' ? '!' : status === 'Sedang' ? '~' : '+'} {status}
          </span>
        </div>

        {/* Add to Plan Button */}
        <button
          onClick={onAddToPlan}
          className="w-full px-4 py-2 bg-primary text-primary-foreground border-4 border-border font-black text-sm shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Tambah ke Rencana
        </button>
      </div>
    </div>
  )
}
