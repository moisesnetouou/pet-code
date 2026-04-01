export interface PreferencesProps {
  preferences: {
    theme: string
    language: string
    dateFormat: string
    timeFormat: string
    emailNotifications: boolean
    pushNotifications: boolean
  }
}
