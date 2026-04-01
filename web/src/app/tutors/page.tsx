"use client"

import { useState, useMemo } from 'react'
import { Plus, Users } from 'lucide-react'
import { Sidebar } from '../dashboard/components/sidebar'
import { Header } from '../dashboard/components/header'
import { Filters } from './components/filters'
import { TutorsGrid } from './components/tutors-grid'
import { greeting } from '../dashboard/utils/greeting'
import { tutors as initialTutors } from './data'
import type { FilterOptions } from './types'
import { cn } from '@/lib/utils'

export default function TutorsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    status: 'all',
    sortBy: 'name',
  })

  const filteredTutors = useMemo(() => {
    let result = [...initialTutors]

    if (filters.search) {
      const search = filters.search.toLowerCase()
      result = result.filter(
        (tutor) =>
          tutor.name.toLowerCase().includes(search) ||
          tutor.phone.toLowerCase().includes(search)
      )
    }

    if (filters.status !== 'all') {
      result = result.filter((tutor) => tutor.status === filters.status)
    }

    switch (filters.sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'recent':
        result.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        break
      case 'pets':
        result.sort((a, b) => b.pets.length - a.pets.length)
        break
    }

    return result
  }, [filters])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar
          open={sidebarOpen}
          onToggle={setSidebarOpen}
          currentPath="/tutors"
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
                  <Users className="w-7 h-7 text-teal-600" />
                  Tutores
                </h1>
                <p className="text-slate-600 mt-1">
                  Gerencie os tutores cadastrados na clínica
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-xl transition-colors">
                <Plus className="w-4 h-4" />
                Novo Tutor
              </button>
            </div>

            <Filters
              options={filters}
              onChange={setFilters}
              totalResults={filteredTutors.length}
            />

            <TutorsGrid tutors={filteredTutors} />
          </div>
        </main>
      </div>
    </div>
  )
}
