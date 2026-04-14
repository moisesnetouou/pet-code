"use client";

import { CalendarPlus, UserPlus } from "lucide-react";
import { Button } from "@/components/base/button";
import { cn } from "@/lib/utils";
import { headerStyles } from "./styles";
import type { HeaderProps } from "./types";

export function Header({
  greeting = "Admin! 👋",
  date,
  action1Label,
  action2Label,
  onAction1,
  onAction2,
}: HeaderProps) {
  const h = headerStyles();

  return (
    <header className={h.container()}>
      <div className={h.greetingContainer()}>
        <div>
          <h1 className={h.greetingTitle()}>{greeting}</h1>
          {date && <p className={h.greetingDate()}>{date}</p>}
        </div>
      </div>

      <div className={h.actionsContainer()}>
        {onAction1 && action1Label && (
          <Button
            variant="outline"
            onClick={onAction1}
            className={cn(
              h.actionButton(),
              "border-slate-300 text-slate-700 hover:bg-slate-100",
            )}
          >
            <UserPlus className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">{action1Label}</span>
          </Button>
        )}

        {onAction2 && action2Label && (
          <Button
            onClick={onAction2}
            className={cn(
              h.actionButton(),
              "bg-teal-500 hover:bg-teal-600 text-white",
            )}
          >
            <CalendarPlus className="w-4 h-4" />
            <span className="hidden sm:inline">{action2Label}</span>
          </Button>
        )}
      </div>
    </header>
  );
}
