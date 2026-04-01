export interface WelcomeBannerProps {
  title?: string
  totalCount?: number
  confirmedCount?: number
  waitingCount?: number
}

export interface StatBoxProps {
  value: number
  label: string
  variant?: 'today' | 'confirmed' | 'waiting'
}
