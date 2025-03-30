"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import {
  MessageSquare,
  LayoutDashboard,
  History,
  Settings,
  CreditCard,
  Sparkles,
  LogOut,
  ChevronRight,
  Menu,
  X
} from "lucide-react"

interface NavItemProps {
  href: string
  label: string
  icon: React.ReactNode
  isActive: boolean
  isPro?: boolean
  onClick?: () => void
  isMobile?: boolean
}

function NavItem({ href, label, icon, isActive, isPro = false, onClick, isMobile = false }: NavItemProps) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'bg-slate-800 text-white' 
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
      } ${isMobile ? 'border-b border-slate-800 py-4' : ''}`}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <span className="flex-grow">{label}</span>
      {isPro && (
        <div className="flex-shrink-0 bg-gradient-to-r from-teal-500 to-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded-full uppercase font-semibold">
          Pro
        </div>
      )}
      {isMobile && <ChevronRight className="w-4 h-4" />}
    </Link>
  )
}

interface SidebarNavProps {
  isPro?: boolean
}

export default function SidebarNav({ isPro = false }: SidebarNavProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navItems = [
    {
      href: "/dashboard",
      label: "Главная",
      icon: <LayoutDashboard className="w-5 h-5" />,
      isActive: pathname === "/dashboard",
    },
    {
      href: "/dashboard/chat",
      label: "Новый чат",
      icon: <MessageSquare className="w-5 h-5" />,
      isActive: pathname === "/dashboard/chat",
    },
    {
      href: "/dashboard/history",
      label: "История чатов",
      icon: <History className="w-5 h-5" />,
      isActive: pathname === "/dashboard/history",
    },
    {
      href: "/dashboard/subscription",
      label: "Подписка",
      icon: <CreditCard className="w-5 h-5" />,
      isActive: pathname === "/dashboard/subscription",
    },
    {
      href: "/dashboard/advanced",
      label: "Расширенные функции",
      icon: <Sparkles className="w-5 h-5" />,
      isActive: pathname === "/dashboard/advanced",
      isPro: true
    },
    {
      href: "/dashboard/settings",
      label: "Настройки",
      icon: <Settings className="w-5 h-5" />,
      isActive: pathname === "/dashboard/settings",
    },
  ]

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-slate-950 border-b border-slate-800 py-3 px-4">
        <div className="flex items-center justify-between">
          <Logo size="sm" />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-400"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-slate-950/90 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="fixed top-16 left-0 right-0 bottom-0 bg-slate-950 border-t border-slate-800 p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="space-y-1">
              {navItems.map((item, index) => (
                (!item.isPro || (item.isPro && isPro)) && (
                  <NavItem 
                    key={index}
                    {...item}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isMobile
                  />
                )
              ))}
            </nav>
            
            <div className="mt-8 pt-4 border-t border-slate-800">
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-400 border-slate-800"
                onClick={() => console.log('Logout')}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen bg-slate-950 border-r border-slate-800 p-4 fixed left-0 top-0">
        <div className="mb-8 px-3">
          <Logo size="sm" />
        </div>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item, index) => (
            (!item.isPro || (item.isPro && isPro)) && (
              <NavItem key={index} {...item} />
            )
          ))}
        </nav>
        
        <div className="mt-auto pt-4 border-t border-slate-800">
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-400 border-slate-800"
            onClick={() => console.log('Logout')}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Выйти
          </Button>
        </div>
      </aside>
    </>
  )
}

