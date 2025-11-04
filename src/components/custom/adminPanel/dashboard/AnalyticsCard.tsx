"use client";
import React from "react";
import { BarChart3 } from "lucide-react";
import Loader from "./Loader";
import type { AnalyticsCardProps } from "./types";

function AnalyticsCard({ analyticsData, loading }: AnalyticsCardProps) {
  return (
    <div
      className="
        rounded-2xl p-6 border shadow-lg
    bg-gradient-to-br from-white to-[#f9f9f9] border-[rgba(203,173,141,0.2)]
      "
    >
      <div className="flex items-center mb-6">
        <div
          className="
            p-2.5 rounded-xl mr-3 shadow-md
            bg-gradient-to-br from-[#9c6b56] to-[#835745]
          "
        >
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-[#2c1d16] tracking-tight">
          Google Analytics
        </h3>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <Loader sizeClass="w-8 h-8" color="fill-[#9c6b56]" />
        </div>
      ) : analyticsData ? (
        <div className="space-y-4">
          {[
            {
              label: "Utilizatori activi:",
              value: analyticsData.totalUsers.toLocaleString("ro-RO"),
            },
            {
              label: "Vizualizări pagină:",
              value: analyticsData.totalPageViews.toLocaleString("ro-RO"),
            },
            {
              label: "Durata medie sesiune:",
              value: `${Math.floor(
                analyticsData.averageSessionDuration / 60
              )}:${String(analyticsData.averageSessionDuration % 60).padStart(
                2,
                "0"
              )} min`,
            },
            {
              label: "Rata de respingere:",
              value: `${analyticsData.bounceRate.toFixed(1)}%`,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="
                flex justify-between items-center
                p-3 rounded-lg border border-[#d1b9a9]/40
                bg-white/70 backdrop-blur-sm
                hover:bg-[#fff9f3] transition-colors
              "
            >
              <span className="text-sm font-medium text-[#4b3b34]">
                {item.label}
              </span>
              <span className="text-sm font-bold text-[#2c1d16]">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-[#7c6355] py-8">
          <BarChart3 className="w-12 h-12 mx-auto mb-3 text-[#d1b9a9]" />
          <p>Conectați Google Analytics pentru a vizualiza datele.</p>
        </div>
      )}
    </div>
  );
}

export default AnalyticsCard;
