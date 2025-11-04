import React from "react";

export default function SmallCard({ children }: React.PropsWithChildren) {
  return (
    <div className="w-9/20 shadow-md hover:shadow-lg hover:translate-x-2 transition ease-in-out duration-200 rounded-md">
      {children}
    </div>
  );
}
