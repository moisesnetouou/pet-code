"use client";

import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/base/button";
import { Input } from "@/components/base/input";
import { PetSelect } from "@/components/base/pet-select";
import { Select } from "@/components/base/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/base/dialog";
import type { MedicalRecord, MedicalRecordStatus, MedicalRecordType } from "../../types";
import type { Pet } from "@/app/pets/types";

interface RecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record?: MedicalRecord | null;
  onSave: (record: Omit<MedicalRecord, "id">) => void;
  onDelete?: (id: number) => void;
}

type Step = 1 | 2;

interface FormData {
  selectedPetId: number | null;
  petName: string;
  petType: string;
  petEmoji: string;
  tutor: string;
  petStatus: string;
  date: string;
  type: MedicalRecordType;
  veterinarian: string;
  diagnosis: string;
  notes: string;
  status: MedicalRecordStatus;
}

const petTypeEmojis: Record<string, string> = {
  Cachorro: "🐕",
  Gato: "🐱",
  Pássaro: "🦜",
  Peixe: "🐠",
  Coelho: "🐰",
  Jabuti: "🐢",
};

const getInitialFormData = (record?: MedicalRecord | null): FormData => ({
  selectedPetId: null,
  petName: record?.petName || "",
  petType: record?.petType || "",
  petEmoji: record?.petEmoji || "🐕",
  tutor: record?.tutor || "",
  petStatus: "",
  date: record?.date || new Date().toLocaleDateString("pt-BR"),
  type: record?.type || "Consulta",
  veterinarian: record?.veterinarian || "",
  diagnosis: record?.diagnosis || "",
  notes: record?.notes || "",
  status: record?.status || "pendente",
});

const recordTypes: MedicalRecordType[] = [
  "Consulta",
  "Vacinação",
  "Cirurgia",
  "Exame",
  "Check-up",
];

const statusOptions: MedicalRecordStatus[] = ["concluído", "pendente"];

const isEditMode = (record: MedicalRecord | null | undefined): boolean => {
  return record !== null && record !== undefined && record.id !== undefined;
};

export function RecordDialog({
  open,
  onOpenChange,
  record,
  onSave,
}: RecordDialogProps) {
  const isEditing = isEditMode(record);
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>(() =>
    getInitialFormData(record),
  );

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setStep(1);
      setFormData(getInitialFormData());
    } else if (record) {
      setFormData(getInitialFormData(record));
    }
    onOpenChange(isOpen);
  };

  const handlePetSelect = (pet: Pet | null) => {
    setFormData({
      ...formData,
      selectedPetId: pet?.id ?? null,
      petName: pet?.name || "",
      petType: pet?.type || "",
      petEmoji: pet?.emoji || "🐕",
      tutor: pet?.tutor || "",
      petStatus: pet?.status || "",
    });
  };

  const handleNextStep = () => {
    if (formData.selectedPetId) {
      setStep(2);
    }
  };

  const handleBackStep = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    onSave({
      petName: formData.petName,
      petType: formData.petType,
      petEmoji: formData.petEmoji,
      tutor: formData.tutor,
      date: formData.date,
      type: formData.type,
      veterinarian: formData.veterinarian,
      diagnosis: formData.diagnosis || undefined,
      notes: formData.notes || undefined,
      status: formData.status,
    });
    onOpenChange(false);
  };

  const canProceed = formData.selectedPetId !== null;

  const getStepTitle = () => {
    if (isEditing) {
      return "Editar Prontuário";
    }
    return step === 1
      ? "Novo Prontuário - Selecionar Pet"
      : "Novo Prontuário - Dados do Atendimento";
  };

  const renderPetInfo = () => (
    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
      <p className="text-xs text-slate-500 mb-2">Pet selecionado</p>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{formData.petEmoji}</span>
        <div>
          <p className="font-medium text-slate-800">{formData.petName}</p>
          <p className="text-sm text-slate-500">
            {formData.petType} • Tutor: {formData.tutor}
          </p>
        </div>
        <span
          className={`ml-auto px-2 py-0.5 text-xs rounded-full ${
            formData.petStatus === "ativo"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {formData.petStatus === "ativo" ? "Ativo" : "Inativo"}
        </span>
      </div>
    </div>
  );

  const renderEditForm = () => (
    <div className="py-4 space-y-4">
      {renderPetInfo()}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Data"
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value })
          }
          placeholder="DD/MM/AAAA"
          className="bg-white border-slate-200 text-slate-800"
        />

        <Select
          label="Tipo de Atendimento"
          value={formData.type}
          onChange={(value) =>
            setFormData({ ...formData, type: value as MedicalRecordType })
          }
          options={recordTypes.map((t) => ({ value: t, label: t }))}
        />

        <Select
          label="Status"
          value={formData.status}
          onChange={(value) =>
            setFormData({ ...formData, status: value as MedicalRecordStatus })
          }
          options={statusOptions.map((s) => ({
            value: s,
            label: s === "concluído" ? "Concluído" : "Pendente",
          }))}
        />

        <Input
          label="Veterinário"
          value={formData.veterinarian}
          onChange={(e) =>
            setFormData({ ...formData, veterinarian: e.target.value })
          }
          placeholder="Dr. Nome"
          className="bg-white border-slate-200 text-slate-800"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Diagnóstico
        </label>
        <textarea
          value={formData.diagnosis}
          onChange={(e) =>
            setFormData({ ...formData, diagnosis: e.target.value })
          }
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          placeholder="Diagnóstico do atendimento..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Observações
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) =>
            setFormData({ ...formData, notes: e.target.value })
          }
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          placeholder="Observações adicionais..."
        />
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-slate-800">{getStepTitle()}</DialogTitle>
        </DialogHeader>

        {isEditing ? (
          renderEditForm()
        ) : step === 1 ? (
          <div className="py-4 space-y-4">
            <p className="text-sm text-slate-600">
              Selecione o pet para registrar o atendimento:
            </p>

            <PetSelect
              label="Pet"
              value={formData.petName}
              onChange={handlePetSelect}
              placeholder="Buscar pet..."
            />

            {formData.selectedPetId && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-slate-500">Status do pet:</span>
                <span
                  className={`px-2 py-0.5 text-xs rounded-full ${
                    formData.petStatus === "ativo"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {formData.petStatus === "ativo" ? "Ativo" : "Inativo"}
                </span>
              </div>
            )}
          </div>
        ) : (
          renderEditForm()
        )}

        <DialogFooter>
          {isEditing ? (
            <Button type="button" onClick={handleSubmit}>
              <Check className="w-4 h-4 mr-2" />
              Salvar
            </Button>
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
                Alterar Pet
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