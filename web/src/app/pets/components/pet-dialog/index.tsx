"use client";

import { useState } from "react";
import { Button } from "@/components/base/button";
import { Input } from "@/components/base/input";
import { Label } from "@/components/base/label";
import { Select } from "@/components/base/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/base/dialog";
import { petTypes } from "../../data";
import type { Pet, PetType } from "../../types";
import { petDialogStyles } from "./styles";

interface PetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet?: Pet | null;
  onSave: (pet: Omit<Pet, "id">) => void;
  onDelete?: (id: number) => void;
  tutors: { id: number; name: string }[];
}

interface FormData {
  name: string;
  type: PetType;
  breed: string;
  birthDate: string;
  gender: string;
  weight: string;
  color: string;
  tutorId: string;
  notes: string;
}

const getInitialFormData = (): FormData => ({
  name: "",
  type: "Cachorro",
  breed: "",
  birthDate: "",
  gender: "",
  weight: "",
  color: "",
  tutorId: "",
  notes: "",
});

const genderOptions = ["Macho", "Fêmea"];

export function PetDialog({
  open,
  onOpenChange,
  pet,
  onSave,
  onDelete,
  tutors,
}: PetDialogProps) {
  const s = petDialogStyles();
  const [formData, setFormData] = useState<FormData>(getInitialFormData());

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFormData(getInitialFormData());
    }
    onOpenChange(isOpen);
  };

  const handleSubmit = () => {
    const tutor = tutors.find((t) => t.id === parseInt(formData.tutorId, 10));
    const typeEmojis: Record<PetType, string> = {
      Cachorro: "🐕",
      Gato: "🐱",
      Pássaro: "🦜",
      Peixe: "🐠",
      Coelho: "🐰",
      Jabuti: "🐢",
      Outro: "🐾",
    };
    const typeColors: Record<PetType, string> = {
      Cachorro: "bg-amber-100",
      Gato: "bg-violet-100",
      Pássaro: "bg-sky-100",
      Peixe: "bg-blue-100",
      Coelho: "bg-rose-100",
      Jabuti: "bg-emerald-100",
      Outro: "bg-slate-100",
    };

    onSave({
      name: formData.name,
      type: formData.type,
      breed: formData.breed,
      age: formData.birthDate
        ? `${new Date().getFullYear() - new Date(formData.birthDate).getFullYear()} anos`
        : "",
      weight: formData.weight,
      emoji: typeEmojis[formData.type],
      color: typeColors[formData.type],
      tutor: tutor?.name || "",
      tutorPhone: "",
      status: "ativo",
      notes: formData.notes,
    });
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (pet && onDelete) {
      onDelete(pet.id);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-slate-800">
            {pet ? "Editar Pet" : "Novo Pet"}
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
              placeholder="Ex: Cheems"
              className="bg-white border-slate-200 text-slate-800"
            />
          </div>

          <div className={s.row()}>
            <div className={s.field()}>
              <Label htmlFor="type" className={s.label()}>
                Tipo
              </Label>
              <Select
                options={petTypes.map((type) => ({ value: type, label: type }))}
                value={formData.type}
                onChange={(value) =>
                  setFormData({ ...formData, type: value as PetType })
                }
              />
            </div>
            <div className={s.field()}>
              <Label htmlFor="breed" className={s.label()}>
                Raça
              </Label>
              <Input
                id="breed"
                value={formData.breed}
                onChange={(e) =>
                  setFormData({ ...formData, breed: e.target.value })
                }
                placeholder="Ex: Golden Retriever"
                className="bg-white border-slate-200 text-slate-800"
              />
            </div>
          </div>

          <div className={s.row()}>
            <div className={s.field()}>
              <Label htmlFor="birthDate" className={s.label()}>
                Data Nascimento
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                className="bg-white border-slate-200 text-slate-800"
              />
            </div>
            <div className={s.field()}>
              <Label htmlFor="gender" className={s.label()}>
                Gênero
              </Label>
              <Select
                options={genderOptions.map((g) => ({ value: g, label: g }))}
                value={formData.gender}
                onChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
                placeholder="Selecione o gênero"
              />
            </div>
          </div>

          <div className={s.row()}>
            <div className={s.field()}>
              <Label htmlFor="weight" className={s.label()}>
                Peso (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                placeholder="Ex: 25.5"
                className="bg-white border-slate-200 text-slate-800"
              />
            </div>
            <div className={s.field()}>
              <Label htmlFor="color" className={s.label()}>
                Cor
              </Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                placeholder="Ex: Dourado"
                className="bg-white border-slate-200 text-slate-800"
              />
            </div>
          </div>

          <div className={s.field()}>
            <Label htmlFor="tutor" className={s.label()}>
              Tutor
            </Label>
            <Select
              options={tutors.map((tutor) => ({
                value: String(tutor.id),
                label: tutor.name,
              }))}
              value={formData.tutorId}
              onChange={(value) => setFormData({ ...formData, tutorId: value })}
              placeholder="Selecione um tutor"
            />
          </div>

          <div className={s.field()}>
            <Label htmlFor="notes" className={s.label()}>
              Observações
            </Label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Ex: Vacinas em dia, alérgico a..."
              rows={3}
              className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            />
          </div>
        </div>

        <DialogFooter>
          {pet && onDelete && (
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
