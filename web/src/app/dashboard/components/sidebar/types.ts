import type { MenuItem } from '../../types'

export interface SidebarProps {
  open?: boolean
  menuItems?: MenuItem[]
  userName?: string
  userRole?: string
  userInitials?: string
}
