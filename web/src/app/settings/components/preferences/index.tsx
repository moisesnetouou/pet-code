"use client";

import { Save, Settings } from "lucide-react";
import { useState } from "react";
import { Select } from "@/components/base/select";
import { Switch } from "@/components/base/switch";
import { preferencesStyles } from "./styles";
import type { PreferencesProps } from "./types";

export function Preferences({
  preferences: initialPreferences,
}: PreferencesProps) {
  const p = preferencesStyles();
  const [preferences, setPreferences] = useState(initialPreferences);

  const handleSave = () => {
    console.log("Saving preferences:", preferences);
  };

  const toggleEmailNotifications = () => {
    setPreferences((prev) => ({
      ...prev,
      emailNotifications: !prev.emailNotifications,
    }));
  };

  const togglePushNotifications = () => {
    setPreferences((prev) => ({
      ...prev,
      pushNotifications: !prev.pushNotifications,
    }));
  };

  const themeLabels: Record<string, string> = {
    light: "Claro",
    dark: "Escuro",
    system: "Sistema",
  };

  const languageLabels: Record<string, string> = {
    "pt-BR": "Português (Brasil)",
    "en-US": "English (US)",
  };

  const dateFormatLabels: Record<string, string> = {
    "DD/MM/YYYY": "DD/MM/YYYY",
    "MM/DD/YYYY": "MM/DD/YYYY",
    "YYYY-MM-DD": "YYYY-MM-DD",
  };

  const timeFormatLabels: Record<string, string> = {
    "12h": "12 horas",
    "24h": "24 horas",
  };

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
        <div className={p.grid()}>
          <div className={p.card()}>
            <span className={p.cardLabel()}>Tema</span>
            <Select
              options={Object.entries(themeLabels).map(([value, label]) => ({
                value,
                label,
              }))}
              value={preferences.theme}
              onChange={(value) =>
                setPreferences((prev) => ({ ...prev, theme: value }))
              }
            />
          </div>
          <div className={p.card()}>
            <span className={p.cardLabel()}>Idioma</span>
            <Select
              options={Object.entries(languageLabels).map(([value, label]) => ({
                value,
                label,
              }))}
              value={preferences.language}
              onChange={(value) =>
                setPreferences((prev) => ({ ...prev, language: value }))
              }
            />
          </div>
        </div>
      </div>

      <div className={p.section()}>
        <h4 className={p.sectionTitle()}>Data e Hora</h4>
        <div className={p.grid()}>
          <div className={p.card()}>
            <span className={p.cardLabel()}>Formato de data</span>
            <Select
              options={Object.entries(dateFormatLabels).map(([value, label]) => ({
                value,
                label,
              }))}
              value={preferences.dateFormat}
              onChange={(value) =>
                setPreferences((prev) => ({
                  ...prev,
                  dateFormat: value,
                }))
              }
            />
          </div>
          <div className={p.card()}>
            <span className={p.cardLabel()}>Formato de hora</span>
            <Select
              options={Object.entries(timeFormatLabels).map(([value, label]) => ({
                value,
                label,
              }))}
              value={preferences.timeFormat}
              onChange={(value) =>
                setPreferences((prev) => ({
                  ...prev,
                  timeFormat: value,
                }))
              }
            />
          </div>
        </div>
      </div>

      <div className={p.section()}>
        <h4 className={p.sectionTitle()}>Notificações</h4>
        <div className={p.grid()}>
          <div className={p.card()}>
            <span className={p.cardLabel()}>Notificações por email</span>
            <Switch
              checked={preferences.emailNotifications}
              onCheckedChange={toggleEmailNotifications}
            />
          </div>
          <div className={p.card()}>
            <span className={p.cardLabel()}>Notificações push</span>
            <Switch
              checked={preferences.pushNotifications}
              onCheckedChange={togglePushNotifications}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
