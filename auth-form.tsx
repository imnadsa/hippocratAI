"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react"
import Logo from "@/components/logo"

export default function AuthForm() {
  // Состояния для форм
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerName, setRegisterName] = useState("")
  const [registerUniversity, setRegisterUniversity] = useState("")
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  // Симуляция отправки формы входа
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Имитация запроса к серверу
    setTimeout(() => {
      setIsLoading(false)
      // Здесь будет редирект или другая логика после успешного входа
      console.log("Login attempt with:", { loginEmail, loginPassword })
    }, 1500)
  }

  // Симуляция отправки формы регистрации
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Имитация запроса к серверу
    setTimeout(() => {
      setIsLoading(false)
      // Здесь будет редирект или другая логика после успешной регистрации
      console.log("Register attempt with:", { registerName, registerEmail, registerPassword, registerUniversity })
    }, 1500)
  }

  // Список университетов для выпадающего списка
  const universities = [
    "Выберите университет",
    "Первый МГМУ им. И.М. Сеченова",
    "РНИМУ им. Н.И. Пирогова",
    "СЗГМУ им. И.И. Мечникова",
    "СПбГПМУ",
    "Казанский ГМУ",
    "Новосибирский ГМУ",
    "Самарский ГМУ",
    "Дальневосточный ГМУ",
    "Другой университет",
  ]

  return (
    <Card className="max-w-md w-full border-slate-800 bg-slate-900/70 backdrop-blur-sm">
      <CardHeader className="space-y-2 flex flex-col items-center">
        <Logo size="md" className="mb-4" />
        <CardTitle className="text-2xl font-fixedsys bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
          {activeTab === "login" ? "Вход в аккаунт" : "Регистрация"}
        </CardTitle>
        <CardDescription className="text-slate-400">
          {activeTab === "login"
            ? "Войдите, чтобы продолжить работу с Hippocrat AI"
            : "Создайте аккаунт для доступа ко всем возможностям"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full bg-slate-800">
            <TabsTrigger value="login" className="font-fixedsys data-[state=active]:bg-slate-700">
              Вход
            </TabsTrigger>
            <TabsTrigger value="register" className="font-fixedsys data-[state=active]:bg-slate-700">
              Регистрация
            </TabsTrigger>
          </TabsList>

          {/* Вкладка входа */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="email@example.com"
                    className="pl-10 bg-slate-800 border-slate-700"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="login-password">Пароль</Label>
                  <a
                    href="#"
                    className="text-xs text-teal-400 hover:underline"
                    onClick={(e) => {
                      e.preventDefault()
                      console.log("Forgot password clicked")
                    }}
                  >
                    Забыли пароль?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="login-password"
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-slate-800 border-slate-700"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-400"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                  >
                    {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Входим...
                  </>
                ) : (
                  "Войти"
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Вкладка регистрации */}
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Имя и фамилия</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Иван Иванов"
                    className="pl-10 bg-slate-800 border-slate-700"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="email@example.com"
                    className="pl-10 bg-slate-800 border-slate-700"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Пароль</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="register-password"
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-slate-800 border-slate-700"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-400"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  >
                    {showRegisterPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-university">Университет</Label>
                <select
                  id="register-university"
                  className="w-full h-10 px-3 py-2 rounded-md bg-slate-800 border-slate-700 text-slate-300"
                  value={registerUniversity}
                  onChange={(e) => setRegisterUniversity(e.target.value)}
                  required
                  disabled={isLoading}
                >
                  {universities.map((uni, index) => (
                    <option key={index} value={uni} disabled={index === 0}>
                      {uni}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Регистрируем...
                  </>
                ) : (
                  "Создать аккаунт"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-0">
        <div className="w-full flex items-center gap-2 mt-2">
          <div className="h-px flex-1 bg-slate-800"></div>
          <p className="text-xs text-slate-500">ИЛИ</p>
          <div className="h-px flex-1 bg-slate-800"></div>
        </div>

        <Button
          variant="outline"
          className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-200 space-x-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" className="text-blue-500">
            <path
              fill="currentColor"
              d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
            />
          </svg>
          <span>Продолжить через VK</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

