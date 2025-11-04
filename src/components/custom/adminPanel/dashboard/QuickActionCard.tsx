"use client";
import React from "react";
import Link from "next/link";
import { FileText, MessageCircle, HelpCircle, Mail } from "lucide-react";
import type { QuickAction } from "./types";

function QuickActionCard() {
  const actions: QuickAction[] = [
    {
      icon: FileText,
      label: "Articol nou",
      color: "from-blue-500 to-blue-600",
      href: "/admin/posts/add-post",
    },
    {
      icon: MessageCircle,
      label: "Moderare comentarii",
      color: "from-green-500 to-green-600",
      href: "/admin/comments",
    },
    {
      icon: HelpCircle,
      label: "FAQ nou",
      color: "from-purple-500 to-purple-600",
      href: "/admin/faq/add-faq",
    },
    {
      icon: Mail,
      label: "Mesaje clienți",
      color: "from-orange-500 to-orange-600",
      href: "/admin/clients",
    },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
        borderColor: "rgba(203, 173, 141, 0.2)",
      }}
      className="rounded-xl p-6 border shadow-md"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Acțiuni rapide
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="flex flex-col items-center p-4 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105"
          >
            <div
              className={`p-3 rounded-lg bg-gradient-to-r ${action.color} mb-2 shadow-md`}
            >
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 text-center">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuickActionCard;
