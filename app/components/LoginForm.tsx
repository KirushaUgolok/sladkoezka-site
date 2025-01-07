'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LoginFormProps {
  onLogin: (password: string) => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export default function LoginForm({ onLogin, isAuthenticated, onLogout }: LoginFormProps) {
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(password)
  }

  if (isAuthenticated) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Админ-панель</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">Вы уже авторизованы</p>
          <Button onClick={onLogout} className="w-full bg-red-500 hover:bg-red-600">
            Выйти
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Вход в админ-панель</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Войти
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

