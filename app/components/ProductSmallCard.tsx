'use client'

import Image from 'next/image'
import { Product } from '../../lib/db'
import { motion } from 'framer-motion'

interface ProductSmallCardProps {
  product: Product
  onClick: () => void
}

export default function ProductSmallCard({ product, onClick }: ProductSmallCardProps) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div className="relative aspect-square">
        <Image 
          src={product.image || '/placeholder.svg?height=200&width=200'} 
          alt={product.name} 
          fill
          className="object-cover"
        />
      </div>
      <div className="p-2">
        <h3 className="text-sm font-semibold text-amber-800 truncate">{product.name}</h3>
        <p className="text-xs text-amber-600 mt-1">{product.price} ₽</p>
      </div>
    </motion.div>
  )
}

