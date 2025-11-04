"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { SiteSettingsType } from "@/lib/types";

interface SiteSettingsContextType {
  settings: SiteSettingsType | null;
  isActive: boolean;
  loading: boolean;
  updateSettings: (newValue: boolean) => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(
  undefined
);

export const SiteSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState<SiteSettingsType | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const res = await fetch("/api/settings", { method: "GET" });
        const data = await res.json();

        const siteSettings: SiteSettingsType = Array.isArray(data)
          ? data[0]
          : data;

        setSettings(siteSettings);
        setIsActive(siteSettings.blogMode);
      } catch (error) {
        console.error("Eroare la fetch settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSiteSettings();
  }, []);

  const updateSettings = async (newValue: boolean) => {
    try {
      setLoading(true);
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogMode: newValue }),
      });

      const updated: SiteSettingsType = await res.json();
      setSettings(updated);
      setIsActive(updated.blogMode);
    } catch (error) {
      console.error("Eroare la update settings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteSettingsContext.Provider
      value={{ settings, isActive, loading, updateSettings }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettingsContext = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error(
      "useSiteSettingsContext trebuie folosit în interiorul SiteSettingsProvider"
    );
  }
  return context;
};
