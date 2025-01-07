import Header from '../components/header'
import Footer from '../components/footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-amber-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-8">О нас</h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">Наша история</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full">
                <p className="text-amber-900 mb-4">
                  "Сладкоежка" - это кондитерская, которая выросла из любви к десертам и стремления создавать неповторимые вкусовые впечатления. Наш путь начался с маленькой домашней кухни и превратился в любимое место для ценителей сладкого по всему городу.
                </p>
                <p className="text-amber-900 mb-4">
                  С годами мы совершенствовали наши рецепты, экспериментировали с ингредиентами и техниками, чтобы каждый десерт был особенным. Сегодня "Сладкоежка" - это синоним качества, вкуса и красоты в мире десертов.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">Наша философия</h2>
            <ul className="list-disc list-inside space-y-2 text-amber-900">
              <li>Использование только натуральных и высококачественных ингредиентов</li>
              <li>Создание десертов с вниманием к каждой детали</li>
              <li>Постоянное совершенствование рецептур и техник приготовления</li>
              <li>Стремление превратить каждый десерт в особенное гастрономическое впечатление</li>
            </ul>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">Наша команда</h2>
            <p className="text-amber-900 mb-4">
              За каждым великолепным десертом стоит команда увлеченных профессионалов. Наши кондитеры - это мастера своего дела, которые постоянно совершенствуют свои навыки и следят за последними тенденциями в мире кондитерского искусства.
            </p>
            <p className="text-amber-900 mb-4">
              Мы гордимся тем, что наша команда состоит из людей, искренне любящих свое дело и стремящихся создавать настоящие кулинарные шедевры.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">Наш подход</h2>
            <ul className="list-disc list-inside space-y-2 text-amber-900">
              <li>Индивидуальный подход к каждому клиенту и его пожеланиям</li>
              <li>Использование современных технологий для сохранения свежести и качества десертов</li>
              <li>Постоянное расширение ассортимента и создание сезонных предложений</li>
              <li>Строгий контроль качества на всех этапах производства</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

