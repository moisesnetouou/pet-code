"use client";

import { StatusBadge } from "../badge";
import { tutorCardStyles } from "./styles";
import type { TutorCardProps, TutorStatus } from "./types";

const TutorCard = ({
  name,
  pets,
  status,
  onClick,
  className,
}: TutorCardProps) => {
  const s = tutorCardStyles({ status });

  return (
    <div className={s.container()} onClick={onClick}>
      <div className={s.header()}>
        <div className={s.avatarContainer()}>
          <span className={s.avatarInitials()}>
            {name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </span>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className={s.content()}>
        <h3 className={s.name()}>{name}</h3>
      </div>

      {pets && pets.length > 0 && (
        <div className={s.petsSection()}>
          <p className={s.petsLabel()}>Pets ({pets.length})</p>
          <div className="flex flex-wrap gap-2">
            {pets.map((pet, index) => (
              <span key={index} className={s.petTag()}>
                {pet}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export type { TutorCardProps, TutorStatus };
export { TutorCard };
