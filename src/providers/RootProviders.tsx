"use client";

import { SessionProvider } from "next-auth/react";
import { AppProvider } from "@/context/AppContext";
import { CustomSessionContextProvider } from "@/components/CustomSessionContext";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CustomSessionContextProvider>
        <AppProvider>{children}</AppProvider>
      </CustomSessionContextProvider>
    </SessionProvider>
  );
}
