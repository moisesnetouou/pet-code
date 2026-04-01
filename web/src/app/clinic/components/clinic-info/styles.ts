import { tv } from 'tailwind-variants'

export const clinicInfoStyles = tv({
  slots: {
    container: 'bg-white rounded-2xl border border-slate-200 shadow-sm p-6',
    header: 'flex items-center justify-between mb-6',
    title: 'text-lg font-bold text-slate-800 flex items-center gap-2',
    titleIcon: 'w-5 h-5 text-teal-600',
    editButton: 'text-slate-500 hover:text-teal-600 hover:bg-teal-50 p-2 rounded-lg transition-colors',
    content: 'grid grid-cols-1 md:grid-cols-2 gap-4',
    field: 'space-y-1',
    fieldLabel: 'text-xs font-medium text-slate-600 uppercase tracking-wide',
    fieldValue: 'text-sm font-medium text-slate-800',
    address: 'md:col-span-2',
  },
})
