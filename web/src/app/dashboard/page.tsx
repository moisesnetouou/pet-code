"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Header } from "./components/header";
import { NextAppointment } from "./components/next-appointment";
import { QuickActions } from "./components/quick-actions";
import { RecentPets } from "./components/recent-pets";
import { Sidebar } from "./components/sidebar";
import { StatsGrid } from "./components/stats-grid";
import { Timeline } from "./components/timeline";
import { WelcomeBanner } from "./components/welcome-banner";
import { greeting } from "./utils/greeting";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar
          open={sidebarOpen}
          onToggle={setSidebarOpen}
          currentPath="/dashboard"
        />

        <main
          className={cn(
            "flex-1 transition-all duration-300",
            sidebarOpen ? "ml-64" : "ml-20",
          )}
        >
          <Header
            greeting={`${greeting()}, Admin! 👋`}
            date="Terça-feira, 01 de Abril de 2026"
          />

          <div className="p-8">
            <WelcomeBanner />

            <StatsGrid />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <Timeline />
              </div>

              <div className="space-y-6">
                <NextAppointment />
                <RecentPets />
              </div>
            </div>

            <QuickActions />
          </div>
        </main>
      </div>
    </div>
  );
}
