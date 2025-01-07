'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Product } from '../../lib/db'
import { addToCart } from '../../lib/db'
import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import Swal from 'sweetalert2'

interface ProductCardProps {
  product: Product
  userId: string
  onAddToCart: () => void
  isNew?: boolean
  onClick: () => void
}

export default function ProductCard({ product, userId, onAddToCart, isNew = false, onClick }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  async function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation() // Prevent the click event from bubbling up to the card
    if (!userId) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Ошибка',
        text: 'Пожалуйста, подождите, идет инициализация пользователя',
        showConfirmButton: false,
        background: '#fffbc8',
        timer: 2000,
        timerProgressBar: true,
      })
      return
    }

    try {
      await addToCart(userId, product.id, quantity)
      setQuantity(1) // Reset quantity after adding to cart
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Товар добавлен в корзину',
        showConfirmButton: false,
        background: '#fffbc8',
        timer: 3000,
        timerProgressBar: true,
      })
      onAddToCart()
    } catch (error) {
      console.error('Error adding to cart:', error)
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Ошибка',
        text: 'Произошла ошибка при добавлении товара в корзину',
        showConfirmButton: false,
        background: '#fffbc8',
        timer: 3000,
        timerProgressBar: true,
      })
    }
  }

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div className="relative aspect-square">
        <Image 
          src={product.image || '/placeholder.svg?height=300&width=300'} 
          alt={product.name} 
          fill
          className="object-cover"
        />
        {isNew && (
          <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            NEW
          </div>
        )}
        <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-xl shadow-lg">
          <span className="text-xl font-bold">{product.price} ₽</span>
        </div>
      </div>
      
      <div className="p-4">
        <h2 className="text-xl font-semibold text-amber-800 mb-2">{product.name}</h2>
        <p className="text-amber-700 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-amber-200 rounded-lg overflow-hidden">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleQuantityChange(-1)
              }}
              className="px-3 py-2 bg-amber-50 hover:bg-amber-100 transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleQuantityChange(1)
              }}
              className="px-3 py-2 bg-amber-50 hover:bg-amber-100 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <motion.button
            onClick={handleAddToCart}
            className="flex-1 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            В корзину
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

