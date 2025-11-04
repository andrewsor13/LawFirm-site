import React, { ReactNode } from "react";

type ButtonGeneralProps = {
  children: ReactNode;
};

export default function ButtonGeneral({ children }: ButtonGeneralProps) {
  return (
    <div className="w-fit cursor-pointer rounded-lg px-4 py-2 lg:px-6 lg:py-4 text-sm lg:text-lg font-semibold bg-[var(--color-primary)] text-[var(--color-background)] hover:bg-[var(--color-hover)]  hover:-translate-y-0.5 transition-all duration-200">
      {children}
    </div>
  );
}
