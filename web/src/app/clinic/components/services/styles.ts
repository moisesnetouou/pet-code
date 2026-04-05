import { tv } from "tailwind-variants";

export const servicesStyles = tv({
  slots: {
    container: "bg-white rounded-2xl border border-slate-200 shadow-sm p-6",
    header: "flex items-center justify-between mb-6",
    title: "text-lg font-bold text-slate-800 flex items-center gap-2",
    titleIcon: "w-5 h-5 text-teal-600",
    addButton:
      "text-teal-600 hover:text-teal-700 hover:bg-teal-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
    grid: "grid grid-cols-1 md:grid-cols-2 gap-4",
    serviceCard: "bg-slate-50 rounded-xl p-4 border border-slate-200",
    serviceHeader: "flex items-center justify-between mb-2",
    serviceName: "text-base font-semibold text-slate-800",
    serviceDescription: "text-sm text-slate-700 mb-3",
    serviceDetails: "flex items-center gap-4 text-sm",
    servicePrice: "font-semibold text-teal-700",
    serviceDuration: "text-slate-600",
  },
});
