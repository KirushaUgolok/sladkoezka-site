'use client'

import { useState, useEffect } from 'react'
import { Product } from '../../lib/db'
import Link from 'next/link'
import { getOrders, getOrderItems, updateOrderStatus, cancelOrder, deleteOrder, Order, OrderItem, getProducts, addOrderComment } from '../../lib/db'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import LoginForm from '../components/LoginForm'
import Swal from 'sweetalert2'
import EditProductForm from '../components/EditProductForm'

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200'
    case 'ready':
      return 'bg-green-50 hover:bg-green-100 border-green-200'
    case 'completed':
      return 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    case 'cancelled':
      return 'bg-red-50 hover:bg-red-100 border-red-200'
    default:
      return 'border-amber-200 hover:bg-amber-50'
  }
}

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [showProductSection, setShowProductSection] = useState(false)
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ name: '', description: '', price: 0, image: '' })
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [ordersPerPage] = useState(5)
  const [productsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [adminComment, setAdminComment] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'amount'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all')

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuthenticated')
    setIsAuthenticated(authStatus === 'true')
    fetchOrders()
    fetchProducts()
  }, [])

  useEffect(() => {
    filterAndSortOrders()
  }, [orders, sortBy, sortOrder, statusFilter])

  const filterAndSortOrders = () => {
    let filtered = [...orders]

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      } else if (sortBy === 'status') {
        return sortOrder === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status)
      } else {
        return sortOrder === 'asc'
          ? a.total_amount - b.total_amount
          : b.total_amount - a.total_amount
      }
    })

    setFilteredOrders(filtered)
  }

  const handleLogin = (password: string) => {
    if (password === 'admin123') {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuthenticated', 'true')
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'success',
        title: 'Успешный вход',
        showConfirmButton: false,
        timer: 3000,
      })
    } else {
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'error',
        title: 'Неверный пароль',
        showConfirmButton: false,
        timer: 3000,
      })
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuthenticated')
    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'success',
      title: 'Выход выполнен успешно',
      showConfirmButton: false,
      timer: 3000,
    })
  }

  async function fetchProducts() {
    try {
      const fetchedProducts = await getProducts()
      setProducts(fetchedProducts)
      setTotalPages(Math.ceil(fetchedProducts.length / productsPerPage))
    } catch (error) {
      setError('Failed to fetch products')
    }
  }

  async function fetchOrders() {
    try {
      const fetchedOrders = await getOrders()
      setOrders(fetchedOrders)
    } catch (error) {
      setError('Failed to fetch orders')
    }
  }

  async function handleSelectOrder(order: Order) {
    setSelectedOrder(order)
    const items = await getOrderItems(order.id)
    setOrderItems(items)
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault()
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      })
      if (!response.ok) throw new Error('Failed to add product')
      setNewProduct({ name: '', description: '', price: 0, image: '' })
      fetchProducts()
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Товар успешно добавлен',
        showConfirmButton: false,
        timer: 3000,
      })
    } catch (error) {
      setError('Failed to add product')
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Ошибка при добавлении товара',
        showConfirmButton: false,
        timer: 3000,
      })
    }
  }

  async function handleUpdateOrderStatus(orderId: string, status: Order['status']) {
    try {
      await updateOrderStatus(orderId, status, adminComment)
      setAdminComment('')
      fetchOrders()
      setSelectedOrder(null)
      setOrderItems([])
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Статус заказа обновлен',
        showConfirmButton: false,
        timer: 3000,
      })
    } catch (error) {
      console.error('Error updating order status:', error)
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Ошибка при обновлении статуса',
        showConfirmButton: false,
        timer: 3000,
      })
    }
  }

  const statusButtons = [
    { status: 'pending' as const, label: 'В ожидании', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { status: 'ready' as const, label: 'Готов к выдаче', color: 'bg-green-500 hover:bg-green-600' },
    { status: 'completed' as const, label: 'Выдан', color: 'bg-blue-500 hover:bg-blue-600' }
  ]

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="min-h-screen bg-amber-50 p-4 sm:p-8">
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-4 sm:p-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-amber-800">Админ-панель</h1>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                onClick={handleLogout}
                variant="default"
                className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
              >
                Выйти
              </Button>
              <Button
                onClick={() => setShowProductSection(!showProductSection)}
                variant="default"
                className="bg-amber-500 hover:bg-amber-600 w-full sm:w-auto"
              >
                {showProductSection ? 'Вернуться к заказам' : 'Управление товарами'}
              </Button>
              <Link href="/catalog" className="w-full sm:w-auto">
                <Button variant="default" className="bg-amber-500 hover:bg-amber-600 w-full">
                  Вернуться в каталог
                </Button>
              </Link>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Ошибка!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {showProductSection ? (
            <div className="space-y-6">
              {/* Add Product Form */}
              <Card className="p-4">
                <h2 className="text-2xl font-semibold mb-4 text-amber-700">Добавить новый товар</h2>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Название"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full p-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <textarea
                    placeholder="Описание"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full p-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    rows={3}
                  />
                  <input
                    type="number"
                    placeholder="Цена"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full p-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="URL изображения"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full p-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <Button type="submit" className="w-full sm:w-auto bg-green-500 hover:bg-green-600">
                    Добавить товар
                  </Button>
                </form>
              </Card>

              {/* Product Search */}
              <Card className="p-4">
                <h2 className="text-2xl font-semibold mb-4 text-amber-700">Поиск товаров</h2>
                <input
                  type="text"
                  placeholder="Поиск по названию или описанию"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </Card>

              {/* Products List */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-amber-700">Список товаров</h2>
                <div className="grid grid-cols-1 gap-4">
                  {products
                    .filter(product => 
                      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      product.description.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                    .map((product) => (
                      <Card key={product.id} className="p-4">
                        {editingProduct && editingProduct.id === product.id ? (
                          <EditProductForm
                            product={editingProduct}
                            onSave={async (updatedProduct) => {
                              try {
                                const response = await fetch('/api/products', {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify(updatedProduct),
                                })
                                if (!response.ok) throw new Error('Failed to update product')
                                setEditingProduct(null)
                                fetchProducts()
                                Swal.fire({
                                  toast: true,
                                  position: 'top-end',
                                  icon: 'success',
                                  title: 'Товар обновлен',
                                  showConfirmButton: false,
                                  timer: 3000,
                                })
                              } catch (error) {
                                setError('Failed to update product')
                                Swal.fire({
                                  toast: true,
                                  position: 'top-end',
                                  icon: 'error',
                                  title: 'Ошибка при обновлении',
                                  showConfirmButton: false,
                                  timer: 3000,
                                })
                              }
                            }}
                            onCancel={() => setEditingProduct(null)}
                          />
                        ) : (
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-amber-800">{product.name}</h3>
                            <p className="text-amber-700">{product.description}</p>
                            <p className="font-bold text-amber-600">Цена: {product.price} ₽</p>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button
                                onClick={() => setEditingProduct(product)}
                                className="bg-amber-500 hover:bg-amber-600 text-white"
                              >
                                Редактировать
                              </Button>
                              <Button
                                onClick={async () => {
                                  try {
                                    const response = await fetch('/api/products', {
                                      method: 'DELETE',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ id: product.id }),
                                    })
                                    if (!response.ok) throw new Error('Failed to delete product')
                                    fetchProducts()
                                    Swal.fire({
                                      toast: true,
                                      position: 'top-end',
                                      icon: 'success',
                                      title: 'Товар удален',
                                      showConfirmButton: false,
                                      timer: 3000,
                                    })
                                  } catch (error) {
                                    setError('Failed to delete product')
                                    Swal.fire({
                                      toast: true,
                                      position: 'top-end',
                                      icon: 'error',
                                      title: 'Ошибка при удалении',
                                      showConfirmButton: false,
                                      timer: 3000,
                                    })
                                  }
                                }}
                                variant="destructive"
                              >
                                Удалить
                              </Button>
                            </div>
                          </div>
                        )}
                      </Card>
                    ))}
                </div>

                {/* Products Pagination */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
                    <Button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`${
                        currentPage === i + 1 ? 'bg-amber-500' : 'bg-amber-200'
                      }`}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Orders Section */}
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-amber-700">Заказы</h2>
                
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={sortBy} onValueChange={(value: 'date' | 'status' | 'amount') => setSortBy(value)}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Сортировать по" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Дате</SelectItem>
                      <SelectItem value="status">Статусу</SelectItem>
                      <SelectItem value="amount">Сумме</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Порядок сортировки" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">По возрастанию</SelectItem>
                      <SelectItem value="desc">По убыванию</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={(value: Order['status'] | 'all') => setStatusFilter(value)}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Фильтр по статусу" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="pending">В ожидании</SelectItem>
                      <SelectItem value="ready">Готов к выдаче</SelectItem>
                      <SelectItem value="completed">Выдан</SelectItem>
                      <SelectItem value="cancelled">Отменён</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Orders List and Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Orders List */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Список заказов</h3>
                    {currentOrders.map((order) => (
                      <motion.div
                        key={order.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors duration-300 ${
                          getStatusColor(order.status)
                        } ${
                          selectedOrder?.id === order.id ? '!bg-amber-100 border-amber-300' : ''
                        }`}
                        onClick={() => handleSelectOrder(order)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <p className="font-semibold">Заказ #{order.id.slice(0, 8)}</p>
                        <p className={`${
                          order.status === 'cancelled' ? 'text-red-600' :
                          order.status === 'completed' ? 'text-blue-600' :
                          order.status === 'ready' ? 'text-green-600' :
                          'text-yellow-600'
                        } font-medium`}>
                          Статус: {
                            order.status === 'pending' ? 'В ожидании' :
                            order.status === 'ready' ? 'Готов к выдаче' :
                            order.status === 'completed' ? 'Выдан' :
                            'Отменён'
                          }
                        </p>
                        <p>Сумма: {order.total_amount} ₽</p>
                        <p>Дата: {new Date(order.created_at).toLocaleString()}</p>
                      </motion.div>
                    ))}

                    {/* Orders Pagination */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, i) => (
                        <Button
                          key={i}
                          onClick={() => paginate(i + 1)}
                          className={`${
                            currentPage === i + 1 ? 'bg-amber-500' : 'bg-amber-200'
                          }`}
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Детали заказа</h3>
                    {selectedOrder ? (
                      <Card className="p-4">
                        <div className="space-y-4">
                          <div>
                            <p className="font-semibold text-lg">Заказ #{selectedOrder.id.slice(0, 8)}</p>
                            <p>Имя: {selectedOrder.name}</p>
                            <p>Телефон: {selectedOrder.phone}</p>
                            <p>Email: {selectedOrder.email}</p>
                            <p>Адрес: {selectedOrder.address}</p>
                            <p>Доп. информация: {selectedOrder.additional_info}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-lg mb-2">Состав заказа:</h4>
                            <div className="space-y-2">
                              {orderItems.map((item) => (
                                <div key={item.id} className="flex justify-between items-center">
                                  <span>{item.product.name}</span>
                                  <span>{item.quantity} шт. x {item.price} ₽</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-lg mb-2">Комментарий администратора:</h4>
                            <Textarea
                              value={adminComment}
                              onChange={(e) => setAdminComment(e.target.value)}
                              placeholder="Добавьте комментарий к заказу"
                              className="w-full p-2 border rounded mb-2"
                            />
                            <Button
                              onClick={async () => {
                                try {
                                  await addOrderComment(selectedOrder.id, adminComment)
                                  setAdminComment('')
                                  fetchOrders()
                                  Swal.fire({
                                    toast: true,
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Комментарий добавлен',
                                    showConfirmButton: false,
                                    timer: 3000,
                                  })
                                } catch (error) {
                                  console.error('Error adding comment:', error)
                                  Swal.fire({
                                    toast: true,
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Ошибка при добавлении комментария',
                                    showConfirmButton: false,
                                    timer: 3000,
                                  })
                                }
                              }}
                              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600"
                            >
                              Добавить комментарий
                            </Button>
                            {selectedOrder.admin_comment && (
                              <div className="mt-2 p-2 bg-gray-100 rounded">
                                <p className="font-semibold">Текущий комментарий:</p>
                                <p>{selectedOrder.admin_comment}</p>
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {statusButtons.map((button) => (
                              <Button
                                key={button.status}
                                onClick={() => handleUpdateOrderStatus(selectedOrder.id, button.status)}
                                className={`${button.color} text-white w-full`}
                              >
                                {button.label}
                              </Button>
                            ))}
                            <Button
                              onClick={async () => {
                                try {
                                  await cancelOrder(selectedOrder.id)
                                  fetchOrders()
                                  setSelectedOrder(null)
                                  setOrderItems([])
                                  Swal.fire({
                                    toast: true,
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Заказ отменен',
                                    showConfirmButton: false,
                                    timer: 3000,
                                  })
                                } catch (error) {
                                  setError('Failed to cancel order')
                                  Swal.fire({
                                    toast: true,
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Ошибка при отмене заказа',
                                    showConfirmButton: false,
                                    timer: 3000,
                                  })
                                }
                              }}
                              className="bg-red-500 hover:bg-red-600 text-white w-full"
                            >
                              Отменить заказ
                            </Button>
                            {selectedOrder.status === 'completed' && (
                              <Button
                                onClick={async () => {
                                  try {
                                    await deleteOrder(selectedOrder.id)
                                    fetchOrders()
                                    setSelectedOrder(null)
                                    setOrderItems([])
                                    Swal.fire({
                                      toast: true,
                                      position: 'top-end',
                                      icon: 'success',
                                      title: 'Заказ удален',
                                      showConfirmButton: false,
                                      timer: 3000,
                                    })
                                  } catch (error) {
                                    setError('Failed to delete order')
                                    Swal.fire({
                                      toast: true,
                                      position: 'top-end',
                                      icon: 'error',
                                      title: 'Ошибка при удалении заказа',
                                      showConfirmButton: false,
                                      timer: 3000,
                                    })
                                  }
                                }}
                                className="bg-gray-500 hover:bg-gray-600 text-white w-full"
                              >
                                Удалить заказ
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    ) : (
                      <p>Выберите заказ для просмотра деталей</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

