import Header from '../components/header'
import Footer from '../components/footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-amber-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-8">Политика конфиденциальности</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">1. Общие положения</h2>
            <p className="mb-4">Настоящая политика конфиденциальности описывает, как мы собираем, используем и защищаем вашу личную информацию. Мы уважаем вашу приватность и обязуемся защищать ваши персональные данные.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">2. Сбор информации</h2>
            <p className="mb-4">Мы собираем следующую информацию:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Имя и контактные данные</li>
              <li>Адрес доставки</li>
              <li>История заказов</li>
              <li>Информация о платежах</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">3. Использование информации</h2>
            <p className="mb-4">Мы используем собранную информацию для:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Обработки и доставки заказов</li>
              <li>Улучшения качества обслуживания</li>
              <li>Отправки информации о специальных предложениях (с вашего согласия)</li>
              <li>Анализа и улучшения наших продуктов и услуг</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">4. Защита информации</h2>
            <p className="mb-4">Мы принимаем все необходимые меры для защиты вашей личной информации от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">5. Раскрытие информации третьим лицам</h2>
            <p className="mb-4">Мы не продаем, не обмениваем и не передаем вашу личную информацию третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">6. Изменения в политике конфиденциальности</h2>
            <p className="mb-4">Мы оставляем за собой право вносить изменения в нашу политику конфиденциальности. Все изменения будут опубликованы на этой странице.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

