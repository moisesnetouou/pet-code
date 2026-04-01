import { tv } from 'tailwind-variants'

export const filtersStyles = tv({
  slots: {
    container: 'flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm',
    searchContainer: 'relative flex-1 min-w-[200px]',
    searchIcon: 'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400',
    searchInput: 'w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all',
    selectContainer: 'relative',
    select: 'appearance-none pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all',
    selectIcon: 'absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none',
    resultsInfo: 'ml-auto text-sm text-slate-500 font-medium',
  },
})
