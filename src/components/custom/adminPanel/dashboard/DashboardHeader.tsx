"use client";
import React from "react";
import { RxAvatar } from "react-icons/rx";
import { Mail, Calendar, Activity } from "lucide-react";
import type { DashboardHeaderProps } from "./types";

function DashboardHeader({ session }: DashboardHeaderProps) {
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bună dimineața";
    if (hour < 18) return "Bună ziua";
    return "Bună seara";
  };

  return (
    <div className="mb-8">
      <div
        style={{
          background:
            "linear-gradient(135deg, #cbad8d 0%, #a48374 50%, #8c6f60 100%)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
        }}
        className="rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  style={{ backgroundColor: "#f5f0eb" }}
                  className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <RxAvatar size={48} className="text-[#8c6f60]" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-4 border-white" />
              </div>

              <div>
                <p className="text-sm opacity-90 mb-1">{getGreeting()},</p>
                <h1 className="text-3xl font-bold mb-1">
                  {session?.user?.name || "Admin"}
                </h1>
                <div className="flex items-center gap-3 text-sm opacity-90">
                  <span className="flex items-center gap-1">
                    <Mail size={14} />
                    {session?.user?.email}
                  </span>
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-semibold">
                    {session?.user?.role || "Administrator"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mb-2 mx-auto">
                  <Calendar size={24} />
                </div>
                <p className="text-xs opacity-75 mb-1">Data</p>
                <p className="font-semibold text-sm">
                  {new Date().toLocaleDateString("ro-RO", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mb-2 mx-auto">
                  <Activity size={24} />
                </div>
                <p className="text-xs opacity-75 mb-1">Status</p>
                <p className="font-semibold text-sm">Activ</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-lg opacity-95">
              Bine ai revenit! Iată o privire de ansamblu asupra activității din
              cabinet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
