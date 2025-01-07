'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Product } from '../../lib/db'

interface EditProductFormProps {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  onCancel: () => void;
}

export default function EditProductForm({ product, onSave, onCancel }: EditProductFormProps) {
  const [editedProduct, setEditedProduct] = useState<Product>(product)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedProduct(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedProduct)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Название</Label>
        <Input
          id="name"
          name="name"
          value={editedProduct.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          name="description"
          value={editedProduct.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Цена</Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={editedProduct.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="image">URL изображения</Label>
        <Input
          id="image"
          name="image"
          value={editedProduct.image}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="bg-white text-amber-500 hover:bg-amber-50"
        >
          Отменить
        </Button>
        <Button 
          type="submit"
          className="bg-green-500 text-white hover:bg-green-600"
        >
          Сохранить
        </Button>
      </div>
    </form>
  )
}

