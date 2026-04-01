export interface HeaderProps {
  greeting?: string
  date?: string
  notificationCount?: number
  showSearch?: boolean
  action1Label?: string
  action2Label?: string
  onAction1?: () => void
  onAction2?: () => void
  onSearch?: (query: string) => void
}