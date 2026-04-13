"use client";

import { ArrowLeft, Printer } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { Button } from "@/components/base";
import { Header } from "../../dashboard/components/header";
import { Sidebar } from "../../dashboard/components/sidebar";
import { RecordDetailCard } from "../components/record-detail-card";
import { RecordDialog } from "../components/record-dialog";
import { records as recordsData } from "../data";
import type { MedicalRecord } from "../types";

interface RecordDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function RecordDetailPage({ params }: RecordDetailPageProps) {
  const { id } = use(params);
  const recordId = parseInt(id, 10);
  const initialRecord = recordsData.find((r) => r.id === recordId);

  if (!initialRecord) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Prontuário não encontrado
          </h1>
          <Link href="/records">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Prontuários
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <RecordDetailClient initialRecord={initialRecord} />;
}

function RecordDetailClient({ initialRecord }: { initialRecord: MedicalRecord }) {
  const [record, setRecord] = useState<MedicalRecord>(initialRecord);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSave = (recordData: Omit<MedicalRecord, "id">) => {
    setRecord({ ...recordData, id: record.id });
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar currentPath="/records" />
      <div className="ml-64 transition-all duration-300">
        <Header greeting="Detalhes do Prontuário" />
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/records"
              className="inline-flex items-center text-slate-600 hover:text-teal-600 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para listagem
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  <RecordDetailCard record={record} />
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-800">
                    Informações do Atendimento
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handlePrint}>
                      <Printer className="w-4 h-4 mr-2" />
                      Imprimir
                    </Button>
                    <Button onClick={() => setDialogOpen(true)}>
                      Editar
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <InfoDisplay label="Data" value={record.date} />
                    <InfoDisplay label="Tipo" value={record.type} />
                    <InfoDisplay
                      label="Veterinário"
                      value={record.veterinarian}
                    />
                    <InfoDisplay
                      label="Status"
                      value={record.status === "concluído" ? "Concluído" : "Pendente"}
                    />
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                      Diagnóstico
                    </h3>
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <p className="text-amber-800">
                        {record.diagnosis || "Sem diagnóstico registrado"}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                      Observações
                    </h3>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-slate-700">
                        {record.notes || "Sem observações registradas"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <RecordDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        record={record}
        onSave={handleSave}
      />
    </div>
  );
}

function InfoDisplay({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 bg-slate-50 rounded-xl">
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <p className="font-medium text-slate-800">{value}</p>
    </div>
  );
}