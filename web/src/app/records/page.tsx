"use client"

import { useState, useMemo } from 'react'
import { Plus, FileText } from 'lucide-react'
import { Sidebar } from '../dashboard/components/sidebar'
import { Header } from '../dashboard/components/header'
import { Filters } from './components/filters'
import { RecordsList } from './components/records-list'
import { greeting } from '../dashboard/utils/greeting'
import { records as initialRecords } from './data'
import type { FilterOptions } from './types'
import { cn } from '@/lib/utils'

export default function RecordsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    type: 'all',
    status: 'all',
    sortBy: 'date',
  })

  const filteredRecords = useMemo(() => {
    let result = [...initialRecords]

    if (filters.search) {
      const search = filters.search.toLowerCase()
      result = result.filter(
        (record) =>
          record.petName.toLowerCase().includes(search) ||
          record.tutor.toLowerCase().includes(search)
      )
    }

    if (filters.type !== 'all') {
      result = result.filter((record) => record.type === filters.type)
    }

    if (filters.status !== 'all') {
      result = result.filter((record) => record.status === filters.status)
    }

    switch (filters.sortBy) {
      case 'date':
        result.sort((a, b) => b.date.localeCompare(a.date))
        break
      case 'pet':
        result.sort((a, b) => a.petName.localeCompare(b.petName))
        break
      case 'type':
        result.sort((a, b) => a.type.localeCompare(b.type))
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
          currentPath="/records"
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
                  <FileText className="w-7 h-7 text-teal-600" />
                  Prontuários
                </h1>
                <p className="text-slate-600 mt-1">
                  Gerencie os prontuários médicos dos pets
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-xl transition-colors">
                <Plus className="w-4 h-4" />
                Novo Prontuário
              </button>
            </div>

            <Filters
              options={filters}
              onChange={setFilters}
              totalResults={filteredRecords.length}
            />

            <RecordsList records={filteredRecords} />
          </div>
        </main>
      </div>
    </div>
  )
}
