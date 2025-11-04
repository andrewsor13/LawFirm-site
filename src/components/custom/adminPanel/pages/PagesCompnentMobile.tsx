"use client";
import React from "react";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const pageList = [
  { title: "Contact", slug: "contact" },
  { title: "Despre", slug: "despre" },
];

export default function PagesComponentMobile() {
  return (
    <div className="p-4 bg-gradient-to-br from-[#f7f3ef] to-[#ece2da] rounded-lg shadow-inner flex flex-col gap-4 mt-6 text-[#2c1d16]">
      <h2 className="text-2xl font-bold">Pagini</h2>

      <div className="flex flex-col gap-4">
        {pageList.map((page, index) => (
          <div
            key={index}
            className="border border-[#d1b9a9]/60 rounded-xl p-4 bg-white shadow-sm flex flex-col gap-2"
          >
            <h3 className="text-lg font-semibold line-clamp-2">{page.title}</h3>
            <Link
              href={`/${page.slug}`}
              target="_blank"
              className="text-[#9c6b56] hover:text-[#835745] underline text-sm"
            >
              /{page.slug}
            </Link>

            <div className="flex justify-end mt-1">
              <Link
                href={`/admin/pages/edit/${page.slug}`}
                className="text-[#9c6b56] hover:text-[#835745]"
              >
                <FaEdit size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
