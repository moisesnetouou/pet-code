"use client"

import { useState } from 'react'
import { Building2, Pencil } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { clinicInfoStyles } from './styles'
import type { ClinicInfoProps } from './types'

export function ClinicInfo({ clinic: initialClinic }: ClinicInfoProps) {
  const c = clinicInfoStyles()
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [clinic, setClinic] = useState(initialClinic)

  const handleSave = () => {
    console.log('Saving clinic:', clinic)
    setShowEditDialog(false)
  }

  return (
    <>
      <div className={c.container()}>
        <div className={c.header()}>
          <h3 className={c.title()}>
            <Building2 className={c.titleIcon()} />
            Dados da Clínica
          </h3>
          <button 
            onClick={() => setShowEditDialog(true)}
            className={c.editButton()}
            title="Editar"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>

        <div className={c.content()}>
          <div className={c.field()}>
            <p className={c.fieldLabel()}>Nome</p>
            <p className={c.fieldValue()}>{clinic.name}</p>
          </div>

          <div className={c.field()}>
            <p className={c.fieldLabel()}>CNPJ</p>
            <p className={c.fieldValue()}>{clinic.cnpj}</p>
          </div>

          <div className={c.field()}>
            <p className={c.fieldLabel()}>Telefone</p>
            <p className={c.fieldValue()}>{clinic.phone}</p>
          </div>

          <div className={c.field()}>
            <p className={c.fieldLabel()}>Email</p>
            <p className={c.fieldValue()}>{clinic.email}</p>
          </div>

          <div className={c.field()}>
            <p className={c.fieldLabel()}>Cidade</p>
            <p className={c.fieldValue()}>{clinic.city} - {clinic.state}</p>
          </div>

          <div className={c.field()}>
            <p className={c.fieldLabel()}>CEP</p>
            <p className={c.fieldValue()}>{clinic.cep}</p>
          </div>

          <div className={c.field() + ' ' + c.address()}>
            <p className={c.fieldLabel()}>Endereço</p>
            <p className={c.fieldValue()}>{clinic.address}</p>
          </div>
        </div>
      </div>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Dados da Clínica</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Nome da Clínica</Label>
              <Input defaultValue={clinic.name} className="border-slate-200" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">CNPJ</Label>
              <Input defaultValue={clinic.cnpj} className="border-slate-200" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Telefone</Label>
                <Input defaultValue={clinic.phone} className="border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">CEP</Label>
                <Input defaultValue={clinic.cep} className="border-slate-200" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Email</Label>
              <Input defaultValue={clinic.email} className="border-slate-200" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Endereço</Label>
              <Input defaultValue={clinic.address} className="border-slate-200" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Cidade</Label>
                <Input defaultValue={clinic.city} className="border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Estado</Label>
                <Input defaultValue={clinic.state} className="border-slate-200" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100" onClick={() => setShowEditDialog(false)}>
              Cancelar
            </Button>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white" onClick={handleSave}>
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
