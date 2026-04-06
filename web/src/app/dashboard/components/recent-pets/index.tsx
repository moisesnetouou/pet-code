"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/base/button";
import { Card, CardContent } from "@/components/base/card";
import { cn } from "@/lib/utils";
import { pets as defaultPets } from "../../data";
import { recentPetsStyles } from "./styles";
import type { RecentPetsProps } from "./types";

export function RecentPets({
  pets: initialPets = defaultPets,
  limit = 8,
  showViewAll = true,
}: RecentPetsProps) {
  const r = recentPetsStyles();
  const pets = initialPets.slice(0, limit);

  return (
    <Card className={r.container()}>
      <CardContent className={r.content()}>
        <h3 className={r.title()}>Pets recentes</h3>
        <div className={r.grid()}>
          {pets.map((pet) => (
            <div key={pet.id} className={r.petItem()}>
              <div className={cn(r.petAvatar(), pet.color)}>{pet.emoji}</div>
              <p className={r.petName()}>{pet.name}</p>
            </div>
          ))}
        </div>
        {showViewAll && (
          <Button variant="ghost" className={r.viewAllButton()}>
            Ver todos os pets <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
