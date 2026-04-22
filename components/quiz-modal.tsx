'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Loader } from 'lucide-react'

interface QuizModalProps {
  onClose: () => void
}

const QUIZ_STEPS = [
  {
    step: 1,
    question: 'Apa tipe liburan yang Anda sukai?',
    options: ['Pantai & Relaksasi', 'Petualangan & Hiking', 'Budaya & Sejarah', 'Kota Modern'],
  },
  {
    step: 2,
    question: 'Berapa lama Anda ingin berlibur?',
    options: ['3-5 hari', '1-2 minggu', '2-3 minggu', 'Fleksibel'],
  },
  {
    step: 3,
    question: 'Apa budget perjalanan Anda?',
    options: ['Budget', 'Standar', 'Premium', 'Luxury'],
  },
  {
    step: 4,
    question: 'Kapan Anda ingin pergi?',
    options: ['Musim Kering (Apr-Oct)', 'Musim Hujan (Nov-Mar)', 'Kapan saja', 'Belum tahu'],
  },
  {
    step: 5,
    question: 'Apakah Anda ingin group atau private tour?',
    options: ['Group Tour (hemat)', 'Private Tour (eksklusif)', 'Solo Travel', 'Tidak tahu'],
  },
  {
    step: 6,
    question: 'Siapa yang akan Anda ajak?',
    options: ['Keluarga', 'Pasangan', 'Teman', 'Solo'],
  },
]

export default function QuizModal({ onClose }: QuizModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const current = QUIZ_STEPS[currentStep]

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentStep] = answer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentStep < QUIZ_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit quiz
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        onClose()
      }, 2000)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background text-foreground border-4 border-border max-w-2xl w-full shadow-[8px_8px_0_0] shadow-border">
        {/* Header */}
        <div className="border-b-4 border-border px-6 py-4 flex items-center justify-between bg-primary">
          <h3 className="text-2xl font-black font-serif text-primary-foreground">
            Quiz Destinasi AI
          </h3>
          <button
            onClick={onClose}
            className="p-2 bg-secondary text-secondary-foreground border-3 border-border shadow-[2px_2px_0_0] shadow-border hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-4">
              <Loader size={40} className="animate-spin text-primary" />
              <p className="text-lg font-bold">Mencari destinasi terbaik untuk Anda...</p>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold">
                    Pertanyaan {current.step} dari {QUIZ_STEPS.length}
                  </span>
                  <span className="text-sm text-foreground/60">
                    {Math.round((current.step / QUIZ_STEPS.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-4 bg-muted border-4 border-border overflow-hidden shadow-[3px_3px_0_0] shadow-border">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${(current.step / QUIZ_STEPS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <h4 className="text-2xl font-bold font-serif mb-6">{current.question}</h4>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {current.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-4 text-left border-4 border-border font-black transition-all ${
                      answers[currentStep] === option
                        ? 'bg-primary text-primary-foreground shadow-[4px_4px_0_0] shadow-border'
                        : 'bg-card text-card-foreground shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground border-4 border-border font-black disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  <ChevronLeft size={20} />
                  Kembali
                </button>
                <button
                  onClick={handleNext}
                  disabled={!answers[currentStep]}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground border-4 border-border font-black disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0_0] shadow-border hover:shadow-[2px_2px_0_0] hover:shadow-border hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
                >
                  {current.step === QUIZ_STEPS.length ? 'Selesai' : 'Lanjut'}
                  {current.step < QUIZ_STEPS.length && <ChevronRight size={20} />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
