"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import { FaBlog, FaGlobe, FaExclamationTriangle } from "react-icons/fa";
import Notiflix from "notiflix";
import { useAppContext } from "@/context/AppContext";
import Loader from "@/components/Loader";

export default function SiteSettings() {
  const { siteSettings, refreshSiteSettings } = useAppContext();
  const [showDialog, setShowDialog] = useState(false);
  const [pendingState, setPendingState] = useState(false);

  const isActive = siteSettings?.blogMode ?? false;

  const handleSwitchClick = (checked: boolean) => {
    setPendingState(checked);
    setShowDialog(true);
  };

  const handleConfirm = async () => {
    setShowDialog(false);

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogMode: pendingState }),
      });

      if (!res.ok) throw new Error("Eroare la actualizare");
      Notiflix.Notify.success(
        pendingState
          ? "Modul BLOG ONLY activat!"
          : "Modul BLOG ONLY dezactivat!"
      );

      await refreshSiteSettings();
    } catch (err) {
      console.error("❌ Eroare la salvarea setărilor:", err);
      Notiflix.Notify.failure("A apărut o problemă la salvare!");
    }
  };

  if (!siteSettings) {
    return (
      <div className="flex items-center justify-center h-full text-[#8c6f60] font-medium animate-pulse">
        <Loader sizeClass="w-1/3 h-1/3" color="fill-white" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] rounded-xl shadow-lg p-6 border border-[#e8ddd4]/70"
    >
      <div className="flex items-center justify-between mb-5 border-b border-[#d6ccc2]/60 pb-3">
        <div className="flex items-center gap-3">
          <FaGlobe size={22} className="text-[#a48374]" />
          <h2 className="text-xl font-bold text-[#3a2d28]">Setări site</h2>
        </div>
        <p className="text-sm text-[#8c6f60]/80">
          Ultima actualizare:{" "}
          {siteSettings.updatedAt
            ? new Date(siteSettings.updatedAt).toLocaleString("ro-RO")
            : "necunoscută"}
        </p>
      </div>

      <div className="flex items-center justify-between bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-[#e8ddd4]/60">
        <div className="flex items-center gap-3">
          <FaBlog
            size={20}
            className={`${
              isActive ? "text-[#8c6f60]" : "text-gray-400"
            } transition-colors`}
          />
          <Label className="text-[#3a2d28] font-semibold">
            Modul Blog ONLY
          </Label>
        </div>
        <Switch
          checked={isActive}
          onCheckedChange={handleSwitchClick}
          className="scale-110 cursor-pointer"
        />
      </div>

      <motion.div
        key={isActive ? "active" : "inactive"}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`mt-6 p-5 rounded-lg border ${
          isActive
            ? "bg-[#a48374]/10 border-[#a48374]/40 text-[#3a2d28]"
            : "bg-[#cbad8d]/10 border-[#cbad8d]/40 text-[#3a2d28]"
        }`}
      >
        {isActive ? (
          <>
            <div className="flex items-center gap-2 mb-2">
              <FaExclamationTriangle className="text-[#a48374]" />
              <p className="font-semibold text-[#8c6f60]">
                Modul <span className="font-bold">Blog ONLY</span> este activ.
              </p>
            </div>
            <p className="text-sm leading-relaxed">
              Site-ul funcționează în regim de <strong>conținut limitat</strong>
              . Utilizatorii pot citi articolele, însă funcțiile interactive
              (contact, autentificare, etc.) sunt dezactivate temporar.
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <FaGlobe className="text-green-600" />
              <p className="font-semibold text-green-700">
                Modul <span className="font-bold">Blog ONLY</span> este inactiv.
              </p>
            </div>
            <p className="text-sm leading-relaxed">
              Site-ul este <strong>complet activ</strong>, inclusiv formularele
              și dashboard-ul.
            </p>
          </>
        )}
      </motion.div>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="bg-white rounded-xl border border-[#e8ddd4]/60">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#3a2d28] font-semibold">
              Confirmare modificare
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#8c6f60]/80">
              Sigur vrei să{" "}
              <strong>{pendingState ? "activezi" : "dezactivezi"}</strong> modul
              Blog ONLY?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-gray-100">
              Anulează
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-[#a48374] hover:bg-[#8c6f60] text-white"
            >
              Confirmă
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
