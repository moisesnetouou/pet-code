import { tv } from 'tailwind-variants'

export const petsGridStyles = tv({
  slots: {
    container: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
    empty: 'col-span-full text-center py-12',
    emptyIcon: 'w-16 h-16 mx-auto mb-4 text-slate-400',
    emptyTitle: 'text-lg font-semibold text-slate-700',
    emptyDescription: 'text-sm text-slate-500',
  },
  variants: {
    variant: {
      compact: { container: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3' },
      default: {},
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type PetsGridVariants = ReturnType<typeof petsGridStyles>
