"use client";

import { Calendar, User, Stethoscope } from "lucide-react";
import type { MedicalRecord, MedicalRecordStatus } from "../../types";

interface RecordDetailCardProps {
  record: MedicalRecord;
}

const typeConfig: Record<string, { bg: string; text: string; icon: string }> = {
  Consulta: { bg: "bg-violet-100", text: "text-violet-700", icon: "💜" },
  Vacinação: { bg: "bg-blue-100", text: "text-blue-700", icon: "💉" },
  Cirurgia: { bg: "bg-red-100", text: "text-red-700", icon: "🔪" },
  "Check-up": { bg: "bg-emerald-100", text: "text-emerald-700", icon: "✅" },
  Exame: { bg: "bg-amber-100", text: "text-amber-700", icon: "🔬" },
};

const statusConfig: Record<MedicalRecordStatus, { bg: string; text: string; label: string }> = {
  concluído: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Concluído" },
  pendente: { bg: "bg-amber-100", text: "text-amber-700", label: "Pendente" },
};

export function RecordDetailCard({ record }: RecordDetailCardProps) {
  const typeStyle = typeConfig[record.type] || typeConfig["Consulta"];
  const statusStyle = statusConfig[record.status];

  return (
    <div className="relative w-full bg-white rounded-3xl border-2 border-slate-100 shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-white to-rose-50/50" />

      <div className="relative p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm bg-white">
              {record.petEmoji}
            </div>
            <div>
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider">
                Prontuário ID
              </p>
              <p className="font-bold text-slate-800 text-lg">
                #{record.id.toString().padStart(4, "0")}
              </p>
            </div>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-sm font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
            {statusStyle.label}
          </div>
        </div>

        <div className="border-t border-b border-slate-100 py-4 space-y-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-800">{record.petName}</p>
            <p className="text-sm text-slate-500">{record.petType}</p>
          </div>
          <DocumentRow
            icon={<User className="w-4 h-4" />}
            label="Tutor"
            value={record.tutor}
          />

          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${typeStyle.bg} ${typeStyle.text}`}>
            <span>{typeStyle.icon}</span>
            <span className="font-semibold">{record.type}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <DocumentRow
              icon={<Calendar className="w-4 h-4" />}
              label="Data"
              value={record.date}
            />
            <DocumentRow
              icon={<Stethoscope className="w-4 h-4" />}
              label="Veterinário"
              value={record.veterinarian}
            />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Tutor responsável
          </p>
          <div className="p-4 bg-gradient-to-r from-violet-50 to-rose-50 rounded-xl border border-violet-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {record.tutor.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-slate-800">{record.tutor}</p>
              </div>
            </div>
          </div>
        </div>

        {record.diagnosis && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Diagnóstico
            </p>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-amber-800">{record.diagnosis}</p>
            </div>
          </div>
        )}

        {record.notes && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Observações
            </p>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-slate-700">{record.notes}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center pt-2">
          <p className="text-xs text-slate-400 font-mono">
            PETCODE-RECORD-{new Date().getFullYear()}-{record.id.toString().padStart(6, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}

function DocumentRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-400">{icon}</span>
      <span className="text-sm text-slate-500">{label}</span>
      <span className="ml-auto font-medium text-slate-800">{value}</span>
    </div>
  );
}