"use client";

import { Plus, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/base/button";
import { cn } from "@/lib/utils";
import { Header } from "../dashboard/components/header";
import { Sidebar } from "../dashboard/components/sidebar";
import { greeting, formatDate } from "../dashboard/utils/greeting";
import { PetDialog } from "../pets/components/pet-dialog";
import { Filters } from "./components/filters";
import { TutorDialog } from "./components/tutor-dialog";
import type { Pet } from "../pets/types";
import { TutorsGrid } from "./components/tutors-grid";
import { pets as petData } from "../pets/data";
import { tutors as initialTutors } from "./data";
import type { FilterOptions, Tutor } from "./types";

export default function TutorsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    status: "all",
    sortBy: "name",
  });
  const [tutors, setTutors] = useState(initialTutors);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [petDialogOpen, setPetDialogOpen] = useState(false);

  const allPets = useMemo(
    () => petData.map((p) => ({ id: p.id, name: p.name, type: p.type, emoji: p.emoji })),
    [],
  );

  const filteredTutors = useMemo(() => {
    let result = [...tutors];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (tutor) =>
          tutor.name.toLowerCase().includes(search) ||
          tutor.phone.toLowerCase().includes(search),
      );
    }

    if (filters.status !== "all") {
      result = result.filter((tutor) => tutor.status === filters.status);
    }

    switch (filters.sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "recent":
        result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case "pets":
        result.sort((a, b) => b.pets.length - a.pets.length);
        break;
    }

    return result;
  }, [tutors, filters]);

  const handleNewTutor = () => {
    setSelectedTutor(null);
    setDialogOpen(true);
  };

  const handleEditTutor = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setDialogOpen(true);
  };

  const handleSaveTutor = (
    tutorData: Omit<Tutor, "id" | "pets" | "createdAt">,
  ) => {
    if (selectedTutor) {
      setTutors(
        tutors.map((t) =>
          t.id === selectedTutor.id ? { ...t, ...tutorData, id: t.id } : t,
        ),
      );
    } else {
      const newId = Math.max(...tutors.map((t) => t.id), 0) + 1;
      setTutors([
        ...tutors,
        {
          ...tutorData,
          id: newId,
          pets: [],
          createdAt: new Date().toLocaleDateString("pt-BR"),
        } as Tutor,
      ]);
    }
  };

  const handleInactivateTutor = (id: number) => {
    setTutors(
      tutors.map((t) =>
        t.id === id ? { ...t, status: "inativo" as const } : t,
      ),
    );
  };

  const handleSavePet = (petData: Omit<Pet, "id">) => {
    console.log("Novo pet:", petData);
    setPetDialogOpen(false);
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
          currentPath="/tutors"
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <Users className="w-7 h-7 text-teal-600" />
                  Tutores
                </h1>
                <p className="text-slate-600 mt-1">
                  Gerencie os tutores cadastrados na clínica
                </p>
              </div>
              <Button onClick={handleNewTutor}>
                <Plus className="w-4 h-4" />
                Novo Tutor
              </Button>
            </div>

            <Filters
              options={filters}
              onChange={setFilters}
              totalResults={filteredTutors.length}
            />

            <TutorsGrid tutors={filteredTutors} />
          </div>
        </main>
      </div>

      <TutorDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        tutor={selectedTutor}
        onSave={handleSaveTutor}
        onInactivate={handleInactivateTutor}
        allPets={allPets}
        onOpenPetDialog={setPetDialogOpen}
      />

      <PetDialog
        open={petDialogOpen}
        onOpenChange={setPetDialogOpen}
        onSave={handleSavePet}
        tutors={tutors}
        onOpenTutorDialog={setDialogOpen}
      />
    </div>
  );
}
