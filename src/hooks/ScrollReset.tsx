"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const timeout = setTimeout(() => {
      setIsScrolled(true);
    }, 50);

    return () => {
      clearTimeout(timeout);
      setIsScrolled(false);
    };
  }, [pathname]);

  return isScrolled ? <>{children}</> : null;
}
