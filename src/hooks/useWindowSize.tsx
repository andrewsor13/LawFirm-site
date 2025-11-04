"use client";
import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
