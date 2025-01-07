import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'db.json')

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export async function getProducts(): Promise<Product[]> {
  if (!fs.existsSync(dbPath)) {
    return []
  }
  const data = await fs.promises.readFile(dbPath, 'utf-8')
  return JSON.parse(data)
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<void> {
  const products = await getProducts()
  const newProduct = { ...product, id: Date.now().toString() }
  products.push(newProduct)
  await fs.promises.writeFile(dbPath, JSON.stringify(products, null, 2))
}

export async function updateProduct(id: string, updatedProduct: Partial<Product>): Promise<void> {
  const products = await getProducts()
  const index = products.findIndex(p => p.id === id)
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct }
    await fs.promises.writeFile(dbPath, JSON.stringify(products, null, 2))
  }
}

export async function deleteProduct(id: string): Promise<void> {
  const products = await getProducts()
  const filteredProducts = products.filter(p => p.id !== id)
  await fs.promises.writeFile(dbPath, JSON.stringify(filteredProducts, null, 2))
}

