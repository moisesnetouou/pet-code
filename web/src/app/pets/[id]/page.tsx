"use client";

import { ArrowLeft, Save, User } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { Button, ImageUpload, Input, Label, Select } from "@/components/base";
import { Header } from "../../dashboard/components/header";
import { Sidebar } from "../../dashboard/components/sidebar";
import { PetDocumentCard } from "../components/pet-document-card";
import { pets as petsData } from "../data";
import type { Pet, PetStatus, PetType } from "../types";

interface PetDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PetDetailPage({ params }: PetDetailPageProps) {
  const { id } = use(params);
  const petId = parseInt(id);
  const initialPet = petsData.find((p) => p.id === petId);

  if (!initialPet) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Pet não encontrado
          </h1>
          <Link href="/pets">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Pets
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <PetDetailClient initialPet={initialPet} />;
}

function PetDetailClient({ initialPet }: { initialPet: Pet }) {
  const [pet, setPet] = useState<Pet>(initialPet);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const petTypes: PetType[] = [
    "Cachorro",
    "Gato",
    "Pássaro",
    "Peixe",
    "Coelho",
    "Jabuti",
    "Outro",
  ];
  const statusOptions: PetStatus[] = ["ativo", "inativo"];

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar currentPath="/pets" />
      <div className="ml-64 transition-all duration-300">
        <Header greeting="Detalhes do Pet" />
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/pets"
              className="inline-flex items-center text-slate-600 hover:text-teal-600 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para listagem
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  <PetDocumentCard pet={pet} />
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-800">
                    {isEditing ? "Editar Informações" : "Informações do Pet"}
                  </h2>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                    >
                      Editar
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Nome"
                        value={pet.name}
                        onChange={(e) =>
                          setPet({ ...pet, name: e.target.value })
                        }
                      />
                      <Select
                        label="Espécie"
                        value={pet.type}
                        onChange={(value) =>
                          setPet({ ...pet, type: value as PetType })
                        }
                        options={petTypes.map((t) => ({ value: t, label: t }))}
                      />
                      <Input
                        label="Raça"
                        value={pet.breed}
                        onChange={(e) =>
                          setPet({ ...pet, breed: e.target.value })
                        }
                      />
                      <Input
                        label="Data de Nascimento"
                        value={pet.birthDate || ""}
                        onChange={(e) =>
                          setPet({ ...pet, birthDate: e.target.value })
                        }
                        placeholder="DD/MM/AAAA"
                      />
                      <Input
                        label="Idade"
                        value={pet.age}
                        onChange={(e) =>
                          setPet({ ...pet, age: e.target.value })
                        }
                      />
                      <Input
                        label="Peso"
                        value={pet.weight}
                        onChange={(e) =>
                          setPet({ ...pet, weight: e.target.value })
                        }
                      />
                      <Select
                        label="Status"
                        value={pet.status}
                        onChange={(value) =>
                          setPet({ ...pet, status: value as PetStatus })
                        }
                        options={statusOptions.map((s) => ({
                          value: s,
                          label: s === "ativo" ? "Ativo" : "Inativo",
                        }))}
                      />
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">
                        Informações do Tutor
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Nome do Tutor"
                          value={pet.tutor}
                          onChange={(e) =>
                            setPet({ ...pet, tutor: e.target.value })
                          }
                        />
                        <Input
                          label="Telefone do Tutor"
                          value={pet.tutorPhone}
                          onChange={(e) =>
                            setPet({ ...pet, tutorPhone: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">
                        Foto do Pet
                      </h3>
                      <div className="flex items-center gap-4">
                        <ImageUpload
                          label="Foto"
                          value={pet.photoUrl}
                          onChange={async (file) => {
                            if (!file) {
                              setPet({ ...pet, photoUrl: "" });
                              return;
                            }
                            try {
                              const formData = new FormData();
                              formData.append("file", file);
                              const res = await fetch(
                                `/api/pets/${pet.id}/photo`,
                                {
                                  method: "POST",
                                  body: formData,
                                },
                              );
                              const data = await res.json();
                              if (data.photoUrl) {
                                setPet({ ...pet, photoUrl: data.photoUrl });
                              }
                            } catch (error) {
                              console.error("Upload failed:", error);
                            }
                          }}
                          onRemove={async () => {
                            const extension =
                              pet.photoUrl?.split(".").pop() || "jpg";
                            try {
                              await fetch(
                                `/api/pets/${pet.id}/photo?ext=${extension}`,
                                { method: "DELETE" },
                              );
                              setPet({ ...pet, photoUrl: "" });
                            } catch (error) {
                              console.error("Remove failed:", error);
                            }
                          }}
                          placeholder="JPG, PNG ou WebP - máx 5MB"
                        />
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">
                        Outras Informações
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Última Visita"
                          value={pet.lastVisit || ""}
                          onChange={(e) =>
                            setPet({ ...pet, lastVisit: e.target.value })
                          }
                        />
                        <Input
                          label="Próxima Visita"
                          value={pet.nextVisit || ""}
                          onChange={(e) =>
                            setPet({ ...pet, nextVisit: e.target.value })
                          }
                        />
                      </div>
                      <div className="mt-4">
                        <Label className="text-sm font-medium text-slate-700 mb-1.5">
                          Observações
                        </Label>
                        <textarea
                          value={pet.notes || ""}
                          onChange={(e) =>
                            setPet({ ...pet, notes: e.target.value })
                          }
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-teal-300 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:outline-2 focus:outline-teal-500"
                          placeholder="Observações sobre o pet..."
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancelar
                      </Button>
                      <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? (
                          "Salvando..."
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Salvar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <InfoDisplay
                        label="Nascimento"
                        value={pet.birthDate || "Não informado"}
                      />
                      <InfoDisplay label="Idade" value={pet.age} />
                      <InfoDisplay label="Espécie" value={pet.type} />
                      <InfoDisplay label="Raça" value={pet.breed} />
                      <InfoDisplay label="Peso" value={pet.weight} />
                      <InfoDisplay
                        label="Status"
                        value={pet.status === "ativo" ? "Ativo" : "Inativo"}
                      />
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">
                        Informações do Tutor
                      </h3>
                      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">
                            {pet.tutor}
                          </p>
                          <p className="text-sm text-slate-500">
                            {pet.tutorPhone}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">
                        Histórico
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <InfoDisplay
                          label="Última Visita"
                          value={pet.lastVisit || "Não registrado"}
                        />
                        <InfoDisplay
                          label="Próxima Visita"
                          value={pet.nextVisit || "Não agendada"}
                        />
                      </div>
                    </div>

                    {pet.notes && (
                      <div className="border-t border-slate-200 pt-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">
                          Observações
                        </h3>
                        <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                          <p className="text-teal-800">{pet.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
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
