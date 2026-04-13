"use client";

import { Mail, MapPin, PawPrint, Phone } from "lucide-react";
import Link from "next/link";
import { TutorAvatar } from "@/components/base/tutor-avatar";
import { tutorCardStyles } from "./styles";
import type { TutorCardProps } from "./types";

export function TutorCard({ tutor }: TutorCardProps) {
  const t = tutorCardStyles({ status: tutor.status });

  return (
    <Link href={`/tutors/${tutor.id}`} className={t.container()}>
      <div className={t.header()}>
        <TutorAvatar
          photoUrl={tutor.photoUrl}
          name={tutor.name}
          size="lg"
        />
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className={t.name()}>{tutor.name}</span>
        <span className={t.statusBadge()}>
          {tutor.status === "ativo" ? "Ativo" : "Inativo"}
        </span>
      </div>

      <div className={t.content()}>
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
    </Link>
  );
}
