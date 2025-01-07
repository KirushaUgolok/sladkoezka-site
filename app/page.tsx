import Image from 'next/image'
import Link from 'next/link'
import Header from './components/header'
import Footer from './components/footer'
import { Star, Truck, Clock, Shield } from 'lucide-react'
import { getProducts } from '../lib/db'

export default async function Home() {
  // Получаем все продукты
  const allProducts = await getProducts()
  
  // Случайным образом выбираем 3 продукта
  const randomProducts = allProducts
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-amber-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
                  Изысканные десерты для особых моментов
                </h1>
                <p className="text-lg text-amber-800 mb-8">
                  Откройте для себя мир великолепных вкусов с нашими авторскими десертами, 
                  созданными с любовью и вниманием к каждой детали.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link 
                    href="/catalog" 
                    className="bg-amber-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-amber-600 transition duration-300"
                  >
                    Перейти в каталог
                  </Link>
                  <Link 
                    href="/about"
                    className="bg-white text-amber-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-amber-100 transition duration-300"
                  >
                    О нас
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px]">
                <Image
                  src="https://i.pinimg.com/736x/89/23/63/892363d01a406581c1a69bb74e18a635.jpg"
                  alt="Красивые десерты"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
              Почему выбирают нас
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Качество</h3>
                <p className="text-amber-700">
                  Только свежие и натуральные ингредиенты в каждом десерте
                </p>
              </div>
              <div id="delivery" className="text-center">
                <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Доставка</h3>
                <p className="text-amber-700">
                  Быстрая доставка по всему городу в специальных термоконтейнерах
                </p>
              </div>
              <div className="text-center">
                <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Свежесть</h3>
                <p className="text-amber-700">
                  Все десерты готовятся в день доставки
                </p>
              </div>
              <div className="text-center">
                <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Гарантия</h3>
                <p className="text-amber-700">
                  Гарантия качества и свежести каждого десерта
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Products Section */}
        <section className="py-16 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
              Популярные десерты
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {randomProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="relative h-48">
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-amber-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-amber-700 mb-4">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-amber-900">
                        {product.price} ₽
                      </span>
                      <Link
                        href={`/catalog?product=${product.id}`}
                        className="bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-amber-600 transition duration-300"
                      >
                        Заказать
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/catalog"
                className="inline-block bg-amber-100 text-amber-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-amber-200 transition duration-300"
              >
                Смотреть все десерты
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-amber-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-amber-900 mb-6">
              Готовы сделать заказ?
            </h2>
            <p className="text-lg text-amber-800 mb-8 max-w-2xl mx-auto">
              Порадуйте себя и своих близких изысканными десертами от наших кондитеров.
              Мы гарантируем качество и своевременную доставку.
            </p>
            <Link
              href="/catalog"
              className="inline-block bg-amber-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-amber-600 transition duration-300"
            >
              Перейти в каталог
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

