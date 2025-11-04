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

export default function DomainDesktop({ domain, iconSize = 80 }: DomainProps) {
  const { siteSettings } = useAppContext();
  const isActive = siteSettings?.blogMode ?? false;

  const Icon = iconMap[domain.icon] || FaRegCheckCircle;

  const renderSafeHTML = (html?: string | null, text?: string | null) => {
    const clean = DOMPurify.sanitize(html ?? text ?? "");
    const fixed = clean.replace(/<p>(\s|&nbsp;|<br>)*<\/p>/g, "<br/>");
    return parse(fixed);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="relative w-screen p-10">
        <Image
          className="object-cover -z-50 absolute brightness-20 blur-xs"
          alt="main image"
          fill
          sizes="100%"
          style={{ objectFit: "cover" }}
          src="/images/background.webp"
        />
        <div className="relative w-full flex justify-center">
          <h2 className="text-4xl text-center relative z-10">{domain.title}</h2>
          <div className="absolute -bottom-3 w-40 h-1 bg-[#ececec] rounded-full"></div>
        </div>
      </div>

      <div className="w-screen p-10 bg-white shadow-md flex flex-col gap-20">
        <div className=" mx-auto max-w-7xl flex flex-row justify-between items-start gap-10">
          <div className="flex-[7] flex flex-row gap-4 min-w-[70%]">
            <div className="flex-shrink-0">
              <Icon size={iconSize} className="text-gray-500 w-20 h-20" />
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="text-4xl font-bold text-black">
                {isActive ? null : "Avocat "} {domain.title}
              </h1>

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
                  <Link href="/contact" className="text-xl">
                    Contactează-mă
                  </Link>
                </ButtonGeneral>
              )}
            </div>
          </div>

          {domain.imagePath && (
            <div className="flex-[3] min-w-64 relative h-80 rounded-md shadow-[28px_30px_6px_-3px_rgba(0,_0,_0,_0.3)]">
              <Image
                src={domain.imagePath}
                alt={`Imagine despre ${domain.title}`}
                fill
                priority
                sizes="(min-width: 1280px) 384px, 100vw"
                className="rounded-md object-cover"
              />
            </div>
          )}
        </div>

        <div className="mx-auto max-w-7xl text-black pl-4 sm:pl-16 flex flex-col gap-12 leading-relaxed">
          {domain.faqs?.map((faq, idx) => {
            if (idx === 0) {
              return (
                <div
                  key={idx}
                  className="flex flex-col lg:flex-row gap-12 justify-between items-start"
                >
                  <div className="flex-[1.2] flex flex-col gap-4 bg-gray-50 p-6 rounded-xl shadow-md">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                    <div className="text-gray-700 text-base leading-relaxed prose prose-sm max-w-none">
                      {renderSafeHTML(faq.html, faq.text)}
                    </div>
                  </div>
                  {isActive ? null : (
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-5 text-gray-900">
                        Serviciile mele:
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {domain.services.map((service, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
                          >
                            <FaRegCheckCircle
                              size={22}
                              className="text-green-600 flex-shrink-0"
                            />
                            <p className="text-gray-700">{service}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            if (idx >= 2 && idx % 2 === 0) {
              return (
                <div
                  key={idx}
                  className="flex flex-col lg:flex-row gap-12 justify-between items-center bg-gray-50 p-6 rounded-xl shadow-md"
                >
                  <div className="flex flex-col gap-4 flex-[1.2]">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                    <div className="text-gray-700 text-base leading-relaxed prose prose-sm max-w-none">
                      {renderSafeHTML(faq.html, faq.text)}
                    </div>
                  </div>

                  {idx === 2 && domain.faqImage && (
                    <div className="flex-1 flex justify-center items-center">
                      <div className="relative w-full max-w-sm h-95 rounded-xl overflow-hidden shadow-[15px_15px_6px_-6px_rgba(0,_0,_0,_0.3)]">
                        <Image
                          src={domain.faqImage}
                          alt="FAQ image"
                          fill
                          sizes="(min-width: 1280px) 384px, 100vw"
                          className="rounded-xl object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div key={idx} className="flex flex-col gap-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <div className="text-gray-700 text-base leading-relaxed prose prose-sm max-w-none">
                  {renderSafeHTML(faq.html, faq.text)}
                </div>
              </div>
            );
          })}
          <div className="self-end">
            {isActive ? null : (
              <ButtonGeneral>
                <Link href="/contact" className="text-xl">
                  Contactează-mă
                </Link>
              </ButtonGeneral>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
