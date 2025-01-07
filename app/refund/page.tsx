import Header from '../components/header'
import Footer from '../components/footer'

export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-amber-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-8">Возврат и обмен</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">Политика возврата</h2>
            <p className="mb-4">Мы стремимся обеспечить наивысшее качество наших десертов. Однако, если вы не удовлетворены качеством полученного товара, мы готовы осуществить возврат или обмен.</p>
            <ul className="list-disc list-inside mb-4">
              <li>Возврат или обмен возможен в течение 24 часов с момента получения заказа</li>
              <li>Товар должен быть в оригинальной упаковке и не иметь следов использования</li>
              <li>Для скоропортящихся товаров возврат возможен только в день доставки</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">Процедура возврата</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>Свяжитесь с нашей службой поддержки по телефону или электронной почте</li>
              <li>Опишите причину возврата и предоставьте номер заказа</li>
              <li>Мы организуем бесплатный вывоз товара курьером</li>
              <li>После проверки товара мы осуществим возврат средств или заменим товар</li>
            </ol>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">Возврат денежных средств</h2>
            <p className="mb-4">Возврат денежных средств осуществляется в течение 5-10 рабочих дней с момента получения возвращенного товара. Средства будут возвращены тем же способом, которым была произведена оплата.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">Исключения</h2>
            <p className="mb-4">Обратите внимание, что следующие товары не подлежат возврату или обмену:</p>
            <ul className="list-disc list-inside">
              <li>Товары, изготовленные на заказ по индивидуальным параметрам</li>
              <li>Товары со скидкой более 50%</li>
              <li>Товары, которые имеют явные следы использования или повреждения по вине покупателя</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

