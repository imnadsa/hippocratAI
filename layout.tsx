import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

// Оптимизация шрифта с поддержкой кириллицы
const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  display: 'swap', 
  variable: '--font-inter',
})

// Метаданные для SEO и веб-приложения
export const metadata: Metadata = {
  title: "UniMedGPT - ИИ для будущих медиков",
  description: "Персональный ИИ-ассистент для студентов-медиков, обученный на библиотеке медицинского университета",
  keywords: "медицинское образование, ИИ для медицины, обучение медицине, медицинская нейросеть",
  authors: [{ name: "UniMedGPT Team" }],
  creator: "UniMedGPT",
  publisher: "UniMedGPT",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
    generator: 'v0.dev'
}

// Настройки для мобильных устройств
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0f172a', // slate-950
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`dark scroll-smooth ${inter.variable}`}>
      <head>
        {/* Preconnect для оптимизации загрузки */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Подключаем шрифт Fixedsys через CDN */}
        <link 
          rel="stylesheet" 
          href="https://www.onlinewebfonts.com/c/8dee90282e2e0d2d64f335b884570895?family=Fixedsys+Excelsior+3.01" 
        />
        
        {/* Мета-теги для мобильной оптимизации */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'