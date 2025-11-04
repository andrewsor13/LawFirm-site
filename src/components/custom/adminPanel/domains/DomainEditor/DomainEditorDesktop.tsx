"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaRegCheckCircle,
  FaGavel,
  FaBalanceScale,
  FaHandshake,
} from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { GiPoliceOfficerHead, GiFamilyTree } from "react-icons/gi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { RiBankLine } from "react-icons/ri";
import { FaTrashCan } from "react-icons/fa6";
import { Domain, DomainProps } from "@/lib/types";
import ButtonGeneral from "@/components/ButtonGeneral";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Notiflix from "notiflix";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import FaqItem from "./FaqItem";
import AddFaq from "./AddFaq";
import { motion } from "framer-motion";

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

export default function DomainEditorDesktop({
  domain,
  iconSize = 60,
}: DomainProps) {
  const router = useRouter();
  const [localMode, setLocalMode] = useState<boolean>(false);
  const [editableDomain, setEditableDomain] = useState<Domain>(domain);

  const Icon = iconMap[editableDomain.icon] || FaRegCheckCircle;

  const handleChange = <K extends keyof Domain>(
    field: K,
    value: Domain[K] extends string | null ? string : Domain[K]
  ) => {
    setEditableDomain((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addService = () =>
    setEditableDomain((prev) => ({
      ...prev,
      services: [...prev.services, ""],
    }));

  const deleteService = (index: number) =>
    setEditableDomain((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));

  const removeFaqFromDomain = async (id: number) => {
    try {
      const res = await fetch(`/api/faq/id/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domainId: null }),
      });
      if (!res.ok) throw new Error();
      setEditableDomain((prev) => ({
        ...prev,
        faqs: prev.faqs.filter((f) => f.id !== id),
      }));
      Notiflix.Notify.success("Întrebarea a fost eliminată din domeniu!");
    } catch {
      Notiflix.Notify.failure("Eroare la eliminare!");
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/domains/domain/id/${editableDomain.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editableDomain),
      });
      if (!res.ok) throw new Error();
      Notiflix.Notify.success("Modificările au fost salvate!");
      router.push("/admin/domains");
    } catch {
      Notiflix.Notify.failure("A apărut o problemă la salvare!");
    }
  };

  const shortField = localMode ? "blogOnlyDescription" : "description";
  const detailedField = localMode
    ? "blogOnlyDetailedDescription"
    : "detailedDescription";

  return (
    <div className="p-8 bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] rounded-xl shadow-lg border border-[#e8ddd4]/60 flex flex-col gap-8">
      <div className="flex items-center justify-between pb-4 border-b border-[#d6ccc2]/60">
        <h2 className="text-2xl font-bold text-[#3a2d28]">Editor domeniu</h2>
        <div className="flex items-center gap-3">
          <Switch
            id="blog-mode"
            checked={localMode}
            onCheckedChange={(checked) => setLocalMode(checked)}
          />
          <span className="text-sm text-[#8c6f60]">
            {localMode ? "Blog Mode" : "Normal Mode"}
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md border border-[#d6ccc2]/60 flex flex-col md:flex-row gap-8"
      >
        <div className="flex-[7] flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Icon size={iconSize} className="text-[#a48374]" />
            <Input
              value={editableDomain.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="text-3xl font-bold text-[#3a2d28] bg-transparent border-none focus:ring-0"
            />
          </div>

          <Textarea
            value={editableDomain[shortField] ?? ""}
            onChange={(e) => handleChange(shortField, e.target.value)}
            placeholder={
              localMode
                ? "Descriere scurtă pentru Blog Mode"
                : "Descriere scurtă pentru modul normal"
            }
            className="text-[#3a2d28] min-h-[120px] bg-white/50 rounded-lg border border-[#d6ccc2]/70 focus:ring-[#a48374]"
          />

          <Textarea
            value={editableDomain[detailedField] ?? ""}
            onChange={(e) => handleChange(detailedField, e.target.value)}
            placeholder={
              localMode
                ? "Descriere detaliată pentru Blog Mode"
                : "Descriere detaliată pentru modul normal"
            }
            className="text-[#3a2d28] min-h-[160px] bg-white/50 rounded-lg border border-[#d6ccc2]/70 focus:ring-[#a48374]"
          />

          {!localMode && (
            <ButtonGeneral>
              <Link href="/contact" className="text-lg">
                Contactează-mă
              </Link>
            </ButtonGeneral>
          )}
        </div>

        <div className="flex-[3] flex flex-col items-center justify-center">
          {editableDomain.imagePath ? (
            <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-lg">
              <Image
                src={editableDomain.imagePath}
                alt={`Imagine ${editableDomain.title}`}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-64 w-full border-2 border-dashed border-[#d6ccc2]/70 flex items-center justify-center text-[#8c6f60] rounded-xl">
              Nicio imagine
            </div>
          )}
        </div>
      </motion.div>

      {!localMode && (
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md border border-[#d6ccc2]/60 text-[#3a2d28]">
          <h3 className="text-xl font-semibold mb-4">Serviciile mele</h3>
          <ul className="flex flex-col gap-3">
            {editableDomain.services.map((service, index) => (
              <li key={index} className="flex items-center gap-3">
                <FaRegCheckCircle size={18} className="text-green-600 mt-1" />
                <Input
                  value={service}
                  onChange={(e) => {
                    const newServices = [...editableDomain.services];
                    newServices[index] = e.target.value;
                    handleChange("services", newServices);
                  }}
                  className="flex-1"
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <FaTrashCan />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Ștergi serviciul?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Această acțiune este ireversibilă.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Anulează</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteService(index)}
                        className="bg-red-600 text-white hover:bg-red-800"
                      >
                        Șterge
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </li>
            ))}
          </ul>
          <Button
            onClick={addService}
            className="mt-4 bg-[#a48374] hover:bg-[#8c6f60] text-white"
          >
            + Adaugă serviciu
          </Button>
        </div>
      )}

      <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md border border-[#d6ccc2]/60 text-[#3a2d28]">
        <h3 className="text-xl font-semibold mb-4">Întrebări frecvente</h3>
        <ul className="flex flex-col gap-2">
          {editableDomain.faqs?.map((faq) => (
            <FaqItem key={faq.id} faq={faq} onDelete={removeFaqFromDomain} />
          ))}
        </ul>
        <div className="mt-4">
          <AddFaq
            setEditableDomain={setEditableDomain}
            domain={editableDomain}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-[#d6ccc2]/60">
        <Button
          onClick={handleSave}
          className="bg-[#a48374] hover:bg-[#8c6f60] text-white px-6 py-2 rounded-lg shadow-md transition active:scale-95"
        >
          Salvează Modificările
        </Button>
      </div>
    </div>
  );
}
