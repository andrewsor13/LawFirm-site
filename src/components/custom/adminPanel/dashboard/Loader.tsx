"use client";
import React from "react";
import type { LoaderProps } from "./types";

function Loader({
  sizeClass = "w-8 h-8",
  color = "fill-[#cbad8d]",
}: LoaderProps) {
  return (
    <div className={`${sizeClass} animate-spin`}>
      <svg
        className={`${sizeClass} ${color}`}
        viewBox="0 0 100 101"
        fill="none"
      >
        <path
          d="m100 50.5908c0 27.2013-22.0914 49.2927-49.2927 49.2927-27.2013 0-49.2927-22.0914-49.2927-49.2927 0-27.2013 22.0914-49.2927 49.2927-49.2927 27.2013 0 49.2927 22.0914 49.2927 49.2927z"
          fill="currentColor"
        />
        <path
          d="m93.9676 39.0409c0-15.0816-12.2093-27.2909-27.2909-27.2909-15.0816 0-27.2909 12.2093-27.2909 27.2909 0 15.0816 12.2093 27.2909 27.2909 27.2909 15.0816 0 27.2909-12.2093 27.2909-27.2909z"
          fill="currentFill"
        />
      </svg>
    </div>
  );
}

export default Loader;
