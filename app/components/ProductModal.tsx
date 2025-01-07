'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { X, Minus, Plus } from 'lucide-react'
import { addToCart } from '../../lib/db'
import Swal from 'sweetalert2'

interface ProductModalProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    image: string
  }
  onClose: () => void
  userId: string
  onAddToCart: () => void
}

export default function ProductModal({ product, onClose, userId, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  async function handleAddToCart() {
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
      onClose()
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4"
      >
        <div className="flex justify-end">
          <button onClick={onClose} className="text-amber-800 hover:text-amber-600">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <Image
              src={product.image || '/placeholder.svg?height=300&width=300'}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-amber-800 mb-2">{product.name}</h2>
            <p className="text-amber-700 mb-4">{product.description}</p>
            <p className="text-xl font-bold text-amber-800 mb-4">{product.price} ₽</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-amber-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-2 bg-amber-50 hover:bg-amber-100 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
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
        </div>
      </motion.div>
    </div>
  )
}

