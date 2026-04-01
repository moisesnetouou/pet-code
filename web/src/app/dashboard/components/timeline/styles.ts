import { tv, type VariantProps } from 'tailwind-variants'
import type { AppointmentStatus } from '../../types'

export const timelineStyles = tv({
  slots: {
    container: 'border border-slate-200 shadow-sm',
    header: 'p-5 border-b border-slate-100',
    headerTitle: 'text-lg font-bold text-slate-800 flex items-center gap-2',
    headerIcon: 'w-5 h-5 text-teal-600',
    headerSubtitle: 'text-sm text-slate-500',
    headerAction: 'text-teal-600 hover:text-teal-700 hover:bg-teal-50',
    list: 'divide-y divide-slate-100',
    item: 'p-4 hover:bg-slate-50 transition-colors',
    itemTime: 'text-lg font-bold text-slate-800 w-16 text-center',
    itemAvatar: 'w-12 h-12 rounded-xl flex items-center justify-center text-xl',
    itemContent: 'flex-1 min-w-0',
    itemName: 'font-semibold text-slate-800',
    itemSubtitle: 'text-sm text-slate-500 truncate',
    itemBadge: 'px-3 py-1 rounded-lg text-xs',
    itemActions: 'flex items-center gap-3',
    confirmedButton: 'bg-teal-500 hover:bg-teal-600 text-white rounded-lg gap-1.5',
    cancelButton: 'border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 rounded-lg gap-1.5',
    confirmedBadge: 'flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg',
    confirmedBadgeIcon: 'w-4 h-4 text-emerald-600',
    confirmedBadgeText: 'text-sm font-medium text-emerald-700',
    canceledBadge: 'flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg',
    canceledBadgeIcon: 'w-4 h-4 text-slate-400',
    canceledBadgeText: 'text-sm font-medium text-slate-400',
  },
  variants: {
    status: {
      agendado: {},
      confirmado: { item: 'bg-emerald-50/50' },
      cancelado: { item: 'opacity-60' },
    },
  },
  defaultVariants: {
    status: 'agendado',
  },
})

export type TimelineVariants = VariantProps<typeof timelineStyles>
