"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/base";
import { PetAvatar } from "@/components/base/pet-avatar";
import type { Pet } from "../../types";

interface PetDocumentCardProps {
  pet: Pet;
}

export function PetDocumentCard({ pet }: PetDocumentCardProps) {
  const [showTutorDialog, setShowTutorDialog] = useState(false);

  return (
    <>
      <div className="relative w-full bg-white rounded-3xl border-2 border-slate-100 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-purple-50/50" />

        <div className="relative p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PetAvatar
                photoUrl={pet.photoUrl}
                emoji={pet.emoji}
                type={pet.type}
                name={pet.name}
                size="lg"
              />
              <div>
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                  Pet ID
                </p>
                <p className="font-bold text-slate-800 text-lg">
                  #{pet.id.toString().padStart(4, "0")}
                </p>
              </div>
            </div>
            <div
              className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                pet.status === "ativo"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {pet.status === "ativo" ? "Ativo" : "Inativo"}
            </div>
          </div>

          <div className="border-t border-b border-slate-100 py-4 space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-800">{pet.name}</p>
              <p className="text-sm text-slate-500">{pet.type}</p>
            </div>

            <DocumentRow label="Nascimento" value={pet.birthDate || pet.age} />
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Tutor Principal
            </p>
            <button
              onClick={() => setShowTutorDialog(true)}
              className="w-full p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-100 hover:from-teal-100 hover:to-emerald-100 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {pet.tutor.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{pet.tutor}</p>
                  <p className="text-xs text-slate-500">{pet.tutorPhone}</p>
                </div>
              </div>
            </button>
          </div>

          <div className="flex items-center justify-center pt-2">
            <p className="text-xs text-slate-400 font-mono">
              PETCODE-{new Date().getFullYear()}-
              {pet.id.toString().padStart(6, "0")}
            </p>
          </div>
        </div>
      </div>

      <Dialog open={showTutorDialog} onOpenChange={setShowTutorDialog}>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle className="text-slate-800">
              Informações do Tutor
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-semibold">
                  {pet.tutor.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-xl font-bold text-slate-800">{pet.tutor}</p>
                <p className="text-slate-500">Tutor Principal</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="p-4 bg-white border border-slate-200 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Telefone</p>
                <p className="font-medium text-slate-800">{pet.tutorPhone}</p>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">
                  Pet sob responsabilidade
                </p>
                <p className="font-medium text-slate-800">{pet.name}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function DocumentRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}
