"use client";

import { Calendar, User, Weight } from "lucide-react";
import { cn } from "@/lib/utils";
import { petCardStyles } from "./styles";
import type { PetCardProps } from "./types";

export function PetCard({ pet }: PetCardProps) {
  const p = petCardStyles({ status: pet.status });

  return (
    <div className={p.container()}>
      <div className={p.header()}>
        <div className={cn(p.avatarContainer(), pet.color)}>{pet.emoji}</div>
        <span className={p.statusBadge()}>
          {pet.status === "ativo" ? "Ativo" : "Inativo"}
        </span>
      </div>

      <div className={p.content()}>
        <h3 className={p.name()}>{pet.name}</h3>
        <p className={p.breed()}>{pet.breed}</p>

        <div className={p.infoRow()}>
          <Calendar className={p.infoIcon()} />
          <span>{pet.age}</span>
        </div>

        <div className={p.infoRow()}>
          <Weight className={p.infoIcon()} />
          <span>{pet.weight}</span>
        </div>
      </div>

      <div className={p.tutorSection()}>
        <p className={p.tutorLabel()}>Tutor responsável</p>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-slate-500" />
          <span className={p.tutorName()}>{pet.tutor}</span>
        </div>
      </div>

      {pet.lastVisit && (
        <div className={p.infoRow()}>
          <Calendar className={p.infoIcon()} />
          <span className="text-xs text-slate-600">
            Última visita: {pet.lastVisit}
          </span>
        </div>
      )}
    </div>
  );
}
