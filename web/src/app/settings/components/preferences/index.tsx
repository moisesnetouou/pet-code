"use client"

import { useState } from 'react'
import { Settings, Save } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { preferencesStyles } from './styles'
import type { PreferencesProps } from './types'

export function Preferences({ preferences: initialPreferences }: PreferencesProps) {
  const p = preferencesStyles()
  const [preferences, setPreferences] = useState(initialPreferences)

  const handleSave = () => {
    console.log('Saving preferences:', preferences)
  }

  const toggleEmailNotifications = () => {
    setPreferences(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))
  }

  const togglePushNotifications = () => {
    setPreferences(prev => ({ ...prev, pushNotifications: !prev.pushNotifications }))
  }

  const themeLabels: Record<string, string> = {
    light: 'Claro',
    dark: 'Escuro',
    system: 'Sistema',
  }

  const languageLabels: Record<string, string> = {
    'pt-BR': 'Português (Brasil)',
    'en-US': 'English (US)',
  }

  const dateFormatLabels: Record<string, string> = {
    'DD/MM/YYYY': 'DD/MM/YYYY',
    'MM/DD/YYYY': 'MM/DD/YYYY',
    'YYYY-MM-DD': 'YYYY-MM-DD',
  }

  const timeFormatLabels: Record<string, string> = {
    '12h': '12 horas',
    '24h': '24 horas',
  }

  return (
    <div className={p.container()}>
      <div className={p.header()}>
        <h3 className={p.title()}>
          <Settings className={p.titleIcon()} />
          Preferências
        </h3>
        <button onClick={handleSave} className={p.saveButton()}>
          <Save className="w-4 h-4 mr-1.5 inline" />
          Salvar
        </button>
      </div>

      <div className={p.section()}>
        <h4 className={p.sectionTitle()}>Aparência</h4>
        
        <div className={p.optionRow()}>
          <div className={p.optionLabel()}>
            <p className={p.optionLabelTitle()}>Tema</p>
            <p className={p.optionLabelDesc()}>Escolha o tema da interface</p>
          </div>
          <select 
            value={preferences.theme}
            onChange={(e) => setPreferences(prev => ({ ...prev, theme: e.target.value }))}
            className="h-9 px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm text-slate-800"
          >
            <option value="light">{themeLabels.light}</option>
            <option value="dark">{themeLabels.dark}</option>
            <option value="system">{themeLabels.system}</option>
          </select>
        </div>

        <div className={p.optionRow()}>
          <div className={p.optionLabel()}>
            <p className={p.optionLabelTitle()}>Idioma</p>
            <p className={p.optionLabelDesc()}>Idioma da interface</p>
          </div>
          <select 
            value={preferences.language}
            onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
            className="h-9 px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm text-slate-800"
          >
            <option value="pt-BR">{languageLabels['pt-BR']}</option>
            <option value="en-US">{languageLabels['en-US']}</option>
          </select>
        </div>
      </div>

      <div className={p.section()}>
        <h4 className={p.sectionTitle()}>Data e Hora</h4>
        
        <div className={p.optionRow()}>
          <div className={p.optionLabel()}>
            <p className={p.optionLabelTitle()}>Formato de data</p>
            <p className={p.optionLabelDesc()}>Formato de exibição das datas</p>
          </div>
          <select 
            value={preferences.dateFormat}
            onChange={(e) => setPreferences(prev => ({ ...prev, dateFormat: e.target.value }))}
            className="h-9 px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm text-slate-800"
          >
            <option value="DD/MM/YYYY">{dateFormatLabels['DD/MM/YYYY']}</option>
            <option value="MM/DD/YYYY">{dateFormatLabels['MM/DD/YYYY']}</option>
            <option value="YYYY-MM-DD">{dateFormatLabels['YYYY-MM-DD']}</option>
          </select>
        </div>

        <div className={p.optionRow()}>
          <div className={p.optionLabel()}>
            <p className={p.optionLabelTitle()}>Formato de hora</p>
            <p className={p.optionLabelDesc()}>Formato de exibição das horas</p>
          </div>
          <select 
            value={preferences.timeFormat}
            onChange={(e) => setPreferences(prev => ({ ...prev, timeFormat: e.target.value }))}
            className="h-9 px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm text-slate-800"
          >
            <option value="24h">{timeFormatLabels['24h']}</option>
            <option value="12h">{timeFormatLabels['12h']}</option>
          </select>
        </div>
      </div>

      <div className={p.section()}>
        <h4 className={p.sectionTitle()}>Notificações</h4>
        
        <div className={p.optionRow()}>
          <div className={p.optionLabel()}>
            <p className={p.optionLabelTitle()}>Notificações por email</p>
            <p className={p.optionLabelDesc()}>Receber notificações por email</p>
          </div>
          <Switch 
            checked={preferences.emailNotifications}
            onCheckedChange={toggleEmailNotifications}
          />
        </div>

        <div className={p.optionRow()}>
          <div className={p.optionLabel()}>
            <p className={p.optionLabelTitle()}>Notificações push</p>
            <p className={p.optionLabelDesc()}>Receber notificações no navegador</p>
          </div>
          <Switch 
            checked={preferences.pushNotifications}
            onCheckedChange={togglePushNotifications}
          />
        </div>
      </div>
    </div>
  )
}
