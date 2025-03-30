"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowUp, Sparkles, Clock, Loader2 } from "lucide-react";

// Типы для сообщений чата
type MessageType = 'user' | 'ai';

interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
}

// Примеры демонстрационных вопросов для пользователя
const DEMO_QUESTIONS = [
  "Объясни механизм действия антибиотиков пенициллинового ряда",
  "Как организовать подготовку к экзамену по анатомии?",
  "Расскажи о строении сердца человека простыми словами",
  "В чём разница между симптоматическим и патогенетическим лечением?",
];

// Заготовленные ответы для демонстрации
const DEMO_ANSWERS: Record<string, string> = {
  "Объясни механизм действия антибиотиков пенициллинового ряда": 
    `Антибиотики пенициллинового ряда работают по принципу нарушения синтеза клеточной стенки бактерий:

1. Пенициллины связываются с пенициллинсвязывающими белками (ПСБ) в клеточной стенке бактерий.

2. Это нарушает процесс образования пептидогликана — основного компонента клеточной стенки.

3. В результате бактериальная клетка теряет структурную целостность, не может противостоять осмотическому давлению и разрушается.

Это бактерицидный механизм действия — антибиотик убивает бактерии, а не просто останавливает их рост.

Важно отметить, что клетки человека не имеют клеточной стенки с пептидогликаном, поэтому пенициллины имеют высокую избирательность действия и низкую токсичность для человека.`,

  "Как организовать подготовку к экзамену по анатомии?": 
    `# Эффективная подготовка к экзамену по анатомии:

1. **Составь структурированный план:**
   - Раздели материал на логические блоки (системы органов)
   - Выдели 2-3 недели перед экзаменом для полного повторения

2. **Используй разные форматы изучения:**
   - Читай учебник для базового понимания
   - Смотри анатомические атласы и схемы
   - Работай с 3D-моделями (физическими или цифровыми)
   - Рисуй схемы и структуры самостоятельно

3. **Применяй активные методы запоминания:**
   - Используй мнемонические техники для запоминания сложных названий
   - Объясняй материал воображаемому студенту
   - Создавай карточки с терминами

4. **Практикуй регулярно:**
   - Решай тесты из разных источников
   - Отвечай на вопросы из прошлых экзаменов
   - Участвуй в групповых занятиях и обсуждениях

5. **Не забывай о физиологии:**
   - Свяжи анатомические структуры с их функциями
   - Понимай клиническое значение каждой структуры

В день перед экзаменом просмотри только основные схемы и термины, выспись и не перегружай мозг новой информацией.`,

  "Расскажи о строении сердца человека простыми словами": 
    `Сердце — это мышечный орган размером примерно с кулак человека, расположенный в центре грудной клетки, немного смещённый влево.

**Основные части:**

1. **Четыре камеры:**
   - Два предсердия (верхние камеры) — принимают кровь
   - Два желудочка (нижние камеры) — выталкивают кровь

2. **Перегородки:**
   - Разделяют сердце на правую и левую половины
   - Предотвращают смешивание артериальной и венозной крови

3. **Клапаны:**
   - Створчатые клапаны (между предсердиями и желудочками) — трёхстворчатый справа и митральный слева
   - Полулунные клапаны (на выходе из желудочков) — аортальный и лёгочный
   - Работают как односторонние двери, обеспечивая движение крови только в одном направлении

4. **Крупные сосуды:**
   - Аорта — выносит насыщенную кислородом кровь из левого желудочка
   - Лёгочная артерия — несёт венозную кровь из правого желудочка в лёгкие
   - Полые вены — приносят венозную кровь в правое предсердие
   - Лёгочные вены — несут артериальную кровь из лёгких в левое предсердие

Правая часть сердца принимает венозную кровь и отправляет её в лёгкие для насыщения кислородом. Левая часть получает насыщенную кислородом кровь из лёгких и отправляет её по всему организму.`,

  "В чём разница между симптоматическим и патогенетическим лечением?": 
    `**Симптоматическое лечение:**

Направлено на устранение симптомов (проявлений) заболевания, а не его причин или механизмов.

**Примеры:**
- Жаропонижающие при лихорадке
- Анальгетики при боли
- Противорвотные средства
- Противокашлевые препараты

**Преимущества:**
- Быстрое облегчение состояния пациента
- Улучшение качества жизни

**Недостатки:**
- Не устраняет причину заболевания
- Часто требуется постоянное применение препаратов

**Патогенетическое лечение:**

Направлено на прерывание или коррекцию механизмов развития болезни (патогенеза).

**Примеры:**
- Противовоспалительные при аутоиммунных заболеваниях
- Антикоагулянты при тромбозах
- Антигистаминные при аллергических реакциях
- Инсулин при сахарном диабете

**Преимущества:**
- Воздействует на механизмы болезни
- Более долгосрочный эффект
- Может предотвращать прогрессирование заболевания

**Недостатки:**
- Часто требует времени для проявления эффекта
- Может быть менее специфичным

В идеале лечение должно включать все уровни: этиотропное (устраняющее причину), патогенетическое и симптоматическое.`,
};

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Привет! Я Hippocrat AI, твой личный ассистент для изучения медицины. Что бы ты хотел узнать сегодня?',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Прокрутка к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Функция для добавления нового сообщения
  const addMessage = (content: string, type: MessageType) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, newMessage]);
  };
  
  // Обработка отправки сообщения
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Добавляем сообщение пользователя
    addMessage(inputValue, 'user');
    
    // Очищаем поле ввода
    setInputValue('');
    
    // Имитируем ответ от AI с задержкой
    setIsLoading(true);
    
    setTimeout(() => {
      // Получаем заготовленный ответ или стандартный
      const response = DEMO_ANSWERS[inputValue.trim()] || 
        `Привет! Это Hippocrat AI, на сайте пока не представлен удобный ИИ интерфейс. Заходи в наш Telegram Bot и спрашивай что угодно!`;
      
      addMessage(response, 'ai');
      setIsLoading(false);
    }, 1500);
  };
  
  // Обработка нажатия Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Обработка клика на демо-вопрос
  const handleDemoQuestionClick = (question: string) => {
    setInputValue(question);
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto h-[600px] flex flex-col bg-slate-900 border-slate-700">
      <CardHeader className="border-b border-slate-800">
        <CardTitle className="flex items-center gap-2 font-fixedsys">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-indigo-600 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          Hippocrat AI Чат
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div 
              className={`flex gap-3 max-w-[80%] ${
                message.type === 'user' 
                  ? 'flex-row-reverse' 
                  : 'flex-row'
              }`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user'
                    ? 'bg-slate-800 text-slate-400'
                    : 'bg-gradient-to-r from-teal-500 to-indigo-600 text-white'
                }`}
              >
                {message.type === 'user' ? 'ТЫ' : <Brain className="w-4 h-4" />}
              </div>
              
              <div 
                className={`rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-slate-800 text-slate-300'
                    : 'bg-slate-800/50 border border-slate-700/50 text-slate-300'
                }`}
              >
                <div className="whitespace-pre-line">
                  {message.content}
                </div>
                <div className="text-xs text-slate-500 mt-2 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-indigo-600 flex items-center justify-center flex-shrink-0 text-white">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <div className="rounded-lg p-3 bg-slate-800/50 border border-slate-700/50 text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </CardContent>
      
      <div className="px-4 py-3 border-t border-slate-800 bg-slate-900/50">
        <div className="text-xs text-slate-500 mb-2">Попробуйте спросить:</div>
        <div className="flex flex-wrap gap-2 mb-4">
          {DEMO_QUESTIONS.map((question, index) => (
            <button
              key={index}
              onClick={() => handleDemoQuestionClick(question)}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-full transition-colors"
            >
              {question.length > 25 ? question.substring(0, 25) + '...' : question}
            </button>
          ))}
        </div>
      </div>
      
      <CardFooter className="pt-0 pb-4 px-4">
        <div className="relative w-full flex items-center">
          <Input
            placeholder="Задайте медицинский вопрос..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-12 bg-slate-800 border-slate-700 focus-visible:ring-teal-500"
            disabled={isLoading}
          />
          <Button
            size="icon"
            className="absolute right-1 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 rounded-full h-8 w-8"
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

