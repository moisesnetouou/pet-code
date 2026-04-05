"use client";

import { FilterBar } from "@/components/base";
import { recordTypes } from "../../data";
import type { FiltersProps } from "./types";

export function Filters({ options, onChange, totalResults = 0 }: FiltersProps) {
  return (
    <FilterBar
      searchPlaceholder="Buscar por pet ou tutor..."
      searchValue={options.search}
      onSearchChange={(value) => onChange({ ...options, search: value })}
      filters={[
        {
          label: "Tipo",
          options: [
            { value: "all", label: "Todos os tipos" },
            ...recordTypes.map((type) => ({ value: type, label: type })),
          ],
          value: options.type,
          onChange: (value) =>
            onChange({ ...options, type: value as typeof options.type }),
        },
        {
          label: "Status",
          options: [
            { value: "all", label: "Todos os status" },
            { value: "concluído", label: "Concluído" },
            { value: "pendente", label: "Pendente" },
          ],
          value: options.status,
          onChange: (value) =>
            onChange({ ...options, status: value as typeof options.status }),
        },
      ]}
      sortBy={{
        label: "Ordenar",
        options: [
          { value: "date", label: "Mais recentes" },
          { value: "pet", label: "Por pet" },
          { value: "type", label: "Por tipo" },
        ],
        value: options.sortBy,
        onChange: (value) =>
          onChange({ ...options, sortBy: value as typeof options.sortBy }),
      }}
      totalResults={totalResults}
      resultLabel="prontuário"
    />
  );
}
