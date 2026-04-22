'use client'

import { useEffect, useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Indonesian cities with coordinates and data
const INDONESIAN_CITIES = [
  // Java
  { name: 'Yogyakarta', lat: -7.7956, lng: 110.3695, island: 'Java', iqair: 58, temperature: 28, pollution: 'Sedang' as const },
  { name: 'Bandung', lat: -6.9175, lng: 107.6191, island: 'Java', iqair: 72, temperature: 24, pollution: 'Sedang' as const },
  { name: 'Malang', lat: -7.9666, lng: 112.6326, island: 'Java', iqair: 45, temperature: 25, pollution: 'Bagus' as const },
  { name: 'Solo', lat: -7.5755, lng: 110.8243, island: 'Java', iqair: 55, temperature: 29, pollution: 'Sedang' as const },
  { name: 'Jakarta', lat: -6.2088, lng: 106.8456, island: 'Java', iqair: 125, temperature: 32, pollution: 'Buruk' as const },
  // Bali & East
  { name: 'Denpasar', lat: -8.6705, lng: 115.2126, island: 'Bali', iqair: 35, temperature: 28, pollution: 'Bagus' as const },
  { name: 'Ubud', lat: -8.5069, lng: 115.2625, island: 'Bali', iqair: 28, temperature: 26, pollution: 'Bagus' as const },
  // East Java
  { name: 'Batu', lat: -7.8672, lng: 112.5239, island: 'Java', iqair: 38, temperature: 22, pollution: 'Bagus' as const },
  // Nusa Tenggara
  { name: 'Labuan Bajo', lat: -8.4967, lng: 119.8877, island: 'Nusa Tenggara', iqair: 22, temperature: 30, pollution: 'Bagus' as const },
  // Sumatra
  { name: 'Bukittinggi', lat: -0.3055, lng: 100.3691, island: 'Sumatra', iqair: 42, temperature: 24, pollution: 'Bagus' as const },
  { name: 'Padang', lat: -0.9471, lng: 100.4172, island: 'Sumatra', iqair: 48, temperature: 28, pollution: 'Bagus' as const },
  { name: 'Palembang', lat: -2.9761, lng: 104.7754, island: 'Sumatra', iqair: 85, temperature: 31, pollution: 'Sedang' as const },
  // Papua
  { name: 'Raja Ampat', lat: -0.2348, lng: 130.5170, island: 'Papua', iqair: 15, temperature: 29, pollution: 'Bagus' as const },
  // Sulawesi
  { name: 'Manado', lat: 1.4748, lng: 124.8421, island: 'Sulawesi', iqair: 32, temperature: 28, pollution: 'Bagus' as const },
  // Kalimantan
  { name: 'Bontang', lat: 0.1217, lng: 117.4724, island: 'Kalimantan', iqair: 65, temperature: 30, pollution: 'Sedang' as const },
]

type City = typeof INDONESIAN_CITIES[number]

// Create Neo-Brutalist marker icon with dynamic sizing
const createNeoBrutalistIcon = (isSelected: boolean, pollution: 'Bagus' | 'Sedang' | 'Buruk', cityName: string) => {
  const bgColor = isSelected ? '#FFFF00' : pollution === 'Bagus' ? '#22c55e' : pollution === 'Sedang' ? '#eab308' : '#ef4444'
  const size = isSelected ? 44 : 32
  const borderWidth = isSelected ? 4 : 3
  const shadowOffset = isSelected ? 4 : 3
  
  return L.divIcon({
    className: 'neo-brutalist-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${bgColor};
        border: ${borderWidth}px solid #0a0a0a;
        box-shadow: ${shadowOffset}px ${shadowOffset}px 0 0 #0a0a0a;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        font-size: ${isSelected ? '16px' : '12px'};
        transform: translate(-50%, -50%);
        transition: all 0.15s ease-out;
        cursor: pointer;
      ">
        <span style="color: #0a0a0a; line-height: 1;">${isSelected ? '📍' : '●'}</span>
      </div>
      ${isSelected ? `
        <div style="
          position: absolute;
          top: ${size + 8}px;
          left: 50%;
          transform: translateX(-50%);
          background: #FFFF00;
          border: 3px solid #0a0a0a;
          box-shadow: 3px 3px 0 0 #0a0a0a;
          padding: 4px 10px;
          font-weight: 900;
          font-size: 12px;
          white-space: nowrap;
          color: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
        ">${cityName}</div>
      ` : ''}
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

// Component to handle map events and dynamic marker visibility
function MapEventsHandler({ 
  onCitySelect, 
  selectedCity,
  cities 
}: { 
  onCitySelect: (city: City | null) => void
  selectedCity: City | null
  cities: City[]
}) {
  const map = useMap()
  const [visibleCities, setVisibleCities] = useState<City[]>([])
  const [zoomLevel, setZoomLevel] = useState(5)

  // Update visible cities based on map bounds and zoom
  const updateVisibleCities = () => {
    const bounds = map.getBounds()
    const zoom = map.getZoom()
    setZoomLevel(zoom)
    
    // Filter cities based on current map view
    const visible = cities.filter(city => {
      const isInBounds = bounds.contains([city.lat, city.lng])
      
      // At lower zoom levels, show fewer cities (only major ones)
      if (zoom < 6) {
        // Show only main cities at low zoom
        const mainCities = ['Jakarta', 'Denpasar', 'Yogyakarta', 'Manado', 'Raja Ampat']
        return isInBounds && mainCities.includes(city.name)
      } else if (zoom < 8) {
        // Show more cities at medium zoom
        return isInBounds
      }
      
      return isInBounds
    })
    
    setVisibleCities(visible)
  }

  useMapEvents({
    moveend: updateVisibleCities,
    zoomend: updateVisibleCities,
  })

  useEffect(() => {
    updateVisibleCities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {visibleCities.map((city) => (
        <Marker
          key={city.name}
          position={[city.lat, city.lng]}
          icon={createNeoBrutalistIcon(selectedCity?.name === city.name, city.pollution, city.name)}
          eventHandlers={{
            click: () => onCitySelect(city),
          }}
        >
          <Popup className="neo-brutalist-popup">
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              padding: '8px',
            }}>
              <h3 style={{ 
                fontWeight: 'bold', 
                fontSize: '16px', 
                marginBottom: '8px',
                borderBottom: '2px solid #000',
                paddingBottom: '4px'
              }}>
                {city.name}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span><strong>Island:</strong> {city.island}</span>
                <span><strong>IQAir:</strong> {city.iqair}</span>
                <span><strong>Temp:</strong> {city.temperature}°C</span>
                <span style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  marginTop: '4px',
                  backgroundColor: city.pollution === 'Bagus' ? '#22c55e' : city.pollution === 'Sedang' ? '#eab308' : '#ef4444',
                  border: '2px solid #000',
                  fontWeight: 'bold',
                }}>
                  {city.pollution}
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  )
}

// Fly to selected city
function FlyToCity({ city }: { city: City | null }) {
  const map = useMap()
  
  useEffect(() => {
    if (city) {
      map.flyTo([city.lat, city.lng], 10, {
        duration: 1.5
      })
    }
  }, [city, map])
  
  return null
}

interface IndonesiaLeafletMapProps {
  onCitySelect?: (city: City | null) => void
  selectedCity?: City | null
}

export default function IndonesiaLeafletMap({ 
  onCitySelect, 
  selectedCity: externalSelectedCity 
}: IndonesiaLeafletMapProps) {
  const [internalSelectedCity, setInternalSelectedCity] = useState<City | null>(null)
  
  const selectedCity = externalSelectedCity ?? internalSelectedCity
  
  const handleCitySelect = (city: City | null) => {
    setInternalSelectedCity(city)
    onCitySelect?.(city)
  }

  // Indonesia center coordinates
  const indonesiaCenter: [number, number] = [-2.5, 118.0]

  return (
    <div className="relative w-full h-full">
      <style jsx global>{`
        .neo-brutalist-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .neo-brutalist-popup .leaflet-popup-content-wrapper {
          background: #FFFF00 !important;
          border: 4px solid #0a0a0a !important;
          box-shadow: 4px 4px 0 0 #0a0a0a !important;
          border-radius: 0 !important;
        }
        
        .neo-brutalist-popup .leaflet-popup-tip {
          background: #FFFF00 !important;
          border: 3px solid #0a0a0a !important;
          box-shadow: 2px 2px 0 0 #0a0a0a !important;
        }

        .neo-brutalist-popup .leaflet-popup-close-button {
          color: #0a0a0a !important;
          font-weight: 900 !important;
          font-size: 24px !important;
          width: 28px !important;
          height: 28px !important;
        }
        
        .leaflet-container {
          font-family: 'DM Sans', sans-serif !important;
          background: #e5e5e5 !important;
        }

        .dark .leaflet-container {
          background: #262626 !important;
        }
        
        .leaflet-control-zoom {
          border: 4px solid #0a0a0a !important;
          box-shadow: 4px 4px 0 0 #0a0a0a !important;
          border-radius: 0 !important;
          overflow: hidden !important;
        }
        
        .leaflet-control-zoom a {
          background: #FFFF00 !important;
          color: #0a0a0a !important;
          font-weight: 900 !important;
          border: none !important;
          border-bottom: 3px solid #0a0a0a !important;
          width: 36px !important;
          height: 36px !important;
          line-height: 32px !important;
          font-size: 20px !important;
        }
        
        .leaflet-control-zoom a:hover {
          background: #14b8a6 !important;
          color: #fafafa !important;
        }
        
        .leaflet-control-zoom a:last-child {
          border-bottom: none !important;
        }
        
        .leaflet-control-attribution {
          background: #FFFF00 !important;
          border: 3px solid #0a0a0a !important;
          padding: 4px 8px !important;
          font-weight: 700 !important;
          color: #0a0a0a !important;
          border-radius: 0 !important;
        }

        .leaflet-control-attribution a {
          color: #0a0a0a !important;
        }
      `}</style>
      
      <MapContainer
        center={indonesiaCenter}
        zoom={5}
        style={{ height: '100%', width: '100%', minHeight: '400px' }}
        className="border-4 border-border"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapEventsHandler 
          onCitySelect={handleCitySelect}
          selectedCity={selectedCity}
          cities={INDONESIAN_CITIES}
        />
        
        <FlyToCity city={selectedCity} />
      </MapContainer>
      
      {/* Legend overlay */}
      <div className="absolute bottom-4 left-4 bg-primary border-4 border-[#0a0a0a] p-4 shadow-[4px_4px_0_0_#0a0a0a] z-[1000]">
        <p className="font-black text-sm text-[#0a0a0a] mb-3">Zoom to see more cities</p>
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#22c55e] border-3 border-[#0a0a0a] shadow-[2px_2px_0_0_#0a0a0a]" />
            <span className="text-[#0a0a0a] font-bold">Bagus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#eab308] border-3 border-[#0a0a0a] shadow-[2px_2px_0_0_#0a0a0a]" />
            <span className="text-[#0a0a0a] font-bold">Sedang</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#ef4444] border-3 border-[#0a0a0a] shadow-[2px_2px_0_0_#0a0a0a]" />
            <span className="text-[#0a0a0a] font-bold">Buruk</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export cities for use in parent components
export { INDONESIAN_CITIES }
export type { City }
