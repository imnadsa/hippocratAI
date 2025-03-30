"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  SendHorizonal,
  Mic,
  MicOff,
  Image,
  FileText,
  Loader2,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share,
  Sparkles,
  CheckCircle2,
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  status?: "sending" | "sent" | "error"
  citations?: Array<{ text: string; source: string }>
}

interface ChatInterfaceProps {
  initialPrompt?: string
  chatId?: string
  isPro?: boolean
  messagesLimit?: number | null
  messagesLeft?: number | null
  onSendMessage?: (message: string) => Promise<void>
}

export default function ChatInterface({
  initialPrompt = "",
  chatId,
  isPro = false,
  messagesLimit = null,
  messagesLeft = null,
  onSendMessage,
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState(initialPrompt)
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Автоматически прокручиваем к последнему сообщению
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Изменяем высоту textarea в зависимости от содержимого
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [inputValue])

  // Обработчик для копирования содержимого сообщения
  const handleCopyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedMessageId(id)

    // Сбрасываем состояние через 2 секунды
    setTimeout(() => {
      setCopiedMessageId(null)
    }, 2000)
  }

  // Обработчик для отправки сообщения
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      status: "sending",
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")
    setIsLoading(true)

    // Имитация ответа ИИ с задержкой
    try {
      if (onSendMessage) {
        await onSendMessage(inputValue)
      }

      setTimeout(() => {
        // Обновление статуса сообщения пользователя
        setMessages((prev) => prev.map((msg) => (msg.id === newUserMessage.id ? { ...msg, status: "sent" } : msg)))

        // Добавление ответа ИИ (для демо)
        const aiResponseText = getAIResponse(inputValue)

        const newAIMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponseText,
          sender: "ai",
          timestamp: new Date(),
          citations: [
            { text: "Harrison's Principles of Internal Medicine", source: "pp. 1823-1826" },
            { text: "Journal of American Medical Association", source: "2023; 329(12): 982-994" },
          ],
        }

        setMessages((prev) => [...prev, newAIMessage])
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => prev.map((msg) => (msg.id === newUserMessage.id ? { ...msg, status: "error" } : msg)))
      setIsLoading(false)
    }
  }

  // Обработчик нажатия клавиши Enter для отправки сообщения
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Имитация распознавания речи
  const toggleRecording = () => {
    if (isRecording) {
      // Остановка записи
      setIsRecording(false)
      setInputValue((prev) => prev + " Текст из распознавания речи.")
    } else {
      // Начало записи
      setIsRecording(true)
      setTimeout(() => {
        setIsRecording(false)
        setInputValue((prev) => prev + " Распознанный текст: патофизиология сердечно-сосудистых заболеваний.")
      }, 3000)
    }
  }

  // Имитация загрузки изображения
  const handleImageUpload = () => {
    alert("Функция загрузки изображений будет доступна в скором времени!")
  }

  // Имитация загрузки документа
  const handleDocumentUpload = () => {
    alert("Функция загрузки документов будет доступна в скором времени!")
  }

  // Упрощенная генерация ответа ИИ (для демо)
  const getAIResponse = (query: string): string => {
    const responses = [
      "Патофизиология сердечной недостаточности включает в себя ряд компенсаторных механизмов, которые изначально пытаются поддерживать функцию сердца, но со временем становятся дезадаптивными.\n\nОсновные механизмы включают:\n\n1. **Симпатическую активацию** - Повышается уровень катехоламинов, что приводит к увеличению частоты сердечных сокращений и силы сокращения. Однако длительная активация вызывает апоптоз кардиомиоцитов и снижение чувствительности β-адренорецепторов.\n\n2. **Активацию ренин-ангиотензин-альдостероновой системы (RAAS)** - Это приводит к задержке натрия и воды, увеличению преднагрузки и постнагрузки.\n\n3. **Ремоделирование сердца** - Включает гипертрофию и дилатацию, что изначально помогает поддерживать сердечный выброс, но в конечном итоге приводит к ухудшению функции.\n\n4. **Диастолическую дисфункцию** - Нарушение расслабления и наполнения желудочков из-за изменений в кальциевом гомеостазе и увеличения жесткости миокарда.\n\nВсе эти механизмы в конечном итоге приводят к порочному кругу, усугубляющему сердечную недостаточность.",

      "Бета-блокаторы (β-адреноблокаторы) - это класс препаратов, которые блокируют действие адреналина и норадреналина на β-адренорецепторы.\n\n**Механизм действия при гипертонии:**\n\n1. **Снижение сердечного выброса** - β-блокаторы уменьшают частоту сердечных сокращений и силу сокращений миокарда, что приводит к снижению сердечного выброса и, следовательно, артериального давления.\n\n2. **Снижение секреции ренина** - Ингибирование β1-рецепторов в юкстагломерулярном аппарате почек снижает секрецию ренина, что приводит к уменьшению образования ангиотензина II и альдостерона.\n\n3. **Влияние на ЦНС** - Некоторые β-блокаторы проникают через гематоэнцефалический барьер и снижают симпатический тонус центрального происхождения.\n\n4. **Ресенситизация барорецепторов** - Восстановление чувствительности барорецепторов, которая снижена при гипертонии.\n\n**Клиническое применение при гипертонии:**\n- Наиболее эффективны у пациентов с высокой активностью симпатической нервной системы\n- Часто используются в комбинации с другими антигипертензивными препаратами\n- Особенно полезны у пациентов с сопутствующей ИБС, перенесенным инфарктом миокарда или тахиаритмиями\n\n**Побочные эффекты:**\n- Брадикардия\n- Нарушения проводимости\n- Бронхоспазм (особенно неселективные β-блокаторы)\n- Маскировка симптомов гипогликемии\n- Утомляемость, депрессия",

      "Классификация антибиотиков основана на нескольких критериях, включая химическую структуру, механизм действия и спектр активности.\n\n**Основные классы антибиотиков:**\n\n1. **Бета-лактамы**\n   - Пенициллины (ампициллин, амоксициллин)\n   - Цефалоспорины (цефтриаксон, цефепим)\n   - Карбапенемы (меропенем, имипенем)\n   - Монобактамы (азтреонам)\n\n2. **Аминогликозиды** (гентамицин, амикацин)\n\n3. **Макролиды** (эритромицин, азитромицин, кларитромицин)\n\n4. **Тетрациклины** (доксициклин, миноциклин)\n\n5. **Фторхинолоны** (ципрофлоксацин, левофлоксацин)\n\n6. **Гликопептиды** (ванкомицин, телаванцин)\n\n7. **Оксазолидиноны** (линезолид)\n\n8. **Липопептиды** (даптомицин)\n\n**По механизму действия:**\n\n1. **Ингибиторы синтеза клеточной стенки** (бета-лактамы, гликопептиды)\n2. **Ингибиторы синтеза белка** (аминогликозиды, макролиды, тетрациклины)\n3. **Ингибиторы нуклеиновых кислот** (фторхинолоны, рифампицин)\n4. **Ингибиторы метаболических путей** (сульфаниламиды, триметоприм)\n5. **Нарушающие мембранную функцию** (полимиксины, даптомицин)\n\nВыбор антибиотика должен основываться на предполагаемом или подтвержденном возбудителе, локализации инфекции, фармакокинетике препарата и индивидуальных особенностях пациента.",
    ]

    // Очень простая логика выбора ответа для демо
    if (query.toLowerCase().includes("сердечн")) {
      return responses[0]
    } else if (query.toLowerCase().includes("бета") || query.toLowerCase().includes("блокатор")) {
      return responses[1]
    } else if (query.toLowerCase().includes("антибиотик")) {
      return responses[2]
    }

    // Дефолтный ответ
    return "Привет! Это Hippocrat AI, на сайте пока не представлен удобный ИИ интерфейс. Заходи в наш Telegram Bot и спрашивай что угодно!"
  }

  // Индикатор ограничения сообщений для бесплатного тарифа
  const renderMessagesLimitInfo = () => {
    if (messagesLimit === null || messagesLeft === null) return null

    const percentLeft = (messagesLeft / messagesLimit) * 100

    return (
      <div className="mb-4 px-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">
            Осталось бесплатных запросов: {messagesLeft} из {messagesLimit}
          </span>
          {percentLeft < 30 && (
            <button className="text-teal-400 hover:text-teal-300 hover:underline">Перейти на Pro</button>
          )}
        </div>
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-indigo-600"
            style={{ width: `${percentLeft}%` }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
      {/* Чат header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold font-fixedsys">{chatId ? "Продолжение диалога" : "Новый чат"}</h2>
          {isPro && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-teal-500/20 to-indigo-500/20 border border-teal-500/30 text-xs text-teal-400">
              <Sparkles className="h-3 w-3" />
              <span>Pro</span>
            </div>
          )}
        </div>
      </div>

      {/* Основная область чата */}
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500/20 to-indigo-500/20 flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-teal-400" />
            </div>
            <h3 className="text-lg font-medium mb-2 font-fixedsys">Начните разговор с Hippocrat AI</h3>
            <p className="text-slate-400 max-w-md mb-6">
              Задайте любой вопрос по медицине, анатомии, физиологии или подготовке к экзаменам
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl">
              {[
                "Объясни патофизиологию сердечной недостаточности",
                "Какие существуют виды кровотечений и методы их остановки?",
                "Расскажи про строение и функции печени",
                "Как подготовиться к экзамену по фармакологии?",
              ].map((prompt, index) => (
                <button
                  key={index}
                  className="text-left p-3 rounded-lg border border-slate-800 bg-slate-900/50 text-slate-300 hover:border-teal-500/50 hover:bg-slate-800 transition-colors"
                  onClick={() => setInputValue(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-3xl rounded-lg p-4 ${
                    message.sender === "user"
                      ? "bg-indigo-900/20 border border-indigo-900/30 text-white"
                      : "bg-slate-900/50 border border-slate-800 text-slate-200"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>

                  {/* Дополнительные элементы сообщения */}
                  <div
                    className={`flex mt-2 pt-2 text-xs ${
                      message.sender === "user"
                        ? "justify-end border-t border-indigo-800/30"
                        : "justify-between border-t border-slate-800"
                    }`}
                  >
                    {message.sender === "ai" && (
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full text-slate-500 hover:text-teal-400"
                              >
                                <ThumbsUp className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>Полезный ответ</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full text-slate-500 hover:text-red-400"
                              >
                                <ThumbsDown className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>Неполезный ответ</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full text-slate-500 hover:text-teal-400"
                                onClick={() => handleCopyMessage(message.id, message.content)}
                              >
                                {copiedMessageId === message.id ? (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>{copiedMessageId === message.id ? "Скопировано!" : "Копировать текст"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full text-slate-500 hover:text-teal-400"
                              >
                                <Share className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>Поделиться ответом</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}

                    <span className={`text-${message.sender === "user" ? "indigo" : "slate"}-400 self-end`}>
                      {message.status === "sending" ? (
                        <span className="flex items-center">
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          Отправка...
                        </span>
                      ) : message.status === "error" ? (
                        <span className="text-red-400">Ошибка отправки</span>
                      ) : (
                        message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                      )}
                    </span>
                  </div>

                  {/* Цитирование источников */}
                  {message.sender === "ai" && message.citations && message.citations.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-800">
                      <p className="text-xs text-slate-500 mb-1">Источники:</p>
                      <div className="space-y-1">
                        {message.citations.map((citation, idx) => (
                          <div key={idx} className="text-xs">
                            <span className="text-teal-400">{citation.text}</span>
                            <span className="text-slate-500"> ({citation.source})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>

      {/* Индикатор оставшихся сообщений */}
      {!isPro && renderMessagesLimitInfo()}

      {/* Панель ввода сообщения */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-start gap-2">
          <div className="flex-grow relative">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Задайте вопрос..."
              className="min-h-[52px] max-h-[200px] py-3 pr-12 resize-none bg-slate-900 border-slate-700 focus-visible:ring-teal-500"
            />
            <div className="absolute right-3 bottom-3">
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 rounded-full text-slate-400 hover:text-teal-400"
                disabled={isLoading}
                onClick={toggleRecording}
              >
                {isRecording ? <MicOff className="h-4 w-4 text-red-400" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10 border-slate-700 text-slate-400 hover:text-teal-400"
                    onClick={handleImageUpload}
                    disabled={isLoading}
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Загрузить изображение</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10 border-slate-700 text-slate-400 hover:text-teal-400"
                    onClick={handleDocumentUpload}
                    disabled={isLoading}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Загрузить документ</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              className="rounded-full h-10 w-10 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 p-0"
              disabled={isLoading || !inputValue.trim()}
              onClick={handleSendMessage}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Информация о тарифных ограничениях */}
        {!isPro && (
          <div className="mt-3 text-xs text-slate-500 flex items-center justify-center">
            <Sparkles className="h-3 w-3 mr-1 text-slate-400" />
            <span>Бесплатный тариф ограничен {messagesLimit} запросами в день. </span>
            <button className="ml-1 text-teal-400 hover:underline">Перейти на Pro</button>
          </div>
        )}
      </div>
    </div>
  )
}

