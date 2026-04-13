"use client";

import { Building2, Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/base/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/base/dialog";
import { Input } from "@/components/base/input";
import { Label } from "@/components/base/label";
import { clinicInfoStyles } from "./styles";
import type { ClinicInfoProps } from "./types";

export function ClinicInfo({ clinic: initialClinic }: ClinicInfoProps) {
  const c = clinicInfoStyles();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [clinic, _setClinic] = useState(initialClinic);

  const handleSave = () => {
    console.log("Saving clinic:", clinic);
    setShowEditDialog(false);
  };

  return (
    <>
      <div className={c.container()}>
        <div className={c.header()}>
          <h3 className={c.title()}>
            <Building2 className={c.titleIcon()} />
            Dados da Clínica
          </h3>
          <button
            onClick={() => setShowEditDialog(true)}
            className={c.editButton()}
            title="Editar"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>

        <div className={c.content()}>
          <div className={c.field()}>
            <p className={c.fieldLabel()}>Nome</p>
            <p className={c.fieldValue()}>{clinic.name}</p>
          </div>

          <div className={c.field()}>
            <p className={c.fieldLabel()}>CNPJ</p>
            <p className={c.fieldValue()}>{clinic.cnpj}</p>
          </div>

          <div className={c.field()}>
            <p className={c.fieldLabel()}>Telefone</p>
            <p className={c.fieldValue()}>{clinic.phone}</p>
          </div>

          <div className={c.field()}>
            <p className={c.fieldLabel()}>Email</p>
            <p className={c.fieldValue()}>{clinic.email}</p>
          </div>

          <div className={c.field()}>
            <p className={c.fieldLabel()}>Cidade</p>
            <p className={c.fieldValue()}>
              {clinic.city} - {clinic.state}
            </p>
          </div>

          <div className={c.field()}>
            <p className={c.fieldLabel()}>CEP</p>
            <p className={c.fieldValue()}>{clinic.cep}</p>
          </div>

          <div className={`${c.field()} ${c.address()}`}>
            <p className={c.fieldLabel()}>Endereço</p>
            <p className={c.fieldValue()}>{clinic.address}</p>
          </div>
        </div>
      </div>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Dados da Clínica</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Nome da Clínica
              </Label>
              <Input defaultValue={clinic.name} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">CNPJ</Label>
              <Input defaultValue={clinic.cnpj} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Telefone
                </Label>
                <Input defaultValue={clinic.phone} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  CEP
                </Label>
                <Input defaultValue={clinic.cep} />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Email
              </Label>
              <Input defaultValue={clinic.email} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Endereço
              </Label>
              <Input defaultValue={clinic.address} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Cidade
                </Label>
                <Input defaultValue={clinic.city} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Estado
                </Label>
                <Input defaultValue={clinic.state} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
