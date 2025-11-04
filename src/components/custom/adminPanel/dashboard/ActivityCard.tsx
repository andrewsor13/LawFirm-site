"use client";
import React from "react";
import type { ActivityCardProps } from "./types";

function ActivityCard({
  title,
  items,
  icon: Icon,
  emptyMessage = "Nu există date",
}: ActivityCardProps) {
  return (
    <div className=" rounded-xl p-6 border shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-[#f9f9f9] border-[rgba(203,173,141,0.2)] ">
      <div className="flex items-center mb-4">
        <div
          className="
            p-2.5 rounded-lg mr-3 shadow-md
            bg-gradient-to-br from-[#9c6b56] to-[#835745]
          "
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-[#2c1d16]">{title}</h3>
      </div>

      <div
        className="
          space-y-3 max-h-64 overflow-y-auto
          scrollbar-thin scrollbar-thumb-[#9c6b56] scrollbar-track-[#f0e6dd]
          hover:scrollbar-thumb-[#835745]
        "
      >
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className=" p-3 bg-gray-50 rounded-lg border-l-4 border-[#cbad8d] hover:bg-gray-100 transition-colors text-black"
            >
              {item}
            </div>
          ))
        ) : (
          <div className="text-center text-[#5a3f31] py-8">
            <Icon className="w-12 h-12 mx-auto mb-2 text-[#cbb6a5]" />
            <p>{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityCard;
