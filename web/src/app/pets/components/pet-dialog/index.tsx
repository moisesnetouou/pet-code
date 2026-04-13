"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Check, Plus, Search } from "lucide-react";
import { Button } from "@/components/base/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/base/dialog";
import { ImageUpload } from "@/components/base/image-upload";
import { Input } from "@/components/base/input";
import { Label } from "@/components/base/label";
import { Select } from "@/components/base/select";
import { petTypes } from "../../data";
import type { Pet, PetType } from "../../types";
import { petDialogStyles } from "./styles";

type Step = 1 | 2;

interface PetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet?: Pet | null;
  onSave: (pet: Omit<Pet, "id">) => void;
  onDelete?: (id: number) => void;
  tutors: { id: number; name: string }[];
  onCreateTutor?: (tutor: Omit<{ id: number; name: string; phone: string; email: string; address: string; city: string; status: string }, "id" | "status">) => void;
  onOpenTutorDialog?: (open: boolean) => void;
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
  photoUrl: string;
  notes: string;
}

const getInitialFormData = (
  pet: Pet | null,
  tutors: { id: number; name: string }[],
): FormData => ({
  name: pet?.name || "",
  type: pet?.type || "Cachorro",
  breed: pet?.breed || "",
  birthDate: pet?.birthDate || "",
  gender: pet?.gender || "",
  weight: pet?.weight || "",
  color: pet?.color || "",
  tutorId: pet?.tutor
    ? String(tutors.find((t) => t.name === pet.tutor)?.id || "")
    : "",
  photoUrl: pet?.photoUrl || "",
  notes: pet?.notes || "",
});

const genderOptions = ["Macho", "Fêmea"];

const isEditMode = (pet: Pet | null | undefined): boolean => {
  return pet !== null && pet !== undefined && pet.id !== undefined;
};

export function PetDialog({
  open,
  onOpenChange,
  pet,
  onSave,
  onDelete,
  tutors,
  onCreateTutor,
  onOpenTutorDialog,
}: PetDialogProps) {
  const s = petDialogStyles();
  const isEditing = isEditMode(pet);
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>(() =>
    getInitialFormData(pet || null, tutors),
  );
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setStep(1);
      setFormData(getInitialFormData(null, tutors));
      setPhotoFile(null);
    } else if (pet) {
      setFormData(getInitialFormData(pet, tutors));
    }
    onOpenChange(isOpen);
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handleBackStep = () => {
    setStep(1);
  };

  const openCreateTutorDialog = () => {
    onOpenChange(false);
    onOpenTutorDialog?.(true);
  };

  const photoUrlValue = useMemo(() => {
    if (photoFile) {
      return URL.createObjectURL(photoFile);
    }
    return formData.photoUrl;
  }, [photoFile, formData.photoUrl]);

  const handleSubmit = async () => {
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

    let finalPhotoUrl = formData.photoUrl;

    if (photoFile) {
      const tempId = pet?.id || Date.now();
      try {
        const uploadFormData = new FormData();
        uploadFormData.append("file", photoFile);
        const res = await fetch(`/api/pets/${tempId}/photo`, {
          method: "POST",
          body: uploadFormData,
        });
        const data = await res.json();
        if (data.photoUrl) {
          finalPhotoUrl = data.photoUrl;
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }

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
      photoUrl: finalPhotoUrl,
      notes: formData.notes,
    });
    setPhotoFile(null);
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (pet && onDelete) {
      onDelete(pet.id);
      onOpenChange(false);
    }
  };

  const getStepTitle = () => {
    if (isEditing) {
      return "Editar Pet";
    }
    return step === 1 ? "Novo Pet - Dados" : "Novo Pet - Vincular Tutor";
  };

  const canProceed = formData.name.trim() !== "";

  const renderStep1 = () => (
    <div className={s.form()}>
      <div className={s.field()}>
        <Label htmlFor="name" className={s.label()}>
          Nome *
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
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
            onChange={(value) => setFormData({ ...formData, gender: value })}
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
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            placeholder="Ex: Dourado"
            className="bg-white border-slate-200 text-slate-800"
          />
        </div>
      </div>

      <div className={s.field()}>
        <ImageUpload
          label="Foto"
          value={photoUrlValue}
          onChange={setPhotoFile}
          placeholder="JPG, PNG ou WebP - máx 5MB"
        />
      </div>

      <div className={s.field()}>
        <Label htmlFor="notes" className={s.label()}>
          Observações
        </Label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Ex: Vacinas em dia, alérgico a..."
          rows={3}
          className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Vincule este pet a um tutor (opcional):
      </p>

      <Select
        options={tutors.map((tutor) => ({
          value: String(tutor.id),
          label: tutor.name,
        }))}
        value={formData.tutorId}
        onChange={(value) => setFormData({ ...formData, tutorId: value })}
        placeholder="Selecione um tutor"
      />

      <Button
        type="button"
        variant="outline"
        onClick={openCreateTutorDialog}
        className="w-full border-dashed border-slate-300 text-slate-600 hover:text-teal-600 hover:border-teal-300"
      >
        <Plus className="w-4 h-4 mr-2" />
        Criar novo tutor
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-slate-800">
            {getStepTitle()}
          </DialogTitle>
        </DialogHeader>

        {isEditing ? (
          renderStep1()
        ) : step === 1 ? (
          renderStep1()
        ) : (
          renderStep2()
        )}

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
          {isEditing ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="button" onClick={handleSubmit}>
                <Check className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </>
          ) : step === 1 ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handleNextStep}
                disabled={!canProceed}
              >
                Próximo
                <Check className="w-4 h-4 ml-2" />
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="outline" onClick={handleBackStep}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button type="button" onClick={handleSubmit}>
                <Check className="w-4 h-4 mr-2" />
                Finalizar
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}