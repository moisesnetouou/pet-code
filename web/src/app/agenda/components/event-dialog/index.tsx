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
import type { CalendarEvent, EventType } from "../../types";
import { eventTypeConfig } from "../../types";
import { eventDialogStyles } from "./styles";

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: CalendarEvent | null;
  onSave: (event: Omit<CalendarEvent, "id">) => void;
  onDelete?: (id: number) => void;
  pets: { id: number; name: string; emoji: string }[];
}

const eventTypes: EventType[] = [
  "consulta",
  "vacinação",
  "cirurgia",
  "exame",
  "checkup",
];

interface FormData {
  title: string;
  petId: string;
  type: EventType;
  date: string;
  startTime: string;
  endTime: string;
}

const getInitialFormData = (): FormData => ({
  title: "",
  petId: "",
  type: "consulta",
  date: new Date().toISOString().split("T")[0],
  startTime: "09:00",
  endTime: "09:30",
});

export function EventDialog({
  open,
  onOpenChange,
  event,
  onSave,
  onDelete,
  pets,
}: EventDialogProps) {
  const s = eventDialogStyles();
  const [formData, setFormData] = useState<FormData>(getInitialFormData());

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFormData(getInitialFormData());
    }
    onOpenChange(isOpen);
  };

  const handleSubmit = () => {
    const pet = pets.find((p) => p.name === formData.petId);
    onSave({
      title: formData.title,
      start: `${formData.date}T${formData.startTime}`,
      end: `${formData.date}T${formData.endTime}`,
      type: formData.type,
      petName: formData.petId,
      petEmoji: pet?.emoji || "🐾",
      tutorName: "Tutor",
    });
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-slate-800">
            {event ? "Editar Evento" : "Novo Evento"}
          </DialogTitle>
        </DialogHeader>

        <div className={s.form()}>
          <div className={s.field()}>
            <Label htmlFor="title" className={s.label()}>
              Título
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Ex: Cheems - Consulta"
              className="bg-white border-slate-200 text-slate-800"
            />
          </div>

          <div className={s.field()}>
            <Label htmlFor="pet" className={s.label()}>
              Pet
            </Label>
            <Select
              options={pets.map((pet) => ({
                value: pet.name,
                label: `${pet.emoji} ${pet.name}`,
              }))}
              value={formData.petId}
              onChange={(value) => setFormData({ ...formData, petId: value })}
              placeholder="Selecione um pet"
            />
          </div>

          <div className={s.field()}>
            <Label htmlFor="type" className={s.label()}>
              Tipo
            </Label>
            <Select
              options={eventTypes.map((type) => ({
                value: type,
                label: eventTypeConfig[type].label,
              }))}
              value={formData.type}
              onChange={(value) =>
                setFormData({ ...formData, type: value as EventType })
              }
            />
          </div>

          <div className={s.field()}>
            <Label htmlFor="date" className={s.label()}>
              Data
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="bg-white border-slate-200 text-slate-800"
            />
          </div>

          <div className={s.row()}>
            <div className={s.field()}>
              <Label htmlFor="start" className={s.label()}>
                Início
              </Label>
              <Input
                id="start"
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="bg-white border-slate-200 text-slate-800"
              />
            </div>
            <div className={s.field()}>
              <Label htmlFor="end" className={s.label()}>
                Fim
              </Label>
              <Input
                id="end"
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                className="bg-white border-slate-200 text-slate-800"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          {event && onDelete && (
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
