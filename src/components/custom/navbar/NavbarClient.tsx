"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Menu from "./Menu";
import AdminDropdown from "@/components/AdminDropdown";
import type { Session } from "next-auth";

export default function NavbarClient({
  session,
  navLinks,
}: {
  session: Session | null;
  navLinks: { label: string; path: string }[];
}) {
  const pathname = usePathname();

  return (
    <div className="w-screen backdrop-blur-md bg-[var(--color-background)]/80 border-b border-[var(--color-accent)]/30 shadow-md shadow-black/30 z-50 fixed top-0">
      <nav className="flex items-center justify-between lg:max-w-7xl mx-auto px-6 py-4">
        <Link href="/">
          <div className="relative w-16 h-16">
            <Image
              src="/logo_no_text.svg"
              alt="logo Gogoloș"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-10">
            {navLinks.map(({ label, path }) => (
              <li key={path} className="relative group">
                <Link
                  href={path}
                  className={`text-2xl transition-colors duration-300 hover:text-[var(--color-hover)] ${
                    pathname === path ? "text-[var(--color-hover)]" : ""
                  }`}
                >
                  {label}
                </Link>
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[var(--color-hover)] transition-all duration-300 ${
                    pathname === path ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </li>
            ))}
            {session && (
              <li>
                <AdminDropdown session={session} />
              </li>
            )}
          </ul>
        </div>

        <div className="lg:hidden relative z-[60]">
          <Menu />
        </div>
      </nav>
    </div>
  );
}
