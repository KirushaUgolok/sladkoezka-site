'use client'

import { useState, useEffect } from 'react'
import { getProducts, generateDemoUserId } from '../../lib/db'
import ProductCard from '../components/ProductCard'
import ProductListItem from '../components/ProductListItem'
import ProductSmallCard from '../components/ProductSmallCard'
import CartButton from '../components/CartButton'
import Header from '../components/header'
import Footer from '../components/footer'
import { motion } from 'framer-motion'
import { Search, Grid, List, LayoutGrid } from 'lucide-react'
import Image from 'next/image'
import ProductModal from '../components/ProductModal'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Catalog() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [minPriceFilter, setMinPriceFilter] = useState('')
  const [maxPriceFilter, setMaxPriceFilter] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [userId, setUserId] = useState('')
  const [cartUpdateTrigger, setCartUpdateTrigger] = useState(0)
  const [sortOrder, setSortOrder] = useState('default')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [viewMode, setViewMode] = useState('grid')

  useEffect(() => {
    const demoUserId = generateDemoUserId()
    setUserId(demoUserId)

    async function fetchData() {
      const fetchedProducts = await getProducts()
      setProducts(fetchedProducts)
      setFilteredProducts(fetchedProducts)
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesName = product.name.toLowerCase().includes(nameFilter.toLowerCase())
      const matchesMinPrice = !minPriceFilter || product.price >= parseFloat(minPriceFilter)
      const maxPrice = maxPriceFilter === '' ? Infinity : parseFloat(maxPriceFilter)
      const matchesMaxPrice = !maxPriceFilter || maxPriceFilter === '0' || product.price <= maxPrice
      return matchesName && matchesMinPrice && matchesMaxPrice
    })

    switch (sortOrder) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
    }

    setFilteredProducts(filtered)
  }, [products, nameFilter, minPriceFilter, maxPriceFilter, sortOrder])

  const handleAddToCart = () => {
    setCartUpdateTrigger(prev => prev + 1)
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-amber-800 mb-6">Фильтры</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-amber-700 block mb-2">
                      Цена
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        value={minPriceFilter}
                        onChange={(e) => {
                          const value = Math.max(0, parseInt(e.target.value) || 0)
                          setMinPriceFilter(value.toString())
                        }}
                        className="w-full p-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Мин. цена"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        min="0"
                        value={maxPriceFilter}
                        onChange={(e) => {
                          const value = e.target.value;
                          setMaxPriceFilter(value === '' ? '' : Math.max(0, parseInt(value) || 0).toString())
                        }}
                        className="w-full p-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Макс. цена"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-amber-700 block mb-2">
                      Сортировка
                    </label>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите сортировку" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">По умолчанию</SelectItem>
                        <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                        <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                        <SelectItem value="name-asc">Название: А-Я</SelectItem>
                        <SelectItem value="name-desc">Название: Я-А</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex flex-col gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative flex-grow w-full sm:w-auto">
                      <input
                        type="text"
                        placeholder="Поиск по названию"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" size={20} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewMode('grid')}
                        aria-label="Отображение большими плитками"
                        className="bg-amber-500 text-white hover:bg-amber-600"
                      >
                        <Grid size={20} />
                      </Button>
                      <Button
                        variant={viewMode === 'small-grid' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewMode('small-grid')}
                        aria-label="Отображение маленькими плитками"
                        className="bg-amber-500 text-white hover:bg-amber-600"
                      >
                        <LayoutGrid size={20} />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewMode('list')}
                        aria-label="Отображение списком"
                        className="bg-amber-500 text-white hover:bg-amber-600"
                      >
                        <List size={20} />
                      </Button>
                    </div>
                  </div>
                </div>

                {viewMode === 'grid' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        userId={userId} 
                        onAddToCart={handleAddToCart}
                        isNew={product.isNew}
                        onClick={() => handleProductClick(product)}
                      />
                    ))}
                  </div>
                )}

                {viewMode === 'small-grid' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredProducts.map((product) => (
                      <ProductSmallCard
                        key={product.id}
                        product={product}
                        onClick={() => handleProductClick(product)}
                      />
                    ))}
                  </div>
                )}

                {viewMode === 'list' && (
                  <div className="space-y-4">
                    {filteredProducts.map((product) => (
                      <ProductListItem
                        key={product.id}
                        product={product}
                        userId={userId}
                        onAddToCart={handleAddToCart}
                        onClick={() => handleProductClick(product)}
                      />
                    ))}
                  </div>
                )}

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-amber-800 text-lg">
                      По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <CartButton 
        userId={userId} 
        updateTrigger={cartUpdateTrigger} 
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
      />
      
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          userId={userId}
          onAddToCart={handleAddToCart}
        />
      )}

      <Footer />
    </div>
  )
}

