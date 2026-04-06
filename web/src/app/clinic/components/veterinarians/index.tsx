"use client";

import { Pencil, Plus, Stethoscope } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/base/avatar";
import { Button } from "@/components/base/button";
import { Input } from "@/components/base/input";
import { Label } from "@/components/base/label";
import { Switch } from "@/components/base/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/base/dialog";
import { veterinariansStyles } from "./styles";
import type { Veterinarian, VeterinariansProps } from "./types";

export function Veterinarians({
  veterinarians: initialVeterinarians,
  onToggle,
}: VeterinariansProps) {
  const v = veterinariansStyles();
  const [veterinarians, setVeterinarians] = useState(initialVeterinarians);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedVet, setSelectedVet] = useState<Veterinarian | null>(null);

  const handleToggle = (id: number) => {
    setVeterinarians((prev) =>
      prev.map((vet) =>
        vet.id === id ? { ...vet, isActive: !vet.isActive } : vet,
      ),
    );
    onToggle?.(id);
  };

  const handleEdit = (vet: Veterinarian) => {
    setSelectedVet(vet);
    setShowEditDialog(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
  };

  return (
    <>
      <div className={v.container()}>
        <div className={v.header()}>
          <h3 className={v.title()}>
            <Stethoscope className={v.titleIcon()} />
            Veterinários
          </h3>
          <button className={v.addButton()}>
            <Plus className="w-4 h-4 mr-1.5 inline" />
            Adicionar
          </button>
        </div>

        <div className={v.grid()}>
          {veterinarians.map((vet) => (
            <div key={vet.id} className={v.vetCard()}>
              <div className={v.vetHeader()}>
                <Avatar className={v.vetAvatar()}>
                  <span className="bg-teal-100 text-teal-700 font-bold">
                    {getInitials(vet.name)}
                  </span>
                </Avatar>
                <div className={v.vetInfo()}>
                  <div className="flex items-center gap-2 w-full">
                    <h4 className={v.vetName()}>{vet.name}</h4>
                    <button
                      onClick={() => handleEdit(vet)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                  <p className={v.vetCrmv()}>{vet.crmv}</p>
                </div>
              </div>

              <div className={v.vetSpecialties()}>
                {vet.specialties.map((specialty) => (
                  <span key={specialty} className={v.specialtyTag()}>
                    {specialty}
                  </span>
                ))}
              </div>

              <div className={v.vetContact()}>
                <p>{vet.phone}</p>
                <p>{vet.email}</p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                <span className={v.vetStatus()}>
                  {vet.isActive ? (
                    <span className="bg-emerald-100 text-emerald-800">
                      Ativo
                    </span>
                  ) : (
                    <span className="bg-slate-200 text-slate-600">Inativo</span>
                  )}
                </span>
                <Switch
                  checked={vet.isActive}
                  onCheckedChange={() => handleToggle(vet.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Veterinário</DialogTitle>
          </DialogHeader>

          {selectedVet && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Nome
                </Label>
                <Input
                  defaultValue={selectedVet.name}
                  className="border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  CRMV
                </Label>
                <Input
                  defaultValue={selectedVet.crmv}
                  className="border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Especialidades
                </Label>
                <Input
                  defaultValue={selectedVet.specialties.join(", ")}
                  className="border-slate-200"
                  placeholder="Cirurgia, Vacinação..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Telefone
                  </Label>
                  <Input
                    defaultValue={selectedVet.phone}
                    className="border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Email
                  </Label>
                  <Input
                    defaultValue={selectedVet.email}
                    className="border-slate-200"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancelar
            </Button>
            <Button>
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
