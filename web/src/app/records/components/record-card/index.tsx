"use client"

import { useState } from 'react'
import { Calendar, User, Stethoscope, MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { recordCardStyles } from './styles'
import type { RecordCardProps } from './types'
import { cn } from '@/lib/utils'

const petColors: Record<string, string> = {
  Cachorro: 'bg-amber-200',
  Gato: 'bg-violet-200',
  Pássaro: 'bg-sky-200',
  Peixe: 'bg-blue-200',
  Coelho: 'bg-rose-200',
  Jabuti: 'bg-emerald-200',
  Outro: 'bg-slate-200',
}

const typeConfig: Record<string, { bg: string; text: string }> = {
  'Consulta': { bg: 'bg-violet-100', text: 'text-violet-800' },
  'Vacinação': { bg: 'bg-emerald-100', text: 'text-emerald-800' },
  'Cirurgia': { bg: 'bg-rose-100', text: 'text-rose-800' },
  'Exame': { bg: 'bg-blue-100', text: 'text-blue-800' },
  'Check-up': { bg: 'bg-amber-100', text: 'text-amber-800' },
}

export function RecordCard({ record }: RecordCardProps) {
  const r = recordCardStyles()
  const colorClass = petColors[record.petType] || 'bg-slate-100'
  const typeStyle = typeConfig[record.type] || { bg: 'bg-slate-50', text: 'text-slate-700' }
  const [showDetails, setShowDetails] = useState(false)

  const handleEdit = () => {
    console.log('Edit record:', record.id)
  }

  const handleDelete = () => {
    console.log('Delete record:', record.id)
  }

  return (
    <>
      <div className={r.container()}>
        <div className={r.header()}>
          <div className="flex items-center gap-3 flex-1">
            <div className={cn(r.petAvatar(), colorClass)}>
              {record.petEmoji}
            </div>
            <div className={r.petDetails()}>
              <h3 className={r.petName()}>{record.petName}</h3>
              <p className={r.petType()}>{record.petType}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={cn(r.statusBadge(), record.status === 'concluído' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800')}>
              {record.status === 'concluído' ? 'Concluído' : 'Pendente'}
            </span>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className={r.actionsButton()}>
                  <MoreHorizontal className="w-4 h-4" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={() => setShowDetails(true)} className="text-slate-700 focus:text-slate-800 focus:bg-slate-100 cursor-pointer">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver detalhes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleEdit} className="text-slate-700 focus:text-slate-800 focus:bg-slate-100 cursor-pointer">
                  <Pencil className="w-4 h-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className={r.content()}>
          <div className="flex items-center gap-2">
            <span className={cn(typeStyle.bg, typeStyle.text, 'px-2.5 py-1 rounded-lg text-xs font-medium')}>
              {record.type}
            </span>
          </div>

          <div className={r.infoRow()}>
            <Calendar className={r.infoIcon()} />
            <span>{record.date}</span>
          </div>

          <div className={r.infoRow()}>
            <User className={r.infoIcon()} />
            <span>{record.tutor}</span>
          </div>

          <div className={r.infoRow()}>
            <Stethoscope className={r.infoIcon()} />
            <span>{record.veterinarian}</span>
          </div>
        </div>

        {record.diagnosis && (
          <div className={r.diagnosisSection()}>
            <p className={r.diagnosisLabel()}>Diagnóstico</p>
            <p className={r.diagnosisText()}>{record.diagnosis}</p>
          </div>
        )}
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span className="text-3xl">{record.petEmoji}</span>
              {record.petName} - {record.type}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-600 uppercase font-medium">Data</p>
                <p className="text-sm font-medium text-slate-800">{record.date}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 uppercase font-medium">Status</p>
                <span className={cn('inline-block px-2 py-1 rounded-full text-xs font-medium', record.status === 'concluído' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800')}>
                  {record.status === 'concluído' ? 'Concluído' : 'Pendente'}
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-600 uppercase font-medium">Tutor</p>
                <p className="text-sm font-medium text-slate-800">{record.tutor}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 uppercase font-medium">Veterinário</p>
                <p className="text-sm font-medium text-slate-800">{record.veterinarian}</p>
              </div>
            </div>

            {record.diagnosis && (
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-600 uppercase font-medium mb-1">Diagnóstico</p>
                <p className="text-sm text-slate-800">{record.diagnosis}</p>
              </div>
            )}

            {record.notes && (
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-600 uppercase font-medium mb-1">Observações</p>
                <p className="text-sm text-slate-700 italic">{record.notes}</p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100" onClick={() => setShowDetails(false)}>
              Fechar
            </Button>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white" onClick={handleEdit}>
              <Pencil className="w-4 h-4 mr-2" />
              Editar Prontuário
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
