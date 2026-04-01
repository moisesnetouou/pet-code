import { tv } from 'tailwind-variants'

export const welcomeBannerStyles = tv({
  slots: {
    container: 'bg-teal-50 border border-teal-200 rounded-2xl p-6 mb-8',
    content: 'flex items-center justify-between',
    textContainer: '',
    title: 'text-lg font-semibold text-teal-800',
    stats: 'text-sm text-teal-600 mt-1',
    statNumber: 'font-semibold',
    statsContainer: 'hidden md:flex items-center gap-4 text-sm',
    statBox: 'text-center px-4 py-2 rounded-xl border',
    statBoxToday: 'bg-white border-teal-100',
    statBoxConfirmed: 'bg-emerald-50 border-emerald-100',
    statBoxWaiting: 'bg-amber-50 border-amber-100',
    statValue: 'text-2xl font-bold',
    statLabel: '',
  },
  variants: {
    statVariant: {
      today: { statValue: 'text-teal-700', statLabel: 'text-teal-600' },
      confirmed: { statValue: 'text-emerald-700', statLabel: 'text-emerald-600' },
      waiting: { statValue: 'text-amber-700', statLabel: 'text-amber-600' },
    },
  },
})

export type WelcomeBannerVariants = ReturnType<typeof welcomeBannerStyles>
