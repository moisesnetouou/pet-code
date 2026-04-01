"use client"

import { Search, Bell, UserPlus, CalendarPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { headerStyles } from './styles'
import type { HeaderProps } from './types'

export function Header({
  greeting = 'Admin! 👋',
  date = 'Terça-feira, 01 de Abril de 2026',
  notificationCount = 3,
  showSearch = true
}: HeaderProps) {
  const h = headerStyles()

  return (
    <header className={h.container()}>
      <div className={h.greetingContainer()}>
        <div>
          <h1 className={h.greetingTitle()}>{greeting}</h1>
          <p className={h.greetingDate()}>{date}</p>
        </div>
      </div>
      
      <div className={h.actionsContainer()}>
        {showSearch && (
          <div className={h.searchContainer()}>
            <Search className={h.searchIcon()} />
            <Input 
              placeholder="Buscar pets, tutores..." 
              className={h.searchInput()}
            />
          </div>
        )}
        
        <Button variant="outline" className={h.actionButton()}>
          <UserPlus className="w-4 h-4 text-slate-600" />
          <span className="hidden sm:inline">Novo Pet</span>
        </Button>
        <Button className={h.actionButton()}>
          <CalendarPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Agendamento</span>
        </Button>
        
        <Button variant="ghost" size="icon" className={h.notificationButton()}>
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <span className={h.notificationBadge()}></span>
          )}
        </Button>
      </div>
    </header>
  )
}
