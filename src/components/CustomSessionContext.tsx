"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext } from "react";

type SessionContextType = {
  session: ReturnType<typeof useSession>["data"];
  status: ReturnType<typeof useSession>["status"];
  update: ReturnType<typeof useSession>["update"];
};

const CustomSessionContext = createContext<SessionContextType | undefined>(
  undefined
);

export function CustomSessionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status, update } = useSession();

  return (
    <CustomSessionContext.Provider value={{ session, status, update }}>
      {children}
    </CustomSessionContext.Provider>
  );
}

export const useCustomSession = () => {
  const context = useContext(CustomSessionContext);
  if (!context)
    throw new Error(
      "useCustomSession must be used within CustomSessionContextProvider"
    );
  return context;
};
