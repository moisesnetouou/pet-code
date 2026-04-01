import { tv } from 'tailwind-variants'

export const quickActionsStyles = tv({
  slots: {
    container: 'border border-slate-200 shadow-sm',
    content: 'p-5',
    title: 'font-bold text-slate-800 mb-4',
    grid: 'grid grid-cols-2 sm:grid-cols-4 gap-3',
    actionButton: 'p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all group text-left',
    iconContainerBlue: 'w-10 h-10 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform bg-blue-100 text-blue-600',
    iconContainerViolet: 'w-10 h-10 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform bg-violet-100 text-violet-600',
    iconContainerEmerald: 'w-10 h-10 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform bg-emerald-100 text-emerald-600',
    iconContainerRose: 'w-10 h-10 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform bg-rose-100 text-rose-600',
    label: 'font-semibold text-slate-800 text-sm',
    description: 'text-xs text-slate-500',
  },
})

export type QuickActionsVariants = ReturnType<typeof quickActionsStyles>
