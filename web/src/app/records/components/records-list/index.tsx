"use client";

import { FileText } from "lucide-react";
import { RecordCard } from "../record-card";
import { recordsListStyles } from "./styles";
import type { RecordsListProps } from "./types";

export function RecordsList({ records }: RecordsListProps) {
  const r = recordsListStyles();

  if (records.length === 0) {
    return (
      <div className={r.empty()}>
        <FileText className={r.emptyIcon()} />
        <h3 className={r.emptyTitle()}>Nenhum prontuário encontrado</h3>
        <p className={r.emptyDescription()}>
          Tente ajustar os filtros ou cadastrar um novo atendimento
        </p>
      </div>
    );
  }

  return (
    <div className={r.container()}>
      {records.map((record) => (
        <RecordCard key={record.id} record={record} />
      ))}
    </div>
  );
}
