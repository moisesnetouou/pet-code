"use client";

import { useState } from "react";
import { pets as allPets } from "@/app/pets/data";
import { PetAvatar } from "@/components/base/pet-avatar";
import { Button } from "@/components/base/button";
import { Input } from "@/components/base/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/base/dialog";
import type { Pet } from "@/app/pets/types";

export interface PetSelectProps {
  label?: string;
  value?: string;
  onChange?: (pet: Pet | null) => void;
  placeholder?: string;
}

export function PetSelect({
  label = "Pet",
  value,
  onChange,
  placeholder = "Buscar pet...",
}: PetSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedPet = allPets.find((p) => p.name === value);

  const filteredPets = allPets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.tutor.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (pet: Pet) => {
    onChange?.(pet);
    setOpen(false);
    setSearch("");
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-slate-700">{label} *</label>
      )}

      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="w-full justify-start h-10 px-4 py-2"
      >
        {selectedPet ? (
          <div className="flex items-center gap-2">
            <PetAvatar
              photoUrl={selectedPet.photoUrl}
              emoji={selectedPet.emoji}
              type={selectedPet.type}
              name={selectedPet.name}
              size="sm"
            />
            <span>{selectedPet.name}</span>
            <span className="text-slate-400 text-sm">- {selectedPet.type}</span>
          </div>
        ) : (
          <span className="text-slate-400">{placeholder}</span>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[400px] bg-white max-h-[60vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-slate-800">Selecionar Pet</DialogTitle>
          </DialogHeader>

          <div className="p-4 border-b border-slate-200">
            <Input
              placeholder="Buscar por nome ou tutor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white"
            />
          </div>

          <div className=" overflow-y-auto flex-1">
            {filteredPets.length === 0 ? (
              <div className="p-4 text-center text-slate-500">
                Nenhum pet encontrado
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredPets.map((pet) => (
                  <button
                    key={pet.id}
                    type="button"
                    onClick={() => handleSelect(pet)}
                    className="w-full p-3 flex items-center gap-3 hover:bg-teal-50 transition-colors text-left"
                  >
                    <PetAvatar
                      photoUrl={pet.photoUrl}
                      emoji={pet.emoji}
                      type={pet.type}
                      name={pet.name}
                      size="sm"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{pet.name}</p>
                      <p className="text-xs text-slate-500">
                        {pet.type} • Tutor: {pet.tutor}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        pet.status === "ativo"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {pet.status}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}