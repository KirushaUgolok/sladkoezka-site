'use client'

import { useState, useEffect } from 'react'
import { getCartItems, updateCartItem, removeFromCart, createOrder, Order } from '../../lib/db'
import { CartItem } from '../../lib/db'
import OrderForm from './OrderForm'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Trash2, Plus, Minus, X } from 'lucide-react'

export default function Cart({ userId, updateTrigger, onClose }: { userId: string; updateTrigger: number; onClose: () => void }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOrderFormVisible, setIsOrderFormVisible] = useState(false)
  const [lastOrder, setLastOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (userId) {
      fetchCartItems()
    }
  }, [userId, updateTrigger])

  async function fetchCartItems() {
    if (userId) {
      const items = await getCartItems(userId)
      setCartItems(items)
    }
  }

  async function handleUpdateQuantity(id: string, quantity: number) {
    await updateCartItem(id, quantity)
    fetchCartItems()
  }

  async function handleRemoveItem(id: string) {
    await removeFromCart(id)
    fetchCartItems()
  }

  async function handleCreateOrder(formData: any) {
    const totalAmount = cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0)
    try {
      const orderId = await createOrder(userId, totalAmount, cartItems, formData)
      const createdOrder = {
        id: orderId,
        user_id: userId,
        total_amount: totalAmount,
        status: 'pending',
        created_at: new Date().toISOString(),
        ...formData
      }
      setLastOrder(createdOrder)
      setCartItems([])
      setIsOrderFormVisible(false)
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Произошла ошибка при создании заказа')
    }
  }

  const totalAmount = cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0)

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-2xl font-bold text-amber-800 flex items-center">
          <ShoppingCart className="mr-2" size={24} />
          Корзина
        </h2>
        <button onClick={onClose} className="text-amber-800 hover:text-amber-600">
          <X size={24} />
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        {lastOrder ? (
          <motion.div 
            className="mb-6 bg-green-100 p-4 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-bold text-green-700 mb-2">Заказ успешно создан!</h3>
            <p className="text-green-600">Номер заказа: #{lastOrder.id.slice(0, 8)}</p>
            <p className="text-green-600">Статус: {lastOrder.status}</p>
            <p className="text-green-600">Сумма: {lastOrder.total_amount} ₽</p>
          </motion.div>
        ) : cartItems.length === 0 ? (
          <p className="text-amber-700">Ваша корзина пуста</p>
        ) : (
          <>
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="flex items-center justify-between mb-4 bg-amber-50 p-3 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <h3 className="font-semibold text-amber-800">{item.product.name}</h3>
                    <p className="text-amber-600">{item.product.price} ₽ x {item.quantity}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="bg-amber-200 p-1 rounded-full mr-2 hover:bg-amber-300 transition duration-300"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="bg-white px-2 py-1 rounded-full">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="bg-amber-200 p-1 rounded-full ml-2 hover:bg-amber-300 transition duration-300"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="ml-4 text-red-500 hover:text-red-600 transition duration-300"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </>
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div className="border-t p-4">
          <p className="text-xl font-bold text-amber-800 mb-4">Итого: {totalAmount} ₽</p>
          {!isOrderFormVisible ? (
            <motion.button
              onClick={() => setIsOrderFormVisible(true)}
              className="mt-4 bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-amber-600 transition duration-300 w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Оформить заказ
            </motion.button>
          ) : (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-amber-800">Оформление заказа</h3>
              <OrderForm
                onSubmit={handleCreateOrder}
                onCancel={() => setIsOrderFormVisible(false)}
              />
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}

