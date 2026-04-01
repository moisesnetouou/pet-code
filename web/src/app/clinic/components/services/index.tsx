"use client"

import { useState } from 'react'
import { ClipboardList, Plus, Pencil, Eye } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { servicesStyles } from './styles'
import type { ServicesProps, Service } from './types'

export function Services({ services: initialServices, onToggle }: ServicesProps) {
  const s = servicesStyles()
  const [services, setServices] = useState(initialServices)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const handleToggle = (id: number) => {
    setServices(prev => 
      prev.map(service => 
        service.id === id ? { ...service, isActive: !service.isActive } : service
      )
    )
    onToggle?.(id)
  }

  const handleEdit = (service: Service) => {
    setSelectedService(service)
    setShowEditDialog(true)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
  }

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60)
      return `${hours}h`
    }
    return `${minutes}min`
  }

  return (
    <>
      <div className={s.container()}>
        <div className={s.header()}>
          <h3 className={s.title()}>
            <ClipboardList className={s.titleIcon()} />
            Serviços
          </h3>
          <button className={s.addButton()}>
            <Plus className="w-4 h-4 mr-1.5 inline" />
            Adicionar
          </button>
        </div>

          <div className={s.grid()}>
          {services.map((service) => (
            <div key={service.id} className={s.serviceCard()}>
              <div className={s.serviceHeader()}>
                <h4 className={s.serviceName()}>{service.name}</h4>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleEdit(service)} 
                    className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <Switch 
                    checked={service.isActive}
                    onCheckedChange={() => handleToggle(service.id)}
                  />
                </div>
              </div>
              <p className={s.serviceDescription()}>{service.description}</p>
              <div className={s.serviceDetails()}>
                <span className={s.servicePrice()}>{formatPrice(service.price)}</span>
                <span className={s.serviceDuration()}>{formatDuration(service.duration)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Serviço</DialogTitle>
          </DialogHeader>
          
          {selectedService && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Nome do Serviço</Label>
                <Input defaultValue={selectedService.name} className="border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Descrição</Label>
                <Input defaultValue={selectedService.description} className="border-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">Preço (R$)</Label>
                  <Input type="number" defaultValue={selectedService.price} className="border-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">Duração (min)</Label>
                  <Input type="number" defaultValue={selectedService.duration} className="border-slate-200" />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100" onClick={() => setShowEditDialog(false)}>
              Cancelar
            </Button>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
