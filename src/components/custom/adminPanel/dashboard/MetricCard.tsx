"use client";
import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import Loader from "./Loader";
import type { MetricCardProps } from "./types";

function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  loading = false,
  subtitle = "",
}: MetricCardProps) {
  return (
    <div className="transform hover:scale-105 transition-all duration-300">
      <div
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
          borderColor: "rgba(203, 173, 141, 0.2)",
        }}
        className="h-40 rounded-xl p-6 border shadow-md hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-3">
          <div
            style={{
              background: "linear-gradient(135deg, #cbad8d 0%, #a48374 100%)",
            }}
            className="p-2.5 rounded-lg shadow-md"
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          {trend && trendValue && (
            <div
              className={`flex items-center text-sm font-semibold ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {trendValue}
            </div>
          )}
        </div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
        <div className="flex items-center justify-center h-12">
          {loading ? (
            <Loader sizeClass="w-8 h-8" color="fill-[#cbad8d]" />
          ) : (
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{value}</div>
              {subtitle && (
                <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MetricCard;
