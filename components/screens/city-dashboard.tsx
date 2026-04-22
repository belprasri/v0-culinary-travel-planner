'use client'

import { useState } from 'react'
import DynamicIndonesiaMap, { INDONESIAN_CITIES, type City } from '@/components/dynamic-indonesia-map'

export default function CityDashboard() {
  const [selectedCity, setSelectedCity] = useState<City | null>(
    INDONESIAN_CITIES.find(c => c.name === 'Denpasar') || null
  )

  const getPollutionColor = (pollution: string) => {
    if (pollution === 'Bagus') return '#22c55e'
    if (pollution === 'Sedang') return '#eab308'
    return '#ef4444'
  }

  const getPollutionEmoji = (iqair: number) => {
    if (iqair <= 50) return '😊'
    if (iqair <= 100) return '😐'
    return '😷'
  }

  // Group cities by island for the selection buttons
  const islands = [...new Set(INDONESIAN_CITIES.map(c => c.island))]

  return (
    <div className="w-full h-full overflow-y-auto bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold font-serif mb-2">Keadaan Kotaku</h2>
          <p className="text-lg text-foreground/70">
            Jelajahi peta Indonesia interaktif dan pantau data kualitas udara secara real-time
          </p>
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Leaflet Map */}
          <div className="lg:col-span-2 bg-card border-4 border-border p-6 shadow-[4px_4px_0_0] shadow-border">
            <h3 className="text-2xl font-bold font-serif mb-4">Peta Indonesia Interaktif</h3>
            <div className="h-[450px] w-full">
              <DynamicIndonesiaMap 
                onCitySelect={setSelectedCity}
                selectedCity={selectedCity}
              />
            </div>
            <p className="text-sm font-bold text-foreground/70 mt-4">
              Klik marker untuk melihat detail. Zoom untuk melihat lebih banyak kota.
            </p>
          </div>

          {/* Massive Stats Dashboard */}
          <div className="bg-card border-4 border-border p-8 shadow-[4px_4px_0_0] shadow-border flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold font-serif mb-8 text-center border-b-4 border-border pb-4">
                {selectedCity?.name || 'Pilih Kota'}
              </h3>

              {selectedCity ? (
                <>
                  {/* Island Badge */}
                  <div className="text-center mb-6">
                    <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground border-4 border-border font-black shadow-[4px_4px_0_0] shadow-border">
                      {selectedCity.island}
                    </span>
                  </div>

                  {/* IQAir - MASSIVE */}
                  <div className="mb-12 text-center">
                    <div className="text-7xl font-black font-serif mb-2">
                      {getPollutionEmoji(selectedCity.iqair)}
                    </div>
                    <div className="text-8xl font-black font-serif text-primary mb-4" style={{ textShadow: '3px 3px 0 #000' }}>
                      {selectedCity.iqair}
                    </div>
                    <div className="text-xl font-bold text-foreground/70">IQAir Index</div>
                    <div
                      className="inline-block px-6 py-2 mt-4 border-4 border-border font-black text-lg shadow-[4px_4px_0_0] shadow-border"
                      style={{
                        backgroundColor: getPollutionColor(selectedCity.pollution),
                        color: '#0a0a0a',
                      }}
                    >
                      {selectedCity.pollution}
                    </div>
                  </div>

                  {/* Temperature - MASSIVE */}
                  <div className="text-center">
                    <div className="text-7xl font-black font-serif mb-2">☀️</div>
                    <div className="text-8xl font-black font-serif text-secondary mb-4" style={{ textShadow: '3px 3px 0 #000, -1px -1px 0 #000' }}>
                      {selectedCity.temperature}°
                    </div>
                    <div className="text-xl font-bold text-foreground/70">Temperatur Celsius</div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-lg text-foreground/70">Klik marker di peta untuk melihat data kota</p>
                </div>
              )}
            </div>

            {/* City Quick Selection */}
            <div className="mt-12 pt-8 border-t-4 border-border">
              <p className="text-sm font-bold text-foreground/70 mb-4">Pilih Pulau:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {islands.map((island) => (
                  <button
                    key={island}
                    onClick={() => {
                      const city = INDONESIAN_CITIES.find(c => c.island === island)
                      if (city) setSelectedCity(city)
                    }}
                    className={`px-3 py-2 border-4 border-border font-black transition-all shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] ${
                      selectedCity?.island === island
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-secondary hover:text-secondary-foreground'
                    }`}
                  >
                    {island}
                  </button>
                ))}
              </div>
              
              <p className="text-sm font-bold text-foreground/70 mb-4">Kota Populer:</p>
              <div className="flex flex-wrap gap-2">
                {['Yogyakarta', 'Denpasar', 'Ubud', 'Bandung', 'Raja Ampat'].map((cityName) => {
                  const city = INDONESIAN_CITIES.find(c => c.name === cityName)
                  if (!city) return null
                  return (
                    <button
                      key={cityName}
                      onClick={() => setSelectedCity(city)}
                      className={`px-3 py-2 border-4 border-border font-black transition-all shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] ${
                        selectedCity?.name === cityName
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground hover:bg-secondary hover:text-secondary-foreground'
                      }`}
                    >
                      {cityName}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 bg-secondary/20 border-4 border-border p-6 shadow-[4px_4px_0_0] shadow-border">
          <h3 className="text-xl font-black font-serif mb-4">Panduan Kualitas Udara</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 border-4 border-border shadow-[3px_3px_0_0] shadow-border"
                style={{ backgroundColor: '#22c55e' }}
              />
              <div>
                <p className="font-black">Bagus (0-50)</p>
                <p className="text-sm text-muted-foreground">Aman untuk semua aktivitas</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 border-4 border-border shadow-[3px_3px_0_0] shadow-border"
                style={{ backgroundColor: '#eab308' }}
              />
              <div>
                <p className="font-black">Sedang (50-100)</p>
                <p className="text-sm text-muted-foreground">Batasi aktivitas intensif</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 border-4 border-border shadow-[3px_3px_0_0] shadow-border"
                style={{ backgroundColor: '#ef4444' }}
              />
              <div>
                <p className="font-black">Buruk (100+)</p>
                <p className="text-sm text-muted-foreground">Hindari aktivitas outdoor</p>
              </div>
            </div>
          </div>
        </div>

        {/* All Cities Grid */}
        <div className="mt-8">
          <h3 className="text-2xl font-black font-serif mb-6">Semua Kota</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {INDONESIAN_CITIES.map((city) => (
              <button
                key={city.name}
                onClick={() => setSelectedCity(city)}
                className={`p-4 border-4 border-border text-left transition-all shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] ${
                  selectedCity?.name === city.name
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-card-foreground hover:bg-secondary hover:text-secondary-foreground'
                }`}
              >
                <p className="font-black text-sm truncate">{city.name}</p>
                <p className="text-xs text-muted-foreground">{city.island}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className="w-4 h-4 border-3 border-border shadow-[2px_2px_0_0] shadow-border"
                    style={{ backgroundColor: getPollutionColor(city.pollution) }}
                  />
                  <span className="text-xs font-bold">AQI: {city.iqair}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
