import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RxAvatar } from "react-icons/rx";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUserShield, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

type Props = {
  session: Session | null;
};

export default function AdminDropdown({ session }: Props) {
  const adminLinks = [{ label: "Panou Admin", path: "/admin/dashboard" }];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hover:cursor-pointer group flex flex-row items-center gap-2 transition-all duration-200">
          <div className="relative">
            <RxAvatar
              size={32}
              className="text-[var(--color-primary)] group-hover:text-[var(--color-hover)] transition-colors duration-200"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--color-background)]" />
          </div>
          <IoMdArrowDropdown
            size={20}
            className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-hover)] group-hover:translate-y-0.5 transition-all duration-200"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 border-[var(--color-accent)]/30 shadow-xl"
        style={{
          backgroundColor: "var(--color-background)",
          borderWidth: "1px",
        }}
        align="end"
        sideOffset={8}
      >
        <div
          className="p-4 rounded-t-lg"
          style={{
            background:
              "linear-gradient(135deg, var(--color-container) 0%, var(--color-secondary) 100%)",
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <RxAvatar size={28} className="text-[var(--color-background)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[var(--color-text)] font-bold text-sm truncate">
                {session?.user?.email}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <FaUserShield
                  size={12}
                  className="text-[var(--color-primary)]"
                />
                <p className="text-[var(--color-text-secondary)] text-xs font-medium">
                  {session?.user?.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator
          style={{ backgroundColor: "var(--color-accent)", opacity: 0.2 }}
        />

        <DropdownMenuGroup className="p-2">
          {adminLinks.map((item, index) => (
            <DropdownMenuItem
              asChild
              key={index}
              className="cursor-pointer rounded-md transition-all duration-200"
              style={{
                color: "var(--color-text-secondary)",
              }}
              onSelect={(e) => e.preventDefault()}
            >
              <Link
                href={item.path}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-[var(--color-container)] hover:text-[var(--color-text)] hover:pl-4 transition-all duration-200"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator
          style={{ backgroundColor: "var(--color-accent)", opacity: 0.2 }}
        />

        <div className="p-2">
          <DropdownMenuItem
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
            className="cursor-pointer rounded-md transition-all duration-200 group"
            style={{
              color: "var(--color-text-secondary)",
            }}
          >
            <div className="flex items-center gap-3 px-3 py-2.5 w-full hover:bg-red-500/10 group-hover:text-red-500 transition-all duration-200">
              <FaSignOutAlt
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
              <span className="font-semibold text-sm">Log out</span>
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
