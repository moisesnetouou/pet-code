"use client"

import { useState } from 'react'
import { Sidebar } from './components/sidebar'
import { Header } from './components/header'
import { StatsGrid } from './components/stats-grid'
import { WelcomeBanner } from './components/welcome-banner'
import { Timeline } from './components/timeline'
import { NextAppointment } from './components/next-appointment'
import { RecentPets } from './components/recent-pets'
import { QuickActions } from './components/quick-actions'
import { greeting } from './utils/greeting'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar 
          open={sidebarOpen} 
          onToggle={setSidebarOpen}
          currentPath="/dashboard"
        />
        
        <main className={cn('flex-1 transition-all duration-300', sidebarOpen ? 'ml-64' : 'ml-20')}>
          <Header 
            greeting={`${greeting()}, Admin! 👋`}
            date="Terça-feira, 01 de Abril de 2026"
          />

          <div className="p-8">
            <WelcomeBanner />
            
            <StatsGrid />
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
              <Timeline />
              
              <div className="space-y-6">
                <NextAppointment />
                <RecentPets />
              </div>
            </div>
            
            <QuickActions />
          </div>
        </main>
      </div>
    </div>
  )
}
