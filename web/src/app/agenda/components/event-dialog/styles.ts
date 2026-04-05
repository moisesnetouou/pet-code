import { tv } from "tailwind-variants";

export const eventDialogStyles = tv({
  slots: {
    form: "space-y-4",
    field: "space-y-2",
    label: "text-sm font-medium text-slate-700",
    row: "grid grid-cols-2 gap-4",
    actions: "flex justify-end gap-3 mt-6",
  },
});
