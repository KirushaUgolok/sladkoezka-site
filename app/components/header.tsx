'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToContacts = () => {
    const footer = document.getElementById('contacts')
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    // Добавляем обработчик для закрытия меню при изменении размера окна
    const handleResize = () => setIsMenuOpen(false)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-amber-800">Сладкоежка</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              href="/catalog" 
              className="text-amber-900 hover:text-amber-700 px-3 py-2 text-sm font-medium"
            >
              Каталог
            </Link>
            <Link 
              href="/about"
              className="text-amber-900 hover:text-amber-700 px-3 py-2 text-sm font-medium"
            >
              О нас
            </Link>
            <Link 
              href="/delivery"
              className="text-amber-900 hover:text-amber-700 px-3 py-2 text-sm font-medium"
            >
              Доставка
            </Link>
            <button 
              onClick={scrollToContacts}
              className="text-amber-900 hover:text-amber-700 px-3 py-2 text-sm font-medium"
            >
              Контакты
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                href="/catalog"
                className="block px-3 py-2 text-base font-medium text-amber-900 hover:text-amber-700"
              >
                Каталог
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-amber-900 hover:text-amber-700"
              >
                О нас
              </Link>
              <Link
                href="/delivery"
                className="block px-3 py-2 text-base font-medium text-amber-900 hover:text-amber-700"
              >
                Доставка
              </Link>
              <button
                onClick={scrollToContacts}
                className="block w-full text-left px-3 py-2 text-base font-medium text-amber-900 hover:text-amber-700"
              >
                Контакты
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

