'use client'

import { useState, useEffect } from 'react'
import { getOrders, Order, generateDemoUserId } from '../../lib/db'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const demoUserId = generateDemoUserId()
    setUserId(demoUserId)
    fetchOrders(demoUserId)
  }, [])

  async function fetchOrders(userId: string) {
    const fetchedOrders = await getOrders(userId)
    setOrders(fetchedOrders)
  }

  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-amber-800 text-center">История заказов</h1>
        {orders.length === 0 ? (
          <p className="text-center">У вас пока нет заказов</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-2">Заказ #{order.id.slice(0, 8)}</h2>
                <p className="text-gray-600 mb-2">Дата: {new Date(order.created_at).toLocaleString()}</p>
                <p className="text-gray-600 mb-2">Статус: {order.status}</p>
                <p className="text-xl font-bold">Итого: {order.total_amount} руб.</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

