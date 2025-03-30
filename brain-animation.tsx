"use client"

import { useEffect, useRef, useState } from "react"

// Добавляем стили для анимации ЭЭГ
const eegAnimationStyle = `
@keyframes eegDraw {
  0% {
    stroke-dashoffset: 1200;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
`

export default function BrainAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on a mobile device for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Установка размеров холста
    const setCanvasDimensions = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Система частиц - уменьшаем количество на мобильных для производительности
    const particleCount = isMobile ? 60 : 120
    const particles: Particle[] = []
    const connections: Connection[] = []

    // Переменные для отслеживания мыши
    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2
    const mouseRadius = isMobile ? 70 : 100

    // Обработчик движения мыши
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    // Обработчик касания для мобильных устройств
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseX = e.touches[0].clientX - rect.left
        mouseY = e.touches[0].clientY - rect.top
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true })

    // Создание частиц
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        color: getGradientColor(Math.random()),
        originalSpeed: Math.random() * 0.5 - 0.25, // Сохраняем исходную скорость
      })
    }

    // Создание соединений - меньше на мобильных
    const connectionDensity = isMobile ? 0.985 : 0.97
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        if (Math.random() > connectionDensity) {
          connections.push({
            from: i,
            to: j,
          })
        }
      }
    }

    // Автоматическое движение для мобильных (чтобы анимация была интересной без взаимодействия)
    let autoAngle = 0

    // Цикл анимации
    let animationFrameId: number
    let lastTime = 0

    const render = (time: number) => {
      // Ограничим частоту кадров на мобильных устройствах
      if (isMobile && time - lastTime < 30) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      lastTime = time
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Рисуем форму мозга
      const maxDistance = Math.min(canvas.width, canvas.height) * 0.4
      drawBrainShape(ctx, canvas.width / 2, canvas.height / 2, maxDistance)

      // Автоматическое движение на мобильных устройствах
      if (isMobile) {
        autoAngle += 0.01
        const autoX = canvas.width / 2 + Math.cos(autoAngle) * (maxDistance * 0.6)
        const autoY = canvas.height / 2 + Math.sin(autoAngle) * (maxDistance * 0.6)
        const autoRadius = mouseRadius * 0.7

        // Используем это как дополнительную точку притяжения/отталкивания
        particles.forEach((particle) => {
          const dx = particle.x - autoX
          const dy = particle.y - autoY
          const distToAuto = Math.sqrt(dx * dx + dy * dy)

          if (distToAuto < autoRadius) {
            const factor = 1 - distToAuto / autoRadius
            particle.vx += dx * 0.0005 * factor
            particle.vy += dy * 0.0005 * factor
          }
        })
      }

      // Обновляем и рисуем частицы
      particles.forEach((particle, index) => {
        // Проверяем близость к курсору мыши
        const dx = particle.x - mouseX
        const dy = particle.y - mouseY
        const distToMouse = Math.sqrt(dx * dx + dy * dy)

        // Если частица близко к курсору, ускоряем её
        if (distToMouse < mouseRadius) {
          const factor = 1 - distToMouse / mouseRadius
          particle.vx += dx * 0.001 * factor
          particle.vy += dy * 0.001 * factor
        } else {
          // Постепенно возвращаем к исходной скорости
          particle.vx = particle.vx * 0.98 + particle.originalSpeed * 0.02
          particle.vy = particle.vy * 0.98 + particle.originalSpeed * 0.02
        }

        // Обновляем позицию
        particle.x += particle.vx
        particle.y += particle.vy

        // Отскакиваем от краёв с небольшим отступом
        const padding = isMobile ? 30 : 50
        if (particle.x < padding || particle.x > canvas.width - padding) {
          particle.vx *= -1
        }
        if (particle.y < padding || particle.y > canvas.height - padding) {
          particle.vy *= -1
        }

        // Удерживаем частицы в форме мозга
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        const dx2 = particle.x - centerX
        const dy2 = particle.y - centerY
        const distance = Math.sqrt(dx2 * dx2 + dy2 * dy2)

        if (distance > maxDistance) {
          // Возвращаем к центру
          particle.vx -= dx2 * 0.01
          particle.vy -= dy2 * 0.01
        }

        // Рисуем частицу
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      // Рисуем соединения c учетом производительности на мобильных
      const maxConnectionDistance = isMobile ? 80 : 100
      connections.forEach((connection) => {
        const from = particles[connection.from]
        const to = particles[connection.to]

        const dx = to.x - from.x
        const dy = to.y - from.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Рисуем соединения только если частицы достаточно близко
        if (distance < maxConnectionDistance) {
          ctx.beginPath()
          ctx.moveTo(from.x, from.y)
          ctx.lineTo(to.x, to.y)
          ctx.strokeStyle = `rgba(74, 229, 207, ${0.3 - distance * 0.003})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      })

      // Добавляем пульсацию
      const currentTime = Date.now() * 0.001
      const pulse = Math.sin(currentTime) * 0.5 + 0.5

      // Рисуем пульсирующие нейронные импульсы (меньше на мобильных)
      const pulseCount = isMobile ? 3 : 5
      for (let i = 0; i < pulseCount; i++) {
        const angle = currentTime * 0.5 + i * Math.PI * 0.4
        const x = canvas.width / 2 + Math.cos(angle) * maxDistance * 0.6
        const y = canvas.height / 2 + Math.sin(angle) * maxDistance * 0.6

        ctx.beginPath()
        ctx.arc(x, y, 3 + pulse * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(79, 99, 255, ${0.7 * pulse})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render(0)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", checkMobile)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("touchmove", handleTouchMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile])

  return (
    <div className="w-full h-full relative overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" style={{ background: "transparent" }} />

      {/* Элегантные медицинские элементы - адаптивные для мобильных */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Тонкие линии, обозначающие области мозга */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M50,20 C60,20 70,30 70,40 C70,60 60,70 50,70 C40,70 30,60 30,40 C30,30 40,20 50,20"
            fill="none"
            stroke="rgba(45, 212, 191, 0.5)"
            strokeWidth="0.2"
          />
          <path
            d="M50,25 C58,25 65,32 65,40 C65,55 58,65 50,65 C42,65 35,55 35,40 C35,32 42,25 50,25"
            fill="none"
            stroke="rgba(99, 102, 241, 0.5)"
            strokeWidth="0.2"
          />
          <path
            d="M50,30 C56,30 60,34 60,40 C60,50 56,60 50,60 C44,60 40,50 40,40 C40,34 44,30 50,30"
            fill="none"
            stroke="rgba(45, 212, 191, 0.5)"
            strokeWidth="0.2"
          />
        </svg>

        {/* Пульсирующие точки активности - скрыты на мобильных */}
        <div className="hidden md:block">
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-teal-400 opacity-70 animate-pulse"
            style={{ left: "35%", top: "35%", animationDelay: "0s" }}
          ></div>
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400 opacity-70 animate-pulse"
            style={{ left: "65%", top: "35%", animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-teal-400 opacity-70 animate-pulse"
            style={{ left: "45%", top: "55%", animationDelay: "1s" }}
          ></div>
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400 opacity-70 animate-pulse"
            style={{ left: "55%", top: "55%", animationDelay: "1.5s" }}
          ></div>
        </div>

        {/* Тонкая линия ЭЭГ внизу - адаптивна для мобильных */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="h-6 md:h-8 w-[80%] md:w-[60%] relative">
            <style dangerouslySetInnerHTML={{ __html: eegAnimationStyle }} />
            <div className="absolute inset-0 opacity-30">
              <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="w-full h-full">
                <path
                  d="M0,100 C50,80 100,120 150,100 C200,80 250,120 300,100 C350,80 400,120 450,100 C500,80 550,120 600,100 C650,80 700,120 750,100 C800,80 850,120 900,100 C950,80 1000,120 1050,100 C1100,80 1150,120 1200,100"
                  fill="none"
                  stroke="rgba(45, 212, 191, 0.8)"
                  strokeWidth="1"
                  strokeDasharray="1200"
                  strokeDashoffset="1200"
                  style={{ animation: "eegDraw 15s linear infinite" }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Тонкая подсказка - адаптивный размер шрифта */}
      <div className="absolute bottom-2 right-2 text-[10px] md:text-xs text-teal-400/40 font-light tracking-wide">
        Интерактивная нейронная сеть
      </div>
    </div>
  )
}

// Helper functions and types
type Particle = {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  color: string
  originalSpeed: number
}

type Connection = {
  from: number
  to: number
}

function getGradientColor(t: number): string {
  // Новая цветовая схема: от бирюзового к индиго
  const r = Math.floor(45 + (99 - 45) * t) // от teal-500 до indigo-500
  const g = Math.floor(212 + (102 - 212) * t)
  const b = Math.floor(191 + (241 - 191) * t)
  return `rgb(${r}, ${g}, ${b}, ${0.6 + t * 0.2})` // Добавляем прозрачность
}

function drawBrainShape(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) {
  // Создаем более элегантную форму мозга с новыми цветами
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
  gradient.addColorStop(0, "rgba(45, 212, 191, 0.08)") // teal-500
  gradient.addColorStop(0.5, "rgba(99, 102, 241, 0.05)") // indigo-500
  gradient.addColorStop(1, "rgba(45, 212, 191, 0)")

  // Основная форма мозга
  ctx.beginPath()
  ctx.ellipse(centerX, centerY, radius * 0.7, radius * 0.8, 0, 0, Math.PI * 2)
  ctx.fillStyle = gradient
  ctx.fill()

  // Тонкая центральная линия
  ctx.beginPath()
  ctx.moveTo(centerX, centerY - radius * 0.7)
  ctx.lineTo(centerX, centerY + radius * 0.7)
  ctx.strokeStyle = "rgba(99, 102, 241, 0.05)"
  ctx.lineWidth = 1
  ctx.stroke()

  // Добавляем тонкие круговые линии для создания эффекта сканирования
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.2 * i, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(45, 212, 191, ${0.03 * (4 - i)})`
    ctx.lineWidth = 0.5
    ctx.stroke()
  }
}

