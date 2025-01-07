import { NextResponse } from 'next/server'
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../../lib/db'

export async function GET() {
  const products = await getProducts()
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const product = await request.json()
  try {
    await addProduct(product)
    return NextResponse.json({ message: 'Product added successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const product = await request.json()
  try {
    await updateProduct(product.id, product)
    return NextResponse.json({ message: 'Product updated successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  try {
    await deleteProduct(id)
    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}

