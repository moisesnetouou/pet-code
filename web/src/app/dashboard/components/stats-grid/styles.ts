import { tv, type VariantProps } from 'tailwind-variants'

export const statsGridStyles = tv({
  slots: {
    container: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8',
    card: 'border border-slate-200 shadow-sm hover:shadow-md transition-shadow',
    cardContent: 'p-5',
    icon: 'text-2xl',
    value: 'text-2xl font-bold text-slate-800',
    label: 'text-sm font-medium text-slate-600 mt-1',
    subtext: 'text-xs text-slate-400 mt-1',
  },
})

export type StatsGridVariants = VariantProps<typeof statsGridStyles>
