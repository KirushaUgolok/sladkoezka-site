import Header from '../components/header'
import Footer from '../components/footer'
import { Truck, Clock, CreditCard, MapPin } from 'lucide-react'

export default function DeliveryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-amber-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-8">Доставка и оплата</h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4 flex items-center">
              <Truck className="mr-2" /> Условия доставки
            </h2>
            <p className="text-amber-900 mb-4">
              Мы стремимся сделать процесс доставки наших десертов максима��ьно удобным и быстрым для вас. Вот основная информация о нашей службе доставки:
            </p>
            <ul className="list-disc list-inside space-y-2 text-amber-900">
              <li>Доставка осуществляется ежедневно с 9:00 до 21:00</li>
              <li>Минимальная сумма заказа для доставки: 1000 руб.</li>
              <li>Стоимость доставки: 300 руб. (при заказе от 3000 руб. - бесплатно)</li>
              <li>Среднее время доставки: 60-90 минут</li>
              <li>Доставка осуществляется в специальных термоконтейнерах, сохраняющих свежесть и качество десертов</li>
            </ul>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4 flex items-center">
              <MapPin className="mr-2" /> Зона доставки
            </h2>
            <p className="text-amber-900 mb-4">
              Мы доставляем наши десерты по всему городу и ближайшим пригородам. Точную информацию о возможности доставки по вашему адресу вы можете уточнить при оформлении заказа или у наших операторов.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4 flex items-center">
              <Clock className="mr-2" /> Время работы
            </h2>
            <ul className="list-disc list-inside space-y-2 text-amber-900">
              <li>Прием заказов: круглосуточно через сайт</li>
              <li>Доставка: ежедневно с 9:00 до 21:00</li>
              <li>Самовывоз из кондитерской: ежедневно с 8:00 до 22:00</li>
            </ul>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4 flex items-center">
              <CreditCard className="mr-2" /> Способы оплаты
            </h2>
            <p className="text-amber-900 mb-4">
              Для вашего удобства мы предлагаем несколько способов оплаты:
            </p>
            <ul className="list-disc list-inside space-y-2 text-amber-900">
              <li>Наличными курьеру при получении</li>
              <li>Банковской картой курьеру при получении</li>
              <li>Онлайн-оплата на сайте (Visa, MasterCard, МИР)</li>
              <li>Через системы электронных платежей (Apple Pay, Google Pay)</li>
            </ul>
            <p className="text-amber-900 mt-4">
              Все способы оплаты безопасны и гарантируют сохранность ваших данных.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">Важная информация</h2>
            <ul className="list-disc list-inside space-y-2 text-amber-900">
              <li>При получении заказа, пожалуйста, проверяйте комплектацию и отсутствие повреждений</li>
              <li>Если курьер опаздывает более чем на 15 минут от оговоренного времени, мы предоставим вам скидку 10% на следующий заказ</li>
              <li>Для заказов на определенное время (например, ко дню рождения), рекомендуем оформлять доставку заранее</li>
              <li>Если у вас есть особые пожелания по доставке, укажите их в комментарии к заказу</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

