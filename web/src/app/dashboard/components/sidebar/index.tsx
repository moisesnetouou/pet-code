"use client"

import Link from 'next/link'
import { Heart, ChevronLeft } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { sidebarStyles } from './styles'
import type { SidebarProps } from './types'
import { menuItems } from '../../data'
import { cn } from '@/lib/utils'

interface SidebarWithStateProps extends SidebarProps {
  onToggle?: (open: boolean) => void
}

export function Sidebar({ 
  open = true,
  currentPath = '/dashboard',
  onToggle,
  userName = 'Admin',
  userRole = 'Administrador',
  userInitials = 'AD'
}: SidebarWithStateProps) {
  const s = sidebarStyles({ open })

  return (
    <aside className={s.container()}>
      <div className={s.logoContainer()}>
        <div className={s.logoIcon()}>
          <Heart className="w-6 h-6 text-white fill-white" />
        </div>
        {open && <span className={s.logoText()}>PetCode</span>}
      </div>

      <ScrollArea className={s.menuContainer()}>
        <nav className={s.nav()}>
          {menuItems.map((item) => {
            const isActive = currentPath === item.href || (item.href !== '/dashboard' && currentPath.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  s.navItem(),
                  isActive ? s.navItemActive() : s.navItemInactive()
                )}
              >
                <item.icon className={cn('w-5 h-5', isActive && 'text-teal-600')} />
                {open && <span className="font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      <div className={s.userContainer()}>
        <div className={cn(s.userInner(), !open && 'justify-center')}>
          <Avatar className={s.userAvatar()}>
            <AvatarFallback className="bg-teal-500 text-white font-bold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          {open && (
            <div className="flex-1 min-w-0">
              <p className={s.userName()}>{userName}</p>
              <p className={s.userRole()}>{userRole}</p>
            </div>
          )}
        </div>
      </div>

      <button 
        className={s.collapseButton()}
        onClick={() => onToggle?.(!open)}
      >
        <ChevronLeft className={cn('w-3 h-3 text-slate-400 transition-transform', !open && 'rotate-180')} />
      </button>
    </aside>
  )
}
