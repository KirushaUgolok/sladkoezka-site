'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Product } from '../../lib/db'
import { addToCart } from '../../lib/db'
import { motion } from 'framer-motion'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import Swal from 'sweetalert2'
import { Button } from "@/components/ui/button"

interface ProductListItemProps {
  product: Product
  userId: string
  onAddToCart: () => void
  onClick: () => void
}

export default function ProductListItem({ product, userId, onAddToCart, onClick }: ProductListItemProps) {
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  async function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation()
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
      setQuantity(1)
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
        <div className="flex-shrink-0 w-24 h-24 mr-4">
          <Image 
            src={product.image || '/placeholder.svg?height=96&width=96'} 
            alt={product.name} 
            width={96}
            height={96}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex-grow w-full">
          <h2 className="text-lg font-semibold text-amber-800 mb-1">{product.name}</h2>
          <p className="text-amber-700 text-sm mb-2 line-clamp-2">{product.description}</p>
          <p className="text-lg font-bold text-amber-800">{product.price} ₽</p>
        </div>
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-2">
          <div className="flex items-center border border-amber-200 rounded-lg overflow-hidden">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleQuantityChange(-1)
              }}
              className="px-2 py-1 bg-amber-50 hover:bg-amber-100 transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="px-3 py-1 text-center min-w-[2.5rem]">{quantity}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleQuantityChange(1)
              }}
              className="px-2 py-1 bg-amber-50 hover:bg-amber-100 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="bg-amber-500 hover:bg-amber-600"
          >
            <ShoppingCart size={16} className="mr-2" />
            В корзину
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

