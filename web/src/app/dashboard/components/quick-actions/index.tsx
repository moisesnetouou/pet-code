"use client";

import { CalendarPlus, ClipboardList, PawPrint, Users } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/base/card";
import { quickActions as defaultActions } from "../../data";
import { quickActionsStyles } from "./styles";
import type { QuickActionsProps } from "./types";

const iconComponents: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  pet: PawPrint,
  appointment: CalendarPlus,
  tutor: Users,
  record: ClipboardList,
};

const actionHrefs: Record<string, string> = {
  appointment: "/agenda",
  tutor: "/tutors",
  record: "/records",
};

export function QuickActions({
  actions = defaultActions,
  onOpenPetDialog,
  onOpenTutorDialog,
  onOpenRecordDialog,
}: QuickActionsProps) {
  const q = quickActionsStyles();

  const handlePetClick = () => {
    onOpenPetDialog?.();
  };

  const handleTutorClick = () => {
    onOpenTutorDialog?.();
  };

  const handleRecordClick = () => {
    onOpenRecordDialog?.();
  };

  return (
    <Card className={q.container()}>
      <CardContent className={q.content()}>
        <h3 className={q.title()}>Ações rápidas</h3>
        <div className={q.grid()}>
          {actions.map((action) => {
            const Icon = iconComponents[action.id] || PawPrint;
            const iconClass =
              action.id === "pet"
                ? q.iconContainerBlue()
                : action.id === "appointment"
                  ? q.iconContainerViolet()
                  : action.id === "tutor"
                    ? q.iconContainerEmerald()
                    : q.iconContainerRose();

            if (action.id === "pet") {
              return (
                <button
                  key={action.id}
                  onClick={handlePetClick}
                  className={q.actionButton()}
                >
                  <div className={iconClass}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className={q.label()}>{action.label}</p>
                  <p className={q.description()}>{action.description}</p>
                </button>
              );
            }

            if (action.id === "tutor") {
              return (
                <button
                  key={action.id}
                  onClick={handleTutorClick}
                  className={q.actionButton()}
                >
                  <div className={iconClass}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className={q.label()}>{action.label}</p>
                  <p className={q.description()}>{action.description}</p>
                </button>
              );
            }

            if (action.id === "record") {
              return (
                <button
                  key={action.id}
                  onClick={handleRecordClick}
                  className={q.actionButton()}
                >
                  <div className={iconClass}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className={q.label()}>{action.label}</p>
                  <p className={q.description()}>{action.description}</p>
                </button>
              );
            }

            const href = actionHrefs[action.id] || "/pets";
            return (
              <Link key={action.id} href={href} className={q.actionButton()}>
                <div className={iconClass}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className={q.label()}>{action.label}</p>
                <p className={q.description()}>{action.description}</p>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
