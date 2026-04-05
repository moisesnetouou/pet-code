"use client";

import { Mail, MapPin, PawPrint, Phone } from "lucide-react";
import { tutorCardStyles } from "./styles";
import type { TutorCardProps } from "./types";

export function TutorCard({ tutor, onClick }: TutorCardProps) {
  const t = tutorCardStyles({ status: tutor.status });

  return (
    <div className={t.container()} onClick={() => onClick?.(tutor)}>
      <div className={t.header()}>
        <div className={t.avatarContainer()}>
          <span className={t.avatarInitials()}>
            {tutor.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <span className={t.statusBadge()}>
          {tutor.status === "ativo" ? "Ativo" : "Inativo"}
        </span>
      </div>

      <div className={t.content()}>
        <h3 className={t.name()}>{tutor.name}</h3>

        <div className={t.infoRow()}>
          <Phone className={t.infoIcon()} />
          <span>{tutor.phone}</span>
        </div>

        <div className={t.infoRow()}>
          <Mail className={t.infoIcon()} />
          <span>{tutor.email}</span>
        </div>

        <div className={t.infoRow()}>
          <MapPin className={t.infoIcon()} />
          <span>{tutor.city}</span>
        </div>
      </div>

      <div className={t.petsSection()}>
        <p className={t.petsLabel()}>Pets ({tutor.pets.length})</p>
        <div className="flex flex-wrap gap-2">
          {tutor.pets.map((pet) => (
            <span key={pet} className={t.petTag()}>
              <PawPrint className="w-3 h-3 mr-1" />
              {pet}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
