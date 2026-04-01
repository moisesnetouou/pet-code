import { tv, type VariantProps } from 'tailwind-variants'

export const sidebarStyles = tv({
  slots: {
    container: 'bg-white border-r border-slate-200 flex-shrink-0 transition-all duration-300 flex flex-col fixed left-0 top-0 h-screen z-30',
    logoContainer: 'h-20 flex items-center px-5 border-b border-slate-100',
    logoIcon: 'w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center shadow-md',
    logoText: 'ml-3 text-xl font-bold text-slate-800',
    menuContainer: 'flex-1 py-6 px-3',
    nav: 'space-y-1',
    navItem: 'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
    navItemActive: 'bg-teal-50 text-teal-700',
    navItemInactive: 'text-slate-500 hover:bg-slate-50 hover:text-slate-800',
    userContainer: 'p-4 border-t border-slate-100',
    userInner: 'flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer',
    userAvatar: 'h-10 w-10',
    userName: 'text-sm font-semibold text-slate-800',
    userRole: 'text-xs text-slate-500',
    collapseButton: 'absolute top-24 -right-3 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm z-10',
  },
  variants: {
    open: {
      true: { container: 'w-64' },
      false: { container: 'w-20' },
    },
  },
  defaultVariants: {
    open: true,
  },
})

export type SidebarVariants = VariantProps<typeof sidebarStyles>
