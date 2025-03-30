"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Search, 
  MessageCircleQuestion, 
  BookOpen, 
  Lightbulb, 
  Sparkles, 
  GraduationCap, 
  Mail, 
  Phone, 
  MessageSquare, 
  LifeBuoy, 
  Loader2
} from "lucide-react";
import Logo from "@/components/logo";

const supportCategories = [
  {
    id: "general",
    name: "Общие вопросы",
    icon: <MessageCircleQuestion className="h-5 w-5" />,
    description: "Базовая информация о сервисе",
    articles: [
      { id: 1, title: "Что такое Hippocrat AI?", views: 1243 },
      { id: 2, title: "Как начать работу с платформой?", views: 986 },
      { id: 3, title: "Какие тарифы доступны?", views: 875 },
      { id: 4, title: "Как отменить подписку?", views: 732 }
    ]
  },
  {
    id: "medical",
    name: "Медицинская информация",
    icon: <BookOpen className="h-5 w-5" />,
    description: "Справочные материалы",
    articles: [
      { id: 5, title: "Какие медицинские источники использует Hippocrat AI?", views: 654 },
      { id: 6, title: "Насколько точна медицинская информация?", views: 589 },
      { id: 7, title: "Как задавать медицинские вопросы?", views: 542 },
      { id: 8, title: "Какие медицинские темы доступны?", views: 487 }
    ]
  },
  {
    id: "academic",
    name: "Учебные материалы",
    icon: <GraduationCap className="h-5 w-5" />,
    description: "Помощь в обучении",
    articles: [
      { id: 9, title: "Как подготовиться к экзамену с Hippocrat AI?", views: 876 },
      { id: 10, title: "Как создавать конспекты?", views: 765 },
      { id: 11, title: "Как использовать платформу для клинических разборов?", views: 643 },
      { id: 12, title: "Методики запоминания медицинских терминов", views: 564 }
    ]
  },
  {
    id: "technical",
    name: "Технические вопросы",
    icon: <Lightbulb className="h-5 w-5" />,
    description: "Устранение проблем",
    articles: [
      { id: 13, title: "Проблемы с авторизацией", views: 432 },
      { id: 14, title: "Не работает чат", views: 387 },
      { id: 15, title: "Как очистить историю вопросов?", views: 319 },
      { id: 16, title: "Не могу скачать конспект", views: 276 }
    ]
  }
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('help-center');
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Фильтрация статей на основе поискового запроса
  const filteredArticles = searchQuery
    ? supportCategories
        .flatMap(category => category.articles)
        .filter(article => 
          article.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : [];
  
  // Обработчик отправки формы обратной связи
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки формы
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Сброс формы
      setTimeout(() => {
        setContactFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };
  
  // Обработчик изменения полей формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Logo size="md" />
          <Link href="/">
            <Button variant="ghost" className="text-slate-400 hover:text-teal-400">
              <ArrowLeft size={16} className="mr-2" />
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero section */}
        <section className="max-w-4xl mx-auto mb-12 text-center">
          <div className="px-4 py-1 rounded-full bg-teal-900/30 border border-teal-700/30 text-teal-400 text-sm mb-6 inline-block">
            Поддержка
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 font-fixedsys">
            <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
              Как мы можем помочь?
            </span>
          </h1>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Найдите ответы на часто задаваемые вопросы или свяжитесь с нашей командой поддержки
          </p>
          
          {/* Поисковая строка */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
            <Input
              type="text"
              placeholder="Поиск по вопросам и ответам..."
              className="pl-10 py-6 bg-slate-900 border-slate-700 focus-visible:ring-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Результаты поиска */}
          {searchQuery.length > 0 && (
            <Card className="max-w-xl mx-auto mt-2 border-slate-800 bg-slate-900/60 backdrop-blur-sm">
              <CardContent className="p-4">
                {filteredArticles.length > 0 ? (
                  <ul className="space-y-2">
                    {filteredArticles.map((article) => (
                      <li key={article.id}>
                        <button className="w-full text-left p-2 hover:bg-slate-800 rounded-md transition-colors text-slate-300 hover:text-teal-400 flex items-center">
                          <Sparkles className="h-4 w-4 mr-2 text-teal-500 flex-shrink-0" />
                          <span>{article.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400 text-center py-2">По вашему запросу ничего не найдено</p>
                )}
              </CardContent>
            </Card>
          )}
        </section>
        
        {/* Табы для переключения между разделами */}
        <section className="max-w-4xl mx-auto mb-8">
          <Tabs defaultValue="help-center" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full md:w-auto mx-auto bg-slate-900/60">
              <TabsTrigger value="help-center" className="font-fixedsys data-[state=active]:bg-slate-800">
                <LifeBuoy className="mr-2 h-4 w-4" />
                Центр поддержки
              </TabsTrigger>
              <TabsTrigger value="contact" className="font-fixedsys data-[state=active]:bg-slate-800">
                <MessageSquare className="mr-2 h-4 w-4" />
                Связаться с нами
              </TabsTrigger>
            </TabsList>
            
            {/* Центр поддержки */}
            <TabsContent value="help-center" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportCategories.map((category) => (
                  <Card key={category.id} className="bg-slate-900/50 border-slate-800 hover:border-teal-500/30 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-teal-900/30 flex items-center justify-center text-teal-400">
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white font-fixedsys">{category.name}</h3>
                          <p className="text-sm text-slate-400">{category.description}</p>
                        </div>
                      </div>
                      
                      <ul className="space-y-2">
                        {category.articles.map((article) => (
                          <li key={article.id}>
                            <button className="w-full text-left p-2 hover:bg-slate-800 rounded-md transition-colors text-slate-300 hover:text-teal-400 flex items-start gap-2">
                              <Sparkles className="h-4 w-4 mt-0.5 text-teal-500 flex-shrink-0" />
                              <div className="flex flex-col">
                                <span>{article.title}</span>
                                <span className="text-xs text-slate-500">{article.views} просмотров</span>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-4 pt-4 border-t border-slate-800">
                        <button className="text-sm text-teal-400 hover:text-teal-300 hover:underline flex items-center">
                          Смотреть все статьи
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 20 20" 
                            fill="currentColor" 
                            className="w-4 h-4 ml-1"
                          >
                            <path 
                              fillRule="evenodd" 
                              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" 
                              clipRule="evenodd" 
                            />
                          </svg>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Форма связи */}
            <TabsContent value="contact" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4 font-fixedsys">Контактная информация</h2>
                    <p className="text-slate-400 mb-6">
                      У вас есть вопросы? Мы здесь, чтобы помочь вам решить любые проблемы и ответить на все вопросы.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-900/30 flex items-center justify-center text-teal-400 mt-1">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Email</h3>
                          <p className="text-sm text-slate-400">Ответ в течение 24 часов</p>
                          <a href="mailto:support@hippocrat.ai" className="text-teal-400 hover:underline">
                            support@hippocrat.ai
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-900/30 flex items-center justify-center text-teal-400 mt-1">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Живой чат</h3>
                          <p className="text-sm text-slate-400">Пн-Пт, 9:00-18:00 МСК</p>
                          <button className="text-teal-400 hover:underline">
                            Начать чат
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-900/30 flex items-center justify-center text-teal-400 mt-1">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Телефон</h3>
                          <p className="text-sm text-slate-400">Пн-Пт, 9:00-18:00 МСК</p>
                          <a href="tel:+79991234567" className="text-teal-400 hover:underline">
                            +7 (999) 123-45-67
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-3">
                  <Card className="bg-slate-900/50 border-slate-800">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4 font-fixedsys">Отправить сообщение</h2>
                      
                      {isSubmitted ? (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-8 w-8 text-emerald-500" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path 
                                fillRule="evenodd" 
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                                clipRule="evenodd" 
                              />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-white">Сообщение отправлено!</h3>
                          <p className="text-slate-400">
                            Спасибо за обращение. Мы ответим вам как можно скорее.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleContactSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                                Имя
                              </label>
                              <Input
                                id="name"
                                name="name"
                                placeholder="Введите ваше имя"
                                className="bg-slate-800 border-slate-700 focus-visible:ring-teal-500"
                                value={contactFormData.name}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                              />
                            </div>
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                Email
                              </label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="email@example.com"
                                className="bg-slate-800 border-slate-700 focus-visible:ring-teal-500"
                                value={contactFormData.email}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                              Тема
                            </label>
                            <Input
                              id="subject"
                              name="subject"
                              placeholder="Выберите тему сообщения"
                              className="bg-slate-800 border-slate-700 focus-visible:ring-teal-500"
                              value={contactFormData.subject}
                              onChange={handleInputChange}
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                              Сообщение
                            </label>
                            <Textarea
                              id="message"
                              name="message"
                              placeholder="Опишите ваш вопрос или проблему"
                              className="bg-slate-800 border-slate-700 focus-visible:ring-teal-500 min-h-[150px]"
                              value={contactFormData.message}
                              onChange={handleInputChange}
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Отправка...
                              </>
                            ) : (
                              "Отправить сообщение"
                            )}
                          </Button>
                        </form>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <Logo size="sm" className="mx-auto mb-4" />
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-teal-400">
                Главная
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-teal-400">
                О нас
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-teal-400">
                Тарифы
              </Button>
            </Link>
          </div>
          <p className="text-slate-400 text-sm">
            © 2025 Hippocrat AI. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}

