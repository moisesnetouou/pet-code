"use client";

import { ArrowLeft, Save, User } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { Button, ImageUpload, Input, Select, PetSelect } from "@/components/base";
import { Header } from "../../dashboard/components/header";
import { Sidebar } from "../../dashboard/components/sidebar";
import { TutorDocumentCard } from "../components/tutor-document-card";
import { tutors as tutorsData } from "../data";
import type { Tutor, TutorStatus } from "../types";
import { pets as petData } from "@/app/pets/data";
import type { Pet } from "@/app/pets/types";

interface TutorDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function TutorDetailPage({ params }: TutorDetailPageProps) {
  const { id } = use(params);
  const tutorId = parseInt(id, 10);
  const initialTutor = tutorsData.find((t) => t.id === tutorId);

  if (!initialTutor) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Tutor não encontrado
          </h1>
          <Link href="/tutors">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Tutores
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <TutorDetailClient initialTutor={initialTutor} />;
}

function TutorDetailClient({ initialTutor }: { initialTutor: Tutor }) {
  const [tutor, setTutor] = useState<Tutor>(initialTutor);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedPetToAdd, setSelectedPetToAdd] = useState<Pet | null>(null);
  const [showAddPet, setShowAddPet] = useState(false);

  const allPets = petData;

  const statusOptions: TutorStatus[] = ["ativo", "inativo"];

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleAddPet = () => {
    if (selectedPetToAdd && !tutor.pets.includes(selectedPetToAdd.name)) {
      setTutor({ ...tutor, pets: [...tutor.pets, selectedPetToAdd.name] });
    }
    setSelectedPetToAdd(null);
    setShowAddPet(false);
  };

  const handleRemovePet = (petName: string) => {
    setTutor({ ...tutor, pets: tutor.pets.filter((p) => p !== petName) });
  };

  const unlinkedPets = allPets.filter((p) => !tutor.pets.includes(p.name));

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar currentPath="/tutors" />
      <div className="ml-64 transition-all duration-300">
        <Header greeting="Detalhes do Tutor" />
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/tutors"
              className="inline-flex items-center text-slate-600 hover:text-teal-600 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para listagem
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  <TutorDocumentCard tutor={tutor} />
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-800">
                    {isEditing ? "Editar Informações" : "Informações do Tutor"}
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
                    <div className="flex justify-center">
                      <ImageUpload
                        label="Foto de Perfil"
                        value={tutor.photoUrl ? `/uploads/tutors/${tutor.photoUrl}` : undefined}
                        onChange={(file) => {
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setTutor({ ...tutor, photoUrl: url });
                          }
                        }}
                        placeholder="Alterar foto"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Nome"
                        value={tutor.name}
                        onChange={(e) =>
                          setTutor({ ...tutor, name: e.target.value })
                        }
                      />
                      <Input
                        label="Telefone"
                        value={tutor.phone}
                        onChange={(e) =>
                          setTutor({ ...tutor, phone: e.target.value })
                        }
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={tutor.email}
                        onChange={(e) =>
                          setTutor({ ...tutor, email: e.target.value })
                        }
                      />
                      <Input
                        label="Cidade"
                        value={tutor.city}
                        onChange={(e) =>
                          setTutor({ ...tutor, city: e.target.value })
                        }
                      />
                      <Select
                        label="Status"
                        value={tutor.status}
                        onChange={(value) =>
                          setTutor({ ...tutor, status: value as TutorStatus })
                        }
                        options={statusOptions.map((s) => ({
                          value: s,
                          label: s === "ativo" ? "Ativo" : "Inativo",
                        }))}
                      />
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">
                        Endereço
                      </h3>
                      <Input
                        label="Endereço"
                        value={tutor.address}
                        onChange={(e) =>
                          setTutor({ ...tutor, address: e.target.value })
                        }
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setTutor(initialTutor);
                          setIsEditing(false);
                        }}
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
                        label="Telefone"
                        value={tutor.phone}
                      />
                      <InfoDisplay
                        label="Email"
                        value={tutor.email}
                      />
                      <InfoDisplay
                        label="Cidade"
                        value={tutor.city}
                      />
                      <InfoDisplay
                        label="Status"
                        value={tutor.status === "ativo" ? "Ativo" : "Inativo"}
                      />
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">
                        Endereço
                      </h3>
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <p className="text-slate-700">{tutor.address}</p>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-800">
                          Pets Vinculados
                        </h3>
                        {unlinkedPets.length > 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowAddPet(!showAddPet)}
                            className="text-sm"
                          >
                            {showAddPet ? "Cancelar" : "Adicionar Pet"}
                          </Button>
                        )}
                      </div>

                      {showAddPet && unlinkedPets.length > 0 && (
                        <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                          <p className="text-sm text-slate-600 mb-2">
                            Buscar pet para adicionar:
                          </p>
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <PetSelect
                                label=""
                                value={selectedPetToAdd?.name || ""}
                                onChange={(pet) => setSelectedPetToAdd(pet)}
                                placeholder="Buscar pet..."
                              />
                            </div>
                            {selectedPetToAdd && (
                              <Button
                                type="button"
                                onClick={handleAddPet}
                                className="self-end"
                              >
                                Adicionar
                              </Button>
                            )}
                          </div>
                        </div>
                      )}

                      {tutor.pets.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {tutor.pets.map((petName, index) => {
                            const linkedPet = allPets.find(
                              (p) => p.name === petName,
                            );
                            return (
                              <div
                                key={index}
                                className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-xl font-medium"
                              >
                                <Link
                                  href={`/pets/${linkedPet?.id || index + 1}`}
                                  className="flex items-center gap-2 px-2 py-1 hover:bg-amber-200 rounded-lg transition-colors"
                                >
                                  <span>{linkedPet?.emoji || "🐾"}</span>
                                  <span>{petName}</span>
                                </Link>
                                <button
                                  onClick={() => handleRemovePet(petName)}
                                  className="ml-1 px-1 text-amber-500 hover:text-red-600 hover:bg-amber-200 rounded transition-colors"
                                  title="Remover pet"
                                >
                                  ×
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-slate-500 italic">
                          Nenhum pet vinculado
                        </p>
                      )}
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">
                        Cadastro
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <InfoDisplay
                          label="Data de cadastro"
                          value={tutor.createdAt}
                        />
                        <InfoDisplay
                          label="ID"
                          value={`#${tutor.id.toString().padStart(4, "0")}`}
                        />
                      </div>
                    </div>
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