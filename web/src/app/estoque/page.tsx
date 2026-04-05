"use client";

import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Header } from "../dashboard/components/header";
import { Sidebar } from "../dashboard/components/sidebar";
import { greeting } from "../dashboard/utils/greeting";
import { Filters } from "./components/filters";
import { StatsCards } from "./components/stats-cards";
import { StockDialog } from "./components/stock-dialog";
import { StockGrid } from "./components/stock-list";
import { stats as initialStats, stockItems } from "./data";
import type { FilterOptions, StockItem } from "./types";

export default function EstoquePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    type: "all",
    showLowStock: false,
    sortBy: "name",
  });
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [items, setItems] = useState(stockItems);
  const [stats, setStats] = useState(initialStats);

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search),
      );
    }

    if (filters.type !== "all") {
      result = result.filter((item) => item.type === filters.type);
    }

    if (filters.showLowStock) {
      result = result.filter((item) => item.quantity <= item.minQuantity);
    }

    switch (filters.sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "quantity":
        result.sort((a, b) => a.quantity - b.quantity);
        break;
      case "updated":
        result.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
        break;
    }

    return result;
  }, [items, filters]);

  const updateStats = (newItems: StockItem[]) => {
    setStats({
      total: newItems.length,
      lowStock: newItems.filter(
        (i) => i.quantity <= i.minQuantity && i.quantity > 0,
      ).length,
      outOfStock: newItems.filter((i) => i.quantity === 0).length,
      normal: newItems.filter((i) => i.quantity > i.minQuantity).length,
    });
  };

  const handleItemClick = (item: StockItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleAddNew = () => {
    setSelectedItem(null);
    setDialogOpen(true);
  };

  const handleSave = (
    itemData: Omit<StockItem, "id" | "clinicId" | "lastUpdated">,
  ) => {
    let newItems: StockItem[];

    if (selectedItem) {
      newItems = items.map((i) =>
        i.id === selectedItem.id
          ? {
              ...i,
              ...itemData,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : i,
      );
    } else {
      const newId = Math.max(...items.map((i) => i.id), 0) + 1;
      newItems = [
        ...items,
        {
          ...itemData,
          id: newId,
          clinicId: 1,
          lastUpdated: new Date().toISOString().split("T")[0],
        },
      ];
    }

    setItems(newItems);
    updateStats(newItems);
  };

  const handleDelete = (id: number) => {
    const newItems = items.filter((i) => i.id !== id);
    setItems(newItems);
    updateStats(newItems);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onToggle={setSidebarOpen} />
      <div
        className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}
      >
        <Header greeting={greeting()} />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Estoque</h1>
                <p className="text-slate-600 mt-1">
                  Gerencie os itens do estoque da clínica
                </p>
              </div>
              <button
                onClick={handleAddNew}
                className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                Novo Item
              </button>
            </div>

            {/* Stats */}
            <StatsCards stats={stats} />

            {/* Filters */}
            <Filters
              options={filters}
              onChange={setFilters}
              totalResults={filteredItems.length}
            />

            {/* Stock Grid */}
            <StockGrid items={filteredItems} onItemClick={handleItemClick} />
          </div>
        </main>
      </div>

      <StockDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={selectedItem}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
