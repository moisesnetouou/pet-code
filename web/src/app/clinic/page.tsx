"use client";

import { Building2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Header } from "../dashboard/components/header";
import { Sidebar } from "../dashboard/components/sidebar";
import { greeting, formatDate } from "../dashboard/utils/greeting";
import { ClinicInfo } from "./components/clinic-info";
import { Schedule } from "./components/schedule";
import { Services } from "./components/services";
import { Veterinarians } from "./components/veterinarians";
import {
  clinic as clinicData,
  schedules as schedulesData,
  services as servicesData,
  veterinarians as veterinariansData,
} from "./data";

export default function ClinicPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar
          open={sidebarOpen}
          onToggle={setSidebarOpen}
          currentPath="/clinic"
        />

        <main
          className={cn(
            "flex-1 transition-all duration-300",
            sidebarOpen ? "ml-64" : "ml-20",
          )}
        >
          <Header
            greeting={`${greeting()}, Admin! 👋`}
            date={formatDate()}
          />

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <Building2 className="w-7 h-7 text-teal-600" />
                  Clínica
                </h1>
                <p className="text-slate-600 mt-1">
                  Gerencie as configurações da clínica
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <ClinicInfo clinic={clinicData} />

              <Schedule schedules={schedulesData} />

              <Services services={servicesData} />

              <Veterinarians veterinarians={veterinariansData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
