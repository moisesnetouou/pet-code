"use client";

import { Clock, Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/base/button";
import { Input } from "@/components/base/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/base/dialog";
import { scheduleStyles } from "./styles";
import type { ScheduleProps } from "./types";

export function Schedule({ schedules: initialSchedules }: ScheduleProps) {
  const s = scheduleStyles();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [schedules, setSchedules] = useState(initialSchedules);

  const handleSave = () => {
    console.log("Saving schedules:", schedules);
    setShowEditDialog(false);
  };

  const toggleClosed = (day: string) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.day === day
          ? { ...schedule, isClosed: !schedule.isClosed }
          : schedule,
      ),
    );
  };

  const updateTime = (day: string, field: "open" | "close", value: string) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.day === day ? { ...schedule, [field]: value } : schedule,
      ),
    );
  };

  return (
    <>
      <div className={s.container()}>
        <div className={s.header()}>
          <h3 className={s.title()}>
            <Clock className={s.titleIcon()} />
            Horários de Funcionamento
          </h3>
          <button
            onClick={() => setShowEditDialog(true)}
            className={s.editButton()}
            title="Editar"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>

        <div className={s.grid()}>
          {schedules.map((schedule) => (
            <div key={schedule.id} className={s.dayCard()}>
              <p className={s.dayLabel()}>{schedule.label}</p>
              {schedule.isClosed ? (
                <p className={s.dayClosed()}>Fechado</p>
              ) : (
                <p className={s.dayTime()}>
                  {schedule.open} - {schedule.close}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Editar Horários</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mt-4 max-h-[60vh] overflow-y-auto">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
              >
                <div className="w-28">
                  <p className="text-sm font-medium text-slate-700">
                    {schedule.label}
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!schedule.isClosed}
                    onChange={() => toggleClosed(schedule.day)}
                    className="w-4 h-4 rounded border-slate-300 text-teal-500 focus:ring-teal-500"
                  />
                  <span className="text-sm text-slate-600">Aberto</span>
                </label>
                {!schedule.isClosed && (
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={schedule.open}
                      onChange={(e) =>
                        updateTime(schedule.day, "open", e.target.value)
                      }
                      className="w-24 text-sm"
                    />
                    <span className="text-slate-400">-</span>
                    <Input
                      type="time"
                      value={schedule.close}
                      onChange={(e) =>
                        updateTime(schedule.day, "close", e.target.value)
                      }
                      className="w-24 text-sm"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              className="border-slate-200 text-slate-700 hover:bg-slate-100"
              onClick={() => setShowEditDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-teal-500 hover:bg-teal-600 text-white"
              onClick={handleSave}
            >
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
