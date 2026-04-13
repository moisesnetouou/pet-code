"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Header } from "./components/header";
import { NextAppointment } from "./components/next-appointment";
import { QuickActions } from "./components/quick-actions";
import { RecentPets } from "./components/recent-pets";
import { Sidebar } from "./components/sidebar";
import { StatsGrid } from "./components/stats-grid";
import { Timeline } from "./components/timeline";
import { WelcomeBanner } from "./components/welcome-banner";
import { greeting } from "./utils/greeting";
import { pets as petData } from "../pets/data";
import { tutors as tutorData } from "../tutors/data";
import { PetDialog } from "../pets/components/pet-dialog";
import { TutorDialog } from "../tutors/components/tutor-dialog";
import { RecordDialog } from "../records/components/record-dialog";
import type { Pet } from "../pets/types";
import type { Tutor } from "../tutors/types";
import type { MedicalRecord } from "../records/types";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [petDialogOpen, setPetDialogOpen] = useState(false);
  const [tutorDialogOpen, setTutorDialogOpen] = useState(false);
  const [recordDialogOpen, setRecordDialogOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const tutors = useMemo(
    () => tutorData.map((t) => ({ id: t.id, name: t.name })),
    [],
  );

  const allPets = useMemo(
    () =>
      petData.map((p) => ({
        id: p.id,
        name: p.name,
        type: p.type,
        emoji: p.emoji,
      })),
    [],
  );

  const handleSavePet = (petData: Omit<Pet, "id">) => {
    console.log("Novo pet:", petData);
    setPetDialogOpen(false);
  };

  const handleSaveTutor = (tutorData: Omit<Tutor, "id" | "pets" | "createdAt">) => {
    console.log("Novo tutor:", tutorData);
    setTutorDialogOpen(false);
  };

  const handleInactivateTutor = (id: number) => {
    console.log("Inativar tutor:", id);
    setTutorDialogOpen(false);
  };

  const handleSaveRecord = (recordData: Omit<MedicalRecord, "id">) => {
    console.log("Novo prontuário:", recordData);
    setRecordDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar
          open={sidebarOpen}
          onToggle={setSidebarOpen}
          currentPath="/dashboard"
        />

        <main
          className={cn(
            "flex-1 transition-all duration-300",
            sidebarOpen ? "ml-64" : "ml-20",
          )}
        >
          <Header
            greeting={`${greeting()}, Admin! 👋`}
            date="Terça-feira, 01 de Abril de 2026"
          />

          <div className="p-8">
            <WelcomeBanner />

            <StatsGrid />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <Timeline />
              </div>

              <div className="space-y-6">
                <NextAppointment />
                <RecentPets />
              </div>
            </div>

            <QuickActions
              onOpenPetDialog={() => setPetDialogOpen(true)}
              onOpenTutorDialog={() => setTutorDialogOpen(true)}
              onOpenRecordDialog={() => setRecordDialogOpen(true)}
            />
          </div>
        </main>
      </div>

      <PetDialog
        open={petDialogOpen}
        onOpenChange={setPetDialogOpen}
        pet={selectedPet}
        onSave={handleSavePet}
        tutors={tutors}
        onOpenTutorDialog={setTutorDialogOpen}
      />

      <TutorDialog
        open={tutorDialogOpen}
        onOpenChange={setTutorDialogOpen}
        onSave={handleSaveTutor}
        onInactivate={handleInactivateTutor}
        allPets={allPets}
        onOpenPetDialog={setPetDialogOpen}
      />

      <RecordDialog
        open={recordDialogOpen}
        onOpenChange={setRecordDialogOpen}
        onSave={handleSaveRecord}
      />
    </div>
  );
}
