'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X } from 'lucide-react'
import Cart from './Cart'
import { getCartItems } from '../../lib/db'

export default function CartButton({ userId, updateTrigger, isOpen, setIsOpen }) {
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    async function fetchCartItemCount() {
      if (userId) {
        const items = await getCartItems(userId)
        setItemCount(items.reduce((total, item) => total + item.quantity, 0))
      }
    }
    fetchCartItemCount()
  }, [userId, updateTrigger])

  return (
    <>
      <motion.button
        className="fixed bottom-4 right-4 bg-amber-500 text-white p-4 rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <ShoppingCart size={24} />}
        {!isOpen && itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {itemCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-40 overflow-y-auto"
          >
            <Cart userId={userId} updateTrigger={updateTrigger} onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

