"use client";
import Image from "next/image";
import React from "react";
import ButtonGeneral from "../../ButtonGeneral";
import Link from "next/link";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { GiPoliceOfficerHead, GiFamilyTree } from "react-icons/gi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { FaGavel, FaBalanceScale, FaHandshake } from "react-icons/fa";
import { RiBankLine } from "react-icons/ri";
import { DomainProps } from "@/lib/types";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useAppContext } from "@/context/AppContext";

const iconMap: Record<string, React.ElementType> = {
  FaGavel,
  FaBalanceScale,
  FaHandshake,
  HiOutlineClipboardDocumentList,
  GiPoliceOfficerHead,
  GiFamilyTree,
  MdOutlineWorkOutline,
  BsPeopleFill,
  RiBankLine,
};

export default function DomainMobile({ domain, iconSize = 60 }: DomainProps) {
  const { siteSettings } = useAppContext();
  const isActive = siteSettings?.blogMode ?? false;

  const Icon = iconMap[domain.icon] || FaRegCheckCircle;

  const renderSafeHTML = (html?: string | null, text?: string | null) => {
    const clean = DOMPurify.sanitize(html ?? text ?? "");
    return parse(clean);
  };

  return (
    <div className="flex flex-col gap-0">
      <div className="relative w-screen p-8">
        <Image
          className="object-cover -z-50 absolute brightness-20 blur-xs"
          alt="main image"
          fill
          style={{ objectFit: "cover" }}
          sizes="100%"
          src="/images/background.webp"
        />
        <h2 className="mx-auto text-2xl font-bold text-center text-white relative z-10">
          Domenii de practică &gt; {domain.title}
        </h2>
        <div className="mx-auto mt-2 w-24 h-1 bg-[#ececec] rounded-full relative z-10"></div>
      </div>

      <div className="flex flex-col gap-10 py-10 px-6 bg-white">
        <div className="max-w-xl mx-auto flex flex-col gap-8">
          <div className="flex flex-row items-center gap-4">
            <Icon size={iconSize} className="text-gray-500" />
            <h1 className="text-xl font-bold text-black">
              {isActive ? null : "Avocat "} {domain.title}
            </h1>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-gray-700 leading-relaxed">
              {isActive ? domain.blogOnlyDescription : domain.description}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {isActive
                ? domain.blogOnlyDetailedDescription
                : domain.detailedDescription}
            </p>
            {isActive ? null : (
              <ButtonGeneral>
                <Link href="/contact">Contactează-mă</Link>
              </ButtonGeneral>
            )}
          </div>
        </div>

        {domain.imagePath && (
          <div className="relative w-full h-56 sm:h-72 rounded-lg shadow-md mx-auto max-w-xl">
            <Image
              src={domain.imagePath}
              alt={`Imagine despre ${domain.title}`}
              fill
              priority
              sizes="(min-width: 1280px) 384px, 100vw"
              className="rounded-lg object-cover"
            />
          </div>
        )}

        {isActive ? null : (
          <div className="max-w-xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Serviciile mele:
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {domain.services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm"
                >
                  <FaRegCheckCircle
                    size={20}
                    className="text-green-600 flex-shrink-0"
                  />
                  <p className="text-gray-700 text-sm">{service}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="w-full max-w-xl mx-auto flex flex-col gap-10 text-black leading-relaxed">
          {domain.faqs?.map((faq, idx) => {
            if (idx >= 2 && idx % 2 === 0) {
              return (
                <div
                  key={idx}
                  className="flex flex-col gap-6 bg-gray-50 p-5 rounded-xl shadow-md"
                >
                  <h3 className="text-xl font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    {renderSafeHTML(faq.html, faq.text)}
                  </div>

                  {idx === 2 && domain.faqImage && (
                    <div className="relative w-full h-56 rounded-xl shadow-md overflow-hidden">
                      <Image
                        src={domain.faqImage}
                        alt="FAQ image"
                        fill
                        sizes="(min-width: 1280px) 384px, 100vw"
                        className="rounded-xl object-cover"
                      />
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div key={idx} className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <div className="text-gray-700 text-base leading-relaxed prose prose-sm max-w-none">
                  {renderSafeHTML(faq.html, faq.text)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="self-center mt-6">
          <ButtonGeneral>
            <Link href="/contact" className="text-base">
              Contactează Avocatul
            </Link>
          </ButtonGeneral>
        </div>
      </div>
    </div>
  );
}
