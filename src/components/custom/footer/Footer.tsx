"use client";
import React from "react";
import { BsDot } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useContact } from "@/hooks/useContact";

export default function Footer() {
  const { isActive } = useSiteSettings();
  const { contact, loading } = useContact();

  const utilityLinks = [
    { label: "Acasă", path: "/" },
    { label: "Despre", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
    { label: "Întrebări frecvente", path: "/intrebari-frecvente" },
    { label: "Termeni și condiții", path: "/termeni-si-conditii" },
    {
      label: "Politica de confidențialitate",
      path: "/politica-de-confidentialitate",
    },
    { label: "Politica de cookie-uri", path: "/politica-de-cookie-uri" },
  ];

  const phone = contact?.phone || "+40 700 000 000";
  const email = contact?.email || "avocat@avocat.ro";
  const address = contact?.address || "Str. Exemplu 10, București";

  return (
    <footer className="bg-[var(--background)] text-[var(--color-text)] pt-14 pb-8 px-6 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-center justify-items-center lg:text-left">
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-6">
            Link-uri utile
          </h3>
          <ul className="space-y-3 grid grid-cols-2">
            {utilityLinks.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className="flex items-center justify-center lg:justify-start gap-2 hover:text-[var(--color-primary)] transition"
                >
                  <BsDot className="text-lg" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-6">
            Informații de contact
          </h3>
          {loading ? (
            <p className="text-sm opacity-70">Se încarcă...</p>
          ) : (
            <ul className="space-y-4">
              {isActive ? (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center justify-center lg:justify-start gap-3 hover:text-[var(--color-primary)] transition break-all"
                  >
                    <IoMdMail className="text-lg" />
                    <span>{email}</span>
                  </a>
                </li>
              ) : (
                <>
                  <li>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="flex items-center justify-center lg:justify-start gap-3 hover:text-[var(--color-primary)] transition"
                    >
                      <FaPhone className="text-lg" />
                      <span>{phone}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${email}`}
                      className="flex items-center justify-center lg:justify-start gap-3 hover:text-[var(--color-primary)] transition break-all"
                    >
                      <IoMdMail className="text-lg" />
                      <span>{email}</span>
                    </a>
                  </li>
                  <li>
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                      <IoLocationOutline className="text-lg" />
                      <span>{address}</span>
                    </div>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>

        <div className="relative w-32 h-32 self-start">
          <Image
            src="/logo_no_text.svg"
            alt="logo"
            fill
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="border-t border-zinc-700 mt-12 pt-6 text-center text-sm opacity-80">
        © {new Date().getFullYear()} Ciobancă Andrei-Sorin. Toate drepturile
        rezervate.
      </div>
    </footer>
  );
}
