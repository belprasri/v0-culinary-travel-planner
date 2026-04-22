'use client'

import { Calendar, ThumbsUp } from 'lucide-react'

export default function NewsReviews() {
  const news = [
    {
      id: 1,
      title: 'Bali Menjadi Destinasi Teratas Asia Tenggara',
      excerpt: 'Pulau Bali dinobatkan sebagai destinasi wisata terbaik di Asia Tenggara dengan peningkatan kunjungan wisatawan 45% tahun ini.',
      date: '2024-04-15',
      category: 'Destinasi',
      likes: 234,
    },
    {
      id: 2,
      title: 'Yogyakarta Buka Candi Baru untuk Wisatawan',
      excerpt: 'Kompleks candi baru di Yogyakarta dibuka untuk umum dengan fasilitas wisata modern dan panduan pariwisata profesional.',
      date: '2024-04-14',
      category: 'Budaya',
      likes: 189,
    },
    {
      id: 3,
      title: 'Jakarta Luncurkan Program Wisata Berkelanjutan',
      excerpt: 'Pemerintah Jakarta memulai program wisata berkelanjutan untuk meningkatkan kualitas lingkungan dan pengalaman wisatawan.',
      date: '2024-04-13',
      category: 'Keberlanjutan',
      likes: 156,
    },
    {
      id: 4,
      title: 'Labuan Bajo Dikembangkan Menjadi Pusat Ekowisata',
      excerpt: 'Investasi besar-besaran untuk mengembangkan Labuan Bajo sebagai destinasi ekowisata kelas dunia dengan penekanan pada konservasi.',
      date: '2024-04-12',
      category: 'Ekowisata',
      likes: 201,
    },
    {
      id: 5,
      title: 'Festival Kuliner Indonesia Menarik 50.000 Pengunjung',
      excerpt: 'Festival kuliner terbesar tahun ini menampilkan masakan autentik dari seluruh nusantara dan menarik perhatian wisatawan lokal dan internasional.',
      date: '2024-04-11',
      category: 'Kuliner',
      likes: 312,
    },
    {
      id: 6,
      title: 'Bandung Raih Penghargaan Kota Wisata Terbaik',
      excerpt: 'Bandung menerima penghargaan sebagai kota wisata terbaik dengan inovasi pariwisata dan layanan pelanggan yang luar biasa.',
      date: '2024-04-10',
      category: 'Penghargaan',
      likes: 278,
    },
  ]

  const reviews = [
    {
      id: 1,
      author: 'Siti Nurhaliza',
      destination: 'Bali',
      rating: 5,
      comment: 'Pengalaman yang tak terlupakan! Pantai yang indah, budaya yang kaya, dan masyarakat yang ramah. Pasti akan kembali lagi!',
      date: '2024-04-10',
      likes: 89,
    },
    {
      id: 2,
      author: 'Rudi Hermawan',
      destination: 'Yogyakarta',
      rating: 5,
      comment: 'Candi Borobudur sungguh megah dan menginspirasi. Pemandu wisata kami sangat berpengetahuan dan menyenangkan. Sangat merekomendasikan!',
      date: '2024-04-08',
      likes: 76,
    },
    {
      id: 3,
      author: 'Nina Wijaya',
      destination: 'Labuan Bajo',
      rating: 4,
      comment: 'Pulau-pulau yang menakjubkan dan kehidupan laut yang luar biasa. Sedikit ramai saat peak season tapi tetap worthit.',
      date: '2024-04-05',
      likes: 65,
    },
    {
      id: 4,
      author: 'Budi Santoso',
      destination: 'Jakarta',
      rating: 4,
      comment: 'Kota yang dinamis dengan museum dan galeri seni yang bagus. Traffic bisa jadi tantangan tapi worth exploring.',
      date: '2024-04-03',
      likes: 52,
    },
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < rating ? 'text-primary' : 'text-muted-foreground'}>
        ★
      </span>
    ))
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-black font-serif mb-2">Berita Terkini</h2>
          <p className="text-lg text-muted-foreground">
            Tetap update dengan berita wisata dan ulasan terbaru dari seluruh Indonesia
          </p>
        </div>

        {/* News Grid */}
        <section className="mb-12">
          <h3 className="text-2xl font-black font-serif mb-6">Berita Pariwisata</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-card text-card-foreground border-4 border-border p-6 shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
              >
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-block bg-primary text-primary-foreground px-3 py-1 border-3 border-border font-black text-sm shadow-[2px_2px_0_0] shadow-border">
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-xl font-black font-serif mb-3 line-clamp-2">{item.title}</h4>

                {/* Excerpt */}
                <p className="text-muted-foreground mb-4 line-clamp-3">{item.excerpt}</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t-4 border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-bold">
                    <Calendar size={16} />
                    <span>{new Date(item.date).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex items-center gap-1 font-black">
                    <ThumbsUp size={16} />
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section>
          <h3 className="text-2xl font-black font-serif mb-6">Ulasan Wisatawan</h3>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-card text-card-foreground border-4 border-border p-6 shadow-[4px_4px_0_0] shadow-border"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-black">{review.author}</h4>
                    <p className="text-sm text-muted-foreground font-bold">
                      Berlibur ke {review.destination}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-1 mb-2 justify-end text-lg">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm font-black text-primary">{review.rating}.0 / 5.0</span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-card-foreground mb-4 leading-relaxed">{review.comment}</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t-4 border-border">
                  <span className="text-sm text-muted-foreground font-bold">
                    {new Date(review.date).toLocaleDateString('id-ID')}
                  </span>
                  <div className="flex items-center gap-2 font-black">
                    <ThumbsUp size={16} />
                    <span>{review.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
