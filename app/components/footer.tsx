import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">О нас</h3>
            <p className="text-sm">
              Мы создаем изысканные десерты с любовью и заботой, используя только натуральные ингредиенты высочайшего качества.
            </p>
          </div>
          
          <div id="contacts">
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+7999999999">+7 (999) 999-99-99</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@sweetreats.ru">info@sldakoezka.ru</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>ул. Примерная, 123, Москва</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Время работы</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Clock size={16} />
                <span>Пн-Пт: 9:00 - 20:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} />
                <span>Сб-Вс: 10:00 - 18:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Информация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/delivery" className="hover:text-amber-300">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-amber-300">
                  Возврат и обмен
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-300">
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Сладкоежка. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

