"use client"

import { useState } from 'react'
import { Users as UsersIcon, Plus, Pencil, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
import { usersStyles } from './styles'
import type { UsersProps, User } from './types'

const roleConfig: Record<string, { bg: string; text: string }> = {
  admin: { bg: 'bg-purple-100', text: 'text-purple-800' },
  veterinarian: { bg: 'bg-teal-100', text: 'text-teal-800' },
  receptionist: { bg: 'bg-blue-100', text: 'text-blue-800' },
}

const roleLabels: Record<string, string> = {
  admin: 'Administrador',
  veterinarian: 'Veterinário',
  receptionist: 'Recepcionista',
}

export function Users({ users: initialUsers }: UsersProps) {
  const u = usersStyles()
  const [users, setUsers] = useState(initialUsers)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2)
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setShowEditDialog(true)
  }

  const handleToggle = (id: number) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    )
  }

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(prev => prev.filter(user => user.id !== id))
    }
  }

  return (
    <>
      <div className={u.container()}>
        <div className={u.header()}>
          <h3 className={u.title()}>
            <UsersIcon className={u.titleIcon()} />
            Usuários do Sistema
          </h3>
          <button onClick={() => setShowAddDialog(true)} className={u.addButton()}>
            <Plus className="w-4 h-4 mr-1.5 inline" />
            Adicionar
          </button>
        </div>

        <table className={u.table()}>
          <thead>
            <tr>
              <th className={u.tableHeader()}>Usuário</th>
              <th className={u.tableHeader()}>Função</th>
              <th className={u.tableHeader()}>Último acesso</th>
              <th className={u.tableHeader()}>Status</th>
              <th className={u.tableHeader()}></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={u.tableRow()}>
                <td className={u.tableCell()}>
                  <div className={u.userInfo()}>
                    <Avatar className={u.userAvatar()}>
                      <AvatarFallback className="bg-teal-100 text-teal-700 font-bold text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className={u.userName()}>{user.name}</p>
                      <p className={u.userEmail()}>{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className={u.tableCell()}>
                  <span className={u.roleBadge() + ' ' + roleConfig[user.role]?.bg + ' ' + roleConfig[user.role]?.text}>
                    {roleLabels[user.role]}
                  </span>
                </td>
                <td className={u.tableCell()}>
                  {user.lastLogin || '-'}
                </td>
                <td className={u.tableCell()}>
                  <div className="flex items-center gap-2">
                    <span className={u.statusBadge()}>
                      {user.isActive ? (
                        <span className="bg-emerald-100 text-emerald-800">Ativo</span>
                      ) : (
                        <span className="bg-slate-200 text-slate-600">Inativo</span>
                      )}
                    </span>
                    <Switch 
                      checked={user.isActive}
                      onCheckedChange={() => handleToggle(user.id)}
                    />
                  </div>
                </td>
                <td className={u.tableCell()}>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleEdit(user)}
                      className={u.actionsButton()}
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Nome</Label>
                <Input defaultValue={selectedUser.name} className="border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Email</Label>
                <Input defaultValue={selectedUser.email} className="border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Função</Label>
                <select defaultValue={selectedUser.role} className="w-full h-10 px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800">
                  <option value="admin">Administrador</option>
                  <option value="veterinarian">Veterinário</option>
                  <option value="receptionist">Recepcionista</option>
                </select>
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

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Novo Usuário</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Nome</Label>
              <Input placeholder="Nome completo" className="border-slate-200" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Email</Label>
              <Input type="email" placeholder="email@exemplo.com" className="border-slate-200" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Senha</Label>
              <Input type="password" placeholder="••••••••" className="border-slate-200" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Função</Label>
              <select className="w-full h-10 px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800">
                <option value="admin">Administrador</option>
                <option value="veterinarian">Veterinário</option>
                <option value="receptionist">Recepcionista</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100" onClick={() => setShowAddDialog(false)}>
              Cancelar
            </Button>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">
              Criar Usuário
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
