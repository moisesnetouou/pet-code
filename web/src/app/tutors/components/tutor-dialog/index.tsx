"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Tutor } from "../../types";
import { tutorDialogStyles } from "./styles";

interface TutorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tutor?: Tutor | null;
  onSave: (tutor: Omit<Tutor, "id" | "pets" | "createdAt">) => void;
  onDelete?: (id: number) => void;
}

interface FormData {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  address: string;
  city: string;
}

const getInitialFormData = (): FormData => ({
  name: "",
  cpf: "",
  phone: "",
  email: "",
  address: "",
  city: "",
});

export function TutorDialog({
  open,
  onOpenChange,
  tutor,
  onSave,
  onDelete,
}: TutorDialogProps) {
  const s = tutorDialogStyles();
  const [formData, setFormData] = useState<FormData>(getInitialFormData());

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFormData(getInitialFormData());
    }
    onOpenChange(isOpen);
  };

  const handleSubmit = () => {
    onSave({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      status: "ativo",
    });
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (tutor && onDelete) {
      onDelete(tutor.id);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-slate-800">
            {tutor ? "Editar Tutor" : "Novo Tutor"}
          </DialogTitle>
        </DialogHeader>

        <div className={s.form()}>
          <div className={s.field()}>
            <Label htmlFor="name" className={s.label()}>
              Nome *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ex: João Silva"
              className="bg-white border-slate-200 text-slate-800"
            />
          </div>

          <div className={s.row()}>
            <div className={s.field()}>
              <Label htmlFor="cpf" className={s.label()}>
                CPF
              </Label>
              <Input
                id="cpf"
                value={formData.cpf}
                onChange={(e) =>
                  setFormData({ ...formData, cpf: e.target.value })
                }
                placeholder="Ex: 123.456.789-00"
                className="bg-white border-slate-200 text-slate-800"
              />
            </div>
            <div className={s.field()}>
              <Label htmlFor="phone" className={s.label()}>
                Telefone *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Ex: (11) 99999-0000"
                className="bg-white border-slate-200 text-slate-800"
              />
            </div>
          </div>

          <div className={s.field()}>
            <Label htmlFor="email" className={s.label()}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Ex: joao@email.com"
              className="bg-white border-slate-200 text-slate-800"
            />
          </div>

          <div className={s.field()}>
            <Label htmlFor="address" className={s.label()}>
              Endereço
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Ex: Rua das Flores, 123"
              className="bg-white border-slate-200 text-slate-800"
            />
          </div>

          <div className={s.field()}>
            <Label htmlFor="city" className={s.label()}>
              Cidade
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              placeholder="Ex: São Paulo"
              className="bg-white border-slate-200 text-slate-800"
            />
          </div>
        </div>

        <DialogFooter>
          {tutor && onDelete && (
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              className="mr-auto bg-red-500 hover:bg-red-600 text-white"
            >
              Excluir
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-200 text-slate-700 hover:bg-slate-100"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-teal-500 hover:bg-teal-600 text-white"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
