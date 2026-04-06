"use client";

import { Card, CardContent } from "@/components/base/card";
import { stats } from "../../data";
import { statsGridStyles } from "./styles";
import type { StatsGridProps } from "./types";

export function StatsGrid({ stats: statsData = stats }: StatsGridProps) {
  const s = statsGridStyles();

  return (
    <div className={s.container()}>
      {statsData.map((stat, i) => (
        <Card key={i} className={s.card()}>
          <CardContent className={s.cardContent()}>
            <span className={s.icon()}>{stat.icon}</span>
            <p className={s.value()}>{stat.value}</p>
            <p className={s.label()}>{stat.label}</p>
            <p className={s.subtext()}>{stat.subtext}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
