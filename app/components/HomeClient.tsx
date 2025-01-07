'use client'

import Link from 'next/link'

export default function HomeClient() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <Link 
          href="/catalog" 
          className="bg-amber-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-amber-600 transition duration-300"
        >
          Перейти в каталог
        </Link>
        <button 
          onClick={() => scrollToSection('features')}
          className="bg-white text-amber-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-amber-100 transition duration-300"
        >
          О нас
        </button>
      </div>
    </>
  )
}

