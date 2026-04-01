"use client"

import { useState } from 'react'
import { Settings } from 'lucide-react'
import { Sidebar } from '../dashboard/components/sidebar'
import { Header } from '../dashboard/components/header'
import { Users } from './components/users'
import { Preferences } from './components/preferences'
import { About } from './components/about'
import { greeting } from '../dashboard/utils/greeting'
import { users as usersData, preferences as preferencesData, systemInfo as systemInfoData } from './data'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar
          open={sidebarOpen}
          onToggle={setSidebarOpen}
          currentPath="/settings"
        />

        <main className={cn('flex-1 transition-all duration-300', sidebarOpen ? 'ml-64' : 'ml-20')}>
          <Header
            greeting={`${greeting()}, Admin! 👋`}
            date="Terça-feira, 01 de Abril de 2026"
          />

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <Settings className="w-7 h-7 text-teal-600" />
                  Configurações
                </h1>
                <p className="text-slate-600 mt-1">
                  Gerencie as configurações do sistema
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Users users={usersData} />
              
              <Preferences preferences={preferencesData} />
              
              <About info={systemInfoData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
