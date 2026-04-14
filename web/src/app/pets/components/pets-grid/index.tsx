"use client";

import { PawPrint } from "lucide-react";
import Link from "next/link";
import { PetCard as BasePetCard } from "@/components/base";
import type { Pet } from "../../types";
import { petsGridStyles } from "./styles";
import type { PetsGridProps } from "./types";

export function PetsGrid({ pets, onEdit }: PetsGridProps) {
  const g = petsGridStyles();

  if (pets.length === 0) {
    return (
      <div className={g.empty()}>
        <PawPrint className={g.emptyIcon()} />
        <h3 className={g.emptyTitle()}>Nenhum pet encontrado</h3>
        <p className={g.emptyDescription()}>
          Tente ajustar os filtros ou cadastrar um novo pet
        </p>
      </div>
    );
  }

  return (
    <div className={g.container()}>
      {pets.map((pet: Pet) => (
        <Link key={pet.id} href={`/pets/${pet.id}`}>
          <BasePetCard
            name={pet.name}
            breed={pet.breed}
            age={pet.age}
            weight={pet.weight}
            tutor={pet.tutor}
            status={pet.status}
            lastVisit={pet.lastVisit}
            emoji={pet.emoji}
            type={pet.type}
            photoUrl={pet.photoUrl}
          />
        </Link>
      ))}
    </div>
  );
}
