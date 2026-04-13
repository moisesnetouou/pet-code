"use client";

import { Users } from "lucide-react";
import { TutorCard } from "../tutor-card";
import { tutorsGridStyles } from "./styles";
import type { TutorsGridProps } from "./types";

export function TutorsGrid({ tutors }: TutorsGridProps) {
  const g = tutorsGridStyles();

  if (tutors.length === 0) {
    return (
      <div className={g.empty()}>
        <Users className={g.emptyIcon()} />
        <h3 className={g.emptyTitle()}>Nenhum tutor encontrado</h3>
        <p className={g.emptyDescription()}>
          Tente ajustar os filtros ou cadastrar um novo tutor
        </p>
      </div>
    );
  }

  return (
    <div className={g.container()}>
      {tutors.map((tutor) => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
}
