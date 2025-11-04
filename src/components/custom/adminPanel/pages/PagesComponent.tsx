"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const pageList = [
  { title: "Contact", slug: "contact" },
  { title: "Despre", slug: "despre" },
];

export default function PagesComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f3ef] to-[#ece2da] p-8 rounded-lg shadow-inner flex flex-col gap-6 text-[#2c1d16]">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Pagini</h2>
        <p className="text-sm text-[#6b5446]">
          Listă cu paginile editabile din site. Poți edita conținutul fiecăreia.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#d1b9a9]/60 bg-white shadow-md">
        <Table className="w-full text-sm">
          <TableHeader className="bg-[#e0d2c7] text-[#2c1d16]">
            <TableRow className="border-b border-[#d1b9a9]/70">
              <TableHead className="font-bold py-3 px-4 text-left w-[250px]">
                Titlu
              </TableHead>
              <TableHead className="font-bold py-3 px-4 text-left">
                Link
              </TableHead>
              <TableHead className="font-bold py-3 px-4 text-center w-20">
                Editare
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pageList.map((page, index) => (
              <TableRow
                key={index}
                className="border-b border-[#e4d6cc]/60 hover:bg-[#fff9f3] transition-colors"
              >
                <TableCell className="font-medium py-3 px-4 truncate">
                  {page.title}
                </TableCell>

                <TableCell className="py-3 px-4">
                  <Link
                    href={`/${page.slug}`}
                    target="_blank"
                    className="text-[#9c6b56] hover:text-[#835745] underline transition"
                  >
                    /{page.slug}
                  </Link>
                </TableCell>

                <TableCell className="py-3 px-4">
                  <div className="flex justify-center items-center">
                    <Link
                      href={`/admin/pages/edit/${page.slug}`}
                      className="text-[#9c6b56] hover:text-[#835745] transition"
                    >
                      <FaEdit size={18} />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
