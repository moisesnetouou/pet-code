import { tv } from 'tailwind-variants'

export const stockListStyles = tv({
  slots: {
    container: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    empty: 'col-span-full text-center py-12 text-slate-500',
  },
})