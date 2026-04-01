import type { MenuItem } from '../../types'

export interface SidebarProps {
  open?: boolean
  currentPath?: string
  menuItems?: MenuItem[]
  userName?: string
  userRole?: string
  userInitials?: string
}
