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
import { PetSelect } from "@/components/base/pet-select";
import type { Tutor } from "../../types";
import type { Pet } from "@/app/pets/types";
import { tutorDialogStyles } from "./styles";

type Step = 1 | 2;

interface TutorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tutor?: Tutor | null;
  onSave: (tutor: Omit<Tutor, "id" | "pets" | "createdAt">) => void;
  onInactivate?: (id: number) => void;
  allPets?: { id: number; name: string; type: string; emoji: string }[];
  onCreatePet?: (pet: Omit<Pet, "id">) => void;
  onOpenPetDialog?: (open: boolean) => void;
}

interface FormData {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  photoUrl: string;
  selectedPetIds: number[];
  selectedPets: { id: number; name: string; type: string; emoji: string }[];
}

const getInitialFormData = (
  tutor?: Tutor | null,
  allPets?: { id: number; name: string; type: string; emoji: string }[],
): FormData => {
  const tutorPetIds = tutor?.pets
    ? tutor.pets
        .map((petName) => allPets?.find((p) => p.name === petName)?.id)
        .filter((id): id is number => id !== undefined)
    : [];

  return {
    name: tutor?.name || "",
    cpf: tutor?.cpf || "",
    phone: tutor?.phone || "",
    email: tutor?.email || "",
    address: tutor?.address || "",
    city: tutor?.city || "",
    photoUrl: tutor?.photoUrl || "",
    selectedPetIds: tutorPetIds,
    selectedPets:
      allPets?.filter((p) => tutorPetIds.includes(p.id)) || [],
  };
};

const isEditMode = (tutor: Tutor | null | undefined): boolean => {
  return tutor !== null && tutor !== undefined && tutor.id !== undefined;
};

export function TutorDialog({
  open,
  onOpenChange,
  tutor,
  onSave,
  onInactivate,
  allPets = [],
  onCreatePet,
  onOpenPetDialog,
}: TutorDialogProps) {
  const s = tutorDialogStyles();
  const isEditing = isEditMode(tutor);
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>(() =>
    getInitialFormData(tutor, allPets),
  );
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const photoUrlValue = useMemo(() => {
    if (photoFile) {
      return URL.createObjectURL(photoFile);
    }
    return formData.photoUrl;
  }, [photoFile, formData.photoUrl]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setStep(1);
      setFormData(getInitialFormData(null, allPets));
      setPhotoFile(null);
    } else if (tutor) {
      setFormData(getInitialFormData(tutor, allPets));
    }
    onOpenChange(isOpen);
  };

  const handlePetSelect = (pet: Pet | null) => {
    if (!pet) return;
    if (!formData.selectedPetIds.includes(pet.id)) {
      setFormData({
        ...formData,
        selectedPetIds: [...formData.selectedPetIds, pet.id],
        selectedPets: [...formData.selectedPets, pet],
      });
    }
  };

  const handleRemovePet = (petId: number) => {
    setFormData({
      ...formData,
      selectedPetIds: formData.selectedPetIds.filter((id) => id !== petId),
      selectedPets: formData.selectedPets.filter((p) => p.id !== petId),
    });
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handleBackStep = () => {
    setStep(1);
  };

  const handleSaveAndContinue = async () => {
    let finalPhotoUrl = formData.photoUrl;

    if (photoFile) {
      const tempId = tutor?.id || Date.now();
      try {
        const uploadFormData = new FormData();
        uploadFormData.append("file", photoFile);
        const res = await fetch(`/api/tutors/${tempId}/photo`, {
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
      cpf: formData.cpf,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      status: "ativo",
      photoUrl: finalPhotoUrl,
    });
  };

  const openCreatePetDialog = async () => {
    await handleSaveAndContinue();
    onOpenPetDialog?.(true);
  };

  const handleSubmit = async () => {
    await handleSaveAndContinue();
    setPhotoFile(null);
    onOpenChange(false);
  };

  const handleInactivate = () => {
    if (tutor && onInactivate) {
      onInactivate(tutor.id);
      onOpenChange(false);
    }
  };

  const getStepTitle = () => {
    if (isEditing) {
      return "Editar Tutor";
    }
    return step === 1
      ? "Novo Tutor - Dados"
      : "Novo Tutor - Adicionar Pets";
  };

  const canProceed = formData.name.trim() !== "" && formData.phone.trim() !== "";

  const renderStep1 = () => (
    <div className={s.form()}>
      <div className={s.field()}>
        <ImageUpload
          label="Foto"
          value={photoUrlValue}
          onChange={setPhotoFile}
          placeholder="JPG, PNG ou WebP - máx 5MB"
        />
      </div>

      <div className={s.field()}>
        <Label htmlFor="name" className={s.label()}>
          Nome *
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          placeholder="Ex: São Paulo"
          className="bg-white border-slate-200 text-slate-800"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Vincule pets a este tutor (opcional):
      </p>

      <PetSelect
        label="Buscar pet"
        value=""
        onChange={handlePetSelect}
        placeholder="Buscar pet existente..."
      />

      {formData.selectedPets.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs text-slate-500">Pets selecionados:</p>
          <div className="flex flex-wrap gap-2">
            {formData.selectedPets.map((pet) => (
              <div
                key={pet.id}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-sm"
              >
                <span>{pet.emoji}</span>
                <span className="text-slate-700">{pet.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemovePet(pet.id)}
                  className="text-slate-400 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        onClick={openCreatePetDialog}
        className="w-full border-dashed border-slate-300 text-slate-600 hover:text-teal-600 hover:border-teal-300"
      >
        <Plus className="w-4 h-4 mr-2" />
        Criar novo pet
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-slate-800">
            {getStepTitle()}
          </DialogTitle>
        </DialogHeader>

        {isEditing ? renderStep1() : step === 1 ? renderStep1() : renderStep2()}

        <DialogFooter>
          {tutor && onInactivate && tutor.status === "ativo" && (
            <Button
              type="button"
              variant="destructive"
              onClick={handleInactivate}
              className="mr-auto bg-amber-500 hover:bg-amber-600 text-white"
            >
              Inativar
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
