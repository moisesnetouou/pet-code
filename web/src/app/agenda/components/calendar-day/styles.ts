import { tv } from 'tailwind-variants'

export const calendarDayStyles = tv({
  slots: {
    container: 'min-h-[100px] p-2 border-r border-b border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors',
    header: 'text-sm font-medium text-slate-600 mb-1',
    events: 'flex flex-col gap-1',
    today: 'bg-teal-50',
    otherMonth: 'bg-slate-50 text-slate-400',
  },
  variants: {
    isToday: {
      true: { container: 'bg-teal-50 border-teal-300' },
    },
    isCurrentMonth: {
      false: { container: 'bg-slate-50' },
    },
  },
})