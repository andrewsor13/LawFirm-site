"use client";

import React from "react";
import DashboardMobile from "./DashboardMobile";
import DashboardDesktop from "./DashboardDesktop";
import { useCustomSession } from "@/components/CustomSessionContext";

export default function DashboardClient() {
  const { session } = useCustomSession();

  return (
    <div>
      <div className="lg:hidden">
        <DashboardMobile session={session} />
      </div>
      <div className="hidden lg:flex">
        <DashboardDesktop session={session} />
      </div>
    </div>
  );
}
