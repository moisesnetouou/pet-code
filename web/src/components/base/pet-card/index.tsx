"use client";

import { Calendar, User, Weight } from "lucide-react";
import { StatusBadge } from "../badge";
import { PetAvatar } from "../pet-avatar";
import { petCardStyles } from "./styles";
import type { PetCardProps, PetStatus } from "./types";

const PetCard = ({
  name,
  breed,
  age,
  weight,
  tutor,
  status,
  type,
  lastVisit,
  emoji,
  photoUrl,
  onClick,
  className,
}: PetCardProps) => {
  const s = petCardStyles({ status });

  return (
    <div className={s.container()} onClick={onClick}>
      <div className={s.header()}>
        <PetAvatar
          photoUrl={photoUrl}
          emoji={emoji}
          type={type}
          name={name}
          size="md"
        />
        <StatusBadge status={status} />
      </div>

      <div className={s.content()}>
        <h3 className={s.name()}>{name}</h3>
        <p className={s.breed()}>{breed}</p>

        <div className={s.infoRow()}>
          <Calendar className={s.infoIcon()} />
          <span>{age}</span>
        </div>

        <div className={s.infoRow()}>
          <Weight className={s.infoIcon()} />
          <span>{weight}</span>
        </div>
      </div>

      <div className={s.tutorSection()}>
        <p className={s.tutorLabel()}>Tutor responsável</p>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-slate-500" />
          <span className={s.tutorName()}>{tutor}</span>
        </div>
      </div>

      <div className={s.infoRow()}>
        <Calendar className={s.infoIcon()} />
        <span className="text-xs text-slate-600">
          {lastVisit ? `Última visita: ${lastVisit}` : "Sem visitas registradas"}
        </span>
      </div>
    </div>
  );
};

export type { PetCardProps, PetStatus };
export { PetCard };
