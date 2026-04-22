const CITIES = [
  {
    id: 1,
    name: 'Bangkok',
    emoji: '🇹🇭',
    restaurants: 1247,
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Tokyo',
    emoji: '🇯🇵',
    restaurants: 2891,
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Paris',
    emoji: '🇫🇷',
    restaurants: 1834,
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Istanbul',
    emoji: '🇹🇷',
    restaurants: 956,
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Seoul',
    emoji: '🇰🇷',
    restaurants: 2104,
    rating: 4.8,
  },
  {
    id: 6,
    name: 'Barcelona',
    emoji: '🇪🇸',
    restaurants: 1452,
    rating: 4.5,
  },
]

export default function CityStatusGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {CITIES.map((city) => (
        <div
          key={city.id}
          className="bg-card text-card-foreground border-4 border-border p-6 shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex flex-col items-center text-center cursor-pointer"
        >
          <div className="text-5xl mb-4">{city.emoji}</div>
          <h3 className="text-2xl font-black mb-4 font-serif">{city.name}</h3>
          <div className="space-y-3 w-full">
            <div className="flex justify-between items-center p-2 bg-muted border-2 border-border">
              <span className="font-bold">Restaurants</span>
              <span className="text-xl font-black text-primary">{city.restaurants}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted border-2 border-border">
              <span className="font-bold">Rating</span>
              <span className="text-xl font-black text-secondary">★ {city.rating}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
