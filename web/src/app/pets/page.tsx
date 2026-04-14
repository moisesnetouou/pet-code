"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PawPrint, Plus } from "lucide-react";
import { Button } from "@/components/base";
import { cn } from "@/lib/utils";
import { Header } from "../dashboard/components/header";
import { Sidebar } from "../dashboard/components/sidebar";
import { greeting, formatDate } from "../dashboard/utils/greeting";
import { tutors as tutorData } from "../tutors/data";
import { pets as petData } from "./data";
import { Filters } from "./components/filters";
import { PetDialog } from "./components/pet-dialog";
import { PetsGrid } from "./components/pets-grid";
import { TutorDialog } from "../tutors/components/tutor-dialog";
import { pets as initialPets } from "./data";
import type { FilterOptions, Pet } from "./types";
import type { Tutor } from "../tutors/types";

function PetsPageContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    type: "all",
    status: "all",
    sortBy: "name",
  });
  const [pets, setPets] = useState(initialPets);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tutorDialogOpen, setTutorDialogOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("new") === "true") {
      setSelectedPet(null);
      setDialogOpen(true);
    }
  }, [searchParams]);

  const tutors = useMemo(
    () => tutorData.map((t) => ({ id: t.id, name: t.name })),
    [],
  );

  const allPets = useMemo(
    () => petData.map((p) => ({ id: p.id, name: p.name, type: p.type, emoji: p.emoji })),
    [],
  );

  const filteredPets = useMemo(() => {
    let result = [...pets];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (pet) =>
          pet.name.toLowerCase().includes(search) ||
          pet.tutor.toLowerCase().includes(search),
      );
    }

    if (filters.type !== "all") {
      result = result.filter((pet) => pet.type === filters.type);
    }

    if (filters.status !== "all") {
      result = result.filter((pet) => pet.status === filters.status);
    }

    switch (filters.sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "recent":
        result.sort((a, b) =>
          (b.lastVisit || "").localeCompare(a.lastVisit || ""),
        );
        break;
      case "type":
        result.sort((a, b) => a.type.localeCompare(b.type));
        break;
    }

    return result;
  }, [pets, filters]);

  const handleNewPet = () => {
    setSelectedPet(null);
    setDialogOpen(true);
  };

  const handleEditPet = (pet: Pet) => {
    setSelectedPet(pet);
    setDialogOpen(true);
  };

  const handleSavePet = (petData: Omit<Pet, "id">) => {
    if (selectedPet) {
      setPets(
        pets.map((p) =>
          p.id === selectedPet.id ? { ...p, ...petData, id: p.id } : p,
        ),
      );
    } else {
      const newId = Math.max(...pets.map((p) => p.id), 0) + 1;
      setPets([...pets, { ...petData, id: newId } as Pet]);
    }
  };

  const handleDeletePet = (id: number) => {
    setPets(pets.filter((p) => p.id !== id));
  };

  const handleSaveTutor = (tutorData: Omit<Tutor, "id" | "pets" | "createdAt">) => {
    console.log("Novo tutor:", tutorData);
    setTutorDialogOpen(false);
  };

  const handleInactivateTutor = (id: number) => {
    console.log("Inativar tutor:", id);
    setTutorDialogOpen(false);
  };

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar
          open={sidebarOpen}
          onToggle={setSidebarOpen}
          currentPath="/pets"
        />

        <main
          className={cn(
            "flex-1 transition-all duration-300",
            sidebarOpen ? "ml-64" : "ml-20",
          )}
        >
          <Header
            greeting={`${greeting()}, Admin! 👋`}
            date={formatDate()}
          />

          <div className="p-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <PawPrint className="w-7 h-7 text-teal-600" />
                  Pets
                </h1>
                <p className="text-slate-600 mt-1">
                  Gerencie os pets cadastrados na clínica
                </p>
              </div>
              <Button onClick={handleNewPet}>
                <Plus className="w-4 h-4" />
                Novo Pet
              </Button>
            </div>

            {/* Filters */}
            <Filters
              options={filters}
              onChange={setFilters}
              totalResults={filteredPets.length}
            />

            {/* Pets Grid */}
            <PetsGrid pets={filteredPets} onEdit={handleEditPet} />
          </div>
        </main>
      </div>

      <PetDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        pet={selectedPet}
        onSave={handleSavePet}
        onDelete={handleDeletePet}
        tutors={tutors}
        onOpenTutorDialog={setTutorDialogOpen}
      />

      <TutorDialog
        open={tutorDialogOpen}
        onOpenChange={setTutorDialogOpen}
        onSave={handleSaveTutor}
        onInactivate={handleInactivateTutor}
        allPets={allPets}
        onOpenPetDialog={setDialogOpen}
      />
    </div>
  );
}

export default function PetsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <PetsPageContent />
    </Suspense>
  );
}
