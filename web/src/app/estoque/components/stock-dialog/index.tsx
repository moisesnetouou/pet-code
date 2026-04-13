"use client";

import { useState } from "react";
import { Button } from "@/components/base/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/base/dialog";
import { Input } from "@/components/base/input";
import { Label } from "@/components/base/label";
import { Select } from "@/components/base/select";
import type { StockItem, StockType } from "../../types";
import { stockTypeLabels } from "../../types";
import { stockDialogStyles } from "./styles";

interface StockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: StockItem | null;
  onSave: (item: Omit<StockItem, "id" | "clinicId" | "lastUpdated">) => void;
  onDelete?: (id: number) => void;
}

interface FormData {
  name: string;
  description: string;
  imageUrl: string;
  quantity: string;
  unit: string;
  minQuantity: string;
  type: StockType;
}

const stockTypes: StockType[] = [
  "MEDICAMENTO",
  "RACAO",
  "BRINQUEDO",
  "VACINA",
  "MATERIAL",
  "OUTRO",
];

const getInitialFormData = (): FormData => ({
  name: "",
  description: "",
  imageUrl: "",
  quantity: "",
  unit: "",
  minQuantity: "",
  type: "OUTRO",
});

export function StockDialog({
  open,
  onOpenChange,
  item,
  onSave,
  onDelete,
}: StockDialogProps) {
  const s = stockDialogStyles();
  const [formData, setFormData] = useState<FormData>(getInitialFormData());

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFormData(getInitialFormData());
    }
    onOpenChange(isOpen);
  };

  const handleSubmit = () => {
    const defaultImages: Record<StockType, string> = {
      MEDICAMENTO:
        "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=400&fit=crop",
      RACAO:
        "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop",
      BRINQUEDO:
        "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400&h=400&fit=crop",
      VACINA:
        "https://images.unsplash.com/photo-1584308666744-24a5c6f2302f?w=400&h=400&fit=crop",
      MATERIAL:
        "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop",
      OUTRO:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
    };

    onSave({
      name: formData.name,
      description: formData.description,
      imageUrl: formData.imageUrl || defaultImages[formData.type],
      quantity: parseInt(formData.quantity, 10) || 0,
      unit: formData.unit,
      minQuantity: parseInt(formData.minQuantity, 10) || 0,
      type: formData.type,
    });
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (item && onDelete) {
      onDelete(item.id);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-slate-800">
            {item ? "Editar Item" : "Novo Item"}
          </DialogTitle>
        </DialogHeader>

        <div className={s.form()}>
          <div className={s.field()}>
            <Label htmlFor="name" className={s.label()}>
              Nome
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ex: Vacina V10"
              className="bg-white border-slate-200 text-slate-800"
            />
          </div>

          <div className={s.field()}>
            <Label htmlFor="description" className={s.label()}>
              Descrição
            </Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Ex: Vacina polivalente para cães"
              className="bg-white border-slate-200 text-slate-800"
            />
          </div>

          <div className={s.field()}>
            <Label htmlFor="imageUrl" className={s.label()}>
              URL da Imagem
            </Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              placeholder="https://exemplo.com/imagem.jpg"
              className="bg-white border-slate-200 text-slate-800"
            />
          </div>

          <div className={s.field()}>
            <Label htmlFor="type" className={s.label()}>
              Tipo
            </Label>
            <Select
              options={stockTypes.map((type) => ({
                value: type,
                label: stockTypeLabels[type],
              }))}
              value={formData.type}
              onChange={(value) =>
                setFormData({ ...formData, type: value as StockType })
              }
            />
          </div>

          <div className={s.row()}>
            <div className={s.field()}>
              <Label htmlFor="quantity" className={s.label()}>
                Quantidade
              </Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                placeholder="0"
                className="bg-white border-slate-200 text-slate-800"
              />
            </div>
            <div className={s.field()}>
              <Label htmlFor="unit" className={s.label()}>
                Unidade
              </Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                placeholder="Ex: doses, ml, kg"
                className="bg-white border-slate-200 text-slate-800"
              />
            </div>
          </div>

          <div className={s.field()}>
            <Label htmlFor="minQuantity" className={s.label()}>
              Quantidade Mínima
            </Label>
            <Input
              id="minQuantity"
              type="number"
              value={formData.minQuantity}
              onChange={(e) =>
                setFormData({ ...formData, minQuantity: e.target.value })
              }
              placeholder="10"
              className="bg-white border-slate-200 text-slate-800"
            />
          </div>
        </div>

        <DialogFooter>
          {item && onDelete && (
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              className="mr-auto bg-red-500 hover:bg-red-600 text-white"
            >
              Excluir
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
