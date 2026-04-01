"use client"

import { useState } from 'react'
import { Search, Bell, UserPlus, CalendarPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { headerStyles } from './styles'
import type { HeaderProps } from './types'
import { cn } from '@/lib/utils'

export function Header({
  greeting = 'Admin! 👋',
  date = 'Terça-feira, 01 de Abril de 2026',
  notificationCount = 3,
  showSearch = true,
  action1Label,
  action2Label,
  onAction1,
  onAction2,
  onSearch,
}: HeaderProps) {
  const h = headerStyles()
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    onSearch?.(value)
  }

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
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={h.searchInput()}
            />
          </div>
        )}
        
        {onAction1 && action1Label && (
          <Button 
            variant="outline" 
            onClick={onAction1}
            className={cn(h.actionButton(), "border-slate-300 text-slate-700 hover:bg-slate-100")}
          >
            <UserPlus className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">{action1Label}</span>
          </Button>
        )}
        
        {onAction2 && action2Label && (
          <Button 
            onClick={onAction2}
            className={cn(h.actionButton(), "bg-teal-500 hover:bg-teal-600 text-white")}
          >
            <CalendarPlus className="w-4 h-4" />
            <span className="hidden sm:inline">{action2Label}</span>
          </Button>
        )}
        
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