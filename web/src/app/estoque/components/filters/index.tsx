import { Switch } from "@/components/ui/switch";
import { FilterBar } from "@/components/base";
import type { FilterOptions, StockType } from "../../types";
import { stockTypeLabels } from "../../types";

interface FiltersProps {
  options: FilterOptions;
  onChange: (options: FilterOptions) => void;
  totalResults: number;
}

const typeOptions: (StockType | "all")[] = [
  "all",
  "MEDICAMENTO",
  "RACAO",
  "BRINQUEDO",
  "VACINA",
  "MATERIAL",
  "OUTRO",
];

export function Filters({ options, onChange, totalResults }: FiltersProps) {
  return (
    <FilterBar
      searchPlaceholder="Buscar item..."
      searchValue={options.search}
      onSearchChange={(value) => onChange({ ...options, search: value })}
      filters={[
        {
          label: "Tipo",
          options: typeOptions.map((type) => ({
            value: type,
            label:
              type === "all"
                ? "Todos os tipos"
                : stockTypeLabels[type as StockType],
          })),
          value: options.type,
          onChange: (value) =>
            onChange({ ...options, type: value as StockType | "all" }),
        },
      ]}
      sortBy={{
        label: "Ordenar",
        options: [
          { value: "name", label: "Nome" },
          { value: "quantity", label: "Quantidade" },
          { value: "updated", label: "Atualização" },
        ],
        value: options.sortBy,
        onChange: (value) =>
          onChange({
            ...options,
            sortBy: value as FilterOptions["sortBy"],
          }),
      }}
      actions={
        <div className="flex items-center gap-2">
          <Switch
            checked={options.showLowStock}
            onCheckedChange={(checked) =>
              onChange({ ...options, showLowStock: checked })
            }
          />
          <span className="text-sm text-slate-600 whitespace-nowrap">
            Estoque baixo
          </span>
        </div>
      }
      totalResults={totalResults}
      resultLabel="item"
    />
  );
}
