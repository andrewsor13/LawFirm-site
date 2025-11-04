"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { CustomSessionContextProvider } from "./CustomSessionContext";

export default function ClientSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider>
      <CustomSessionContextProvider>{children}</CustomSessionContextProvider>
    </SessionProvider>
  );
}
