"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/base";
import { TutorAvatar } from "@/components/base/tutor-avatar";
import type { Tutor } from "../../types";

interface TutorDocumentCardProps {
  tutor: Tutor;
}

export function TutorDocumentCard({ tutor }: TutorDocumentCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="relative w-full bg-white rounded-3xl border-2 border-slate-100 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/50" />

        <div className="relative p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TutorAvatar
                photoUrl={tutor.photoUrl}
                name={tutor.name}
                size="xl"
              />
              <div>
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                  Tutor ID
                </p>
                <p className="font-bold text-slate-800 text-lg">
                  #{tutor.id.toString().padStart(4, "0")}
                </p>
              </div>
            </div>
            <div
              className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                tutor.status === "ativo"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {tutor.status === "ativo" ? "Ativo" : "Inativo"}
            </div>
          </div>

          <div className="border-t border-b border-slate-100 py-4 space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-800">{tutor.name}</p>
              <p className="text-sm text-slate-500">{tutor.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <DocumentRow label="Telefone" value={tutor.phone} />
              <DocumentRow label="Cidade" value={tutor.city} />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Endereço
            </p>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-sm text-slate-700">{tutor.address}</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Pets sob responsabilidade
            </p>
            {tutor.pets.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tutor.pets.map((petName, index) => (
                  <Link
                    key={index}
                    href={`/pets/${index + 1}`}
                    className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors"
                  >
                    {petName}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">
                Nenhum pet cadastrado
              </p>
            )}
          </div>

          <div className="flex items-center justify-center pt-2">
            <p className="text-xs text-slate-400 font-mono">
              PETCODE-TUTOR-{new Date().getFullYear()}-{tutor.id.toString().padStart(6, "0")}
            </p>
          </div>
        </div>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle className="text-slate-800">
              Informações do Tutor
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <TutorAvatar
                photoUrl={tutor.photoUrl}
                name={tutor.name}
                size="xl"
              />
              <div>
                <p className="text-xl font-bold text-slate-800">{tutor.name}</p>
                <p className="text-slate-500">Tutor</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="p-4 bg-white border border-slate-200 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Telefone</p>
                <p className="font-medium text-slate-800">{tutor.phone}</p>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Email</p>
                <p className="font-medium text-slate-800">{tutor.email}</p>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Endereço</p>
                <p className="font-medium text-slate-800">{tutor.address}</p>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Cidade</p>
                <p className="font-medium text-slate-800">{tutor.city}</p>
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