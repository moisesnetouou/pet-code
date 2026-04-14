"use client";

import { Pencil, Plus, Stethoscope, X } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/base/avatar";
import { Button } from "@/components/base/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/base/dialog";
import { Input } from "@/components/base/input";
import { Label } from "@/components/base/label";
import { Switch } from "@/components/base/switch";
import { veterinariansStyles } from "./styles";
import type { Veterinarian, VeterinariansProps } from "./types";

interface FormData {
  name: string;
  crmv: string;
  specialties: string;
  phone: string;
  email: string;
}

const getInitialFormData = (): FormData => ({
  name: "",
  crmv: "",
  specialties: "",
  phone: "",
  email: "",
});

export function Veterinarians({
  veterinarians: initialVeterinarians,
  onToggle,
}: VeterinariansProps) {
  const v = veterinariansStyles();
  const [veterinarians, setVeterinarians] = useState(initialVeterinarians);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedVetId, setSelectedVetId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>(getInitialFormData());

  const handleToggle = (id: number) => {
    setVeterinarians((prev) =>
      prev.map((vet) =>
        vet.id === id ? { ...vet, isActive: !vet.isActive } : vet,
      ),
    );
    onToggle?.(id);
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setSelectedVetId(null);
    setFormData(getInitialFormData());
    setDialogOpen(true);
  };

  const handleEdit = (vet: Veterinarian) => {
    setIsEditMode(true);
    setSelectedVetId(vet.id);
    setFormData({
      name: vet.name,
      crmv: vet.crmv,
      specialties: vet.specialties.join(", "),
      phone: vet.phone,
      email: vet.email,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const specialties = formData.specialties
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);

    if (isEditMode && selectedVetId) {
      setVeterinarians((prev) =>
        prev.map((vet) =>
          vet.id === selectedVetId
            ? { ...vet, name: formData.name, crmv: formData.crmv, specialties, phone: formData.phone, email: formData.email }
            : vet,
        ),
      );
    } else {
      const newId = Math.max(...veterinarians.map((v) => v.id), 0) + 1;
      setVeterinarians((prev) => [
        ...prev,
        { id: newId, name: formData.name, crmv: formData.crmv, specialties, phone: formData.phone, email: formData.email, isActive: true },
      ]);
    }
    setDialogOpen(false);
    setFormData(getInitialFormData());
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const canSave = formData.name.trim() !== "" && formData.crmv.trim() !== "";

  return (
    <>
      <div className={v.container()}>
        <div className={v.header()}>
          <h3 className={v.title()}>
            <Stethoscope className={v.titleIcon()} />
            Veterinários
          </h3>
          <button className={v.addButton()} onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-1.5 inline" />
            Adicionar
          </button>
        </div>

        <div className={v.grid()}>
          {veterinarians.map((vet) => (
            <div key={vet.id} className={v.vetCard()}>
              <div className={v.vetHeader()}>
                {vet.avatar ? (
                  <img
                    src={vet.avatar}
                    alt={vet.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <Avatar className={v.vetAvatar()}>
                    <span className="bg-teal-100 text-teal-700 font-bold">
                      {getInitials(vet.name)}
                    </span>
                  </Avatar>
                )}
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Editar Veterinário" : "Novo Veterinário"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Nome *
              </Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Dr. Nome Sobrenome"
                className="border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                CRMV *
              </Label>
              <Input
                value={formData.crmv}
                onChange={(e) =>
                  setFormData({ ...formData, crmv: e.target.value })
                }
                placeholder="CRM-SP 12345"
                className="border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Especialidades
              </Label>
              <Input
                value={formData.specialties}
                onChange={(e) =>
                  setFormData({ ...formData, specialties: e.target.value })
                }
                placeholder="Cirurgia, Vacinação..."
                className="border-slate-200"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Telefone
                </Label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="(11) 99999-0000"
                  className="border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Email
                </Label>
                <Input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                }
                  placeholder="vet@clinic.com"
                  className="border-slate-200"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!canSave}>
              {isEditMode ? "Salvar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}