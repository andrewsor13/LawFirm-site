"use client";

import { ContactData } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ContactContextType {
  contact: ContactData | null;
  loading: boolean;
  error: string | null;
  refreshContact: () => Promise<void>;
  updateContact: (data: Partial<ContactData>) => Promise<void>;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [contact, setContact] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    refreshContact();
  }, []);

  const refreshContact = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", { method: "GET" });
      if (!res.ok) throw new Error("Eroare la fetch contact");
      const data = await res.json();
      setContact(data);
    } catch (err) {
      console.error(err);
      setError("Eroare la încărcarea datelor de contact");
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async (data: Partial<ContactData>) => {
    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Eroare la update contact");
      setContact(result.contact);
    } catch (err) {
      console.error(err);
      setError("Eroare la actualizarea contactului");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactContext.Provider
      value={{ contact, loading, error, refreshContact, updateContact }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContactContext = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error(
      "useContactContext trebuie folosit în interiorul ContactProvider"
    );
  }
  return context;
};
