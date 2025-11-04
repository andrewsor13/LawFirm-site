"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type {
  Domain,
  SiteSettingsType,
  ContactData,
  Posts,
  SessionUser,
} from "@/lib/types";

type DomainSummary = Pick<
  Domain,
  | "id"
  | "title"
  | "slug"
  | "icon"
  | "description"
  | "blogOnlyDescription"
  | "createdAt"
  | "updatedAt"
>;

type PostSummary = Pick<
  Posts,
  "id" | "title" | "slug" | "createdAt" | "imageUrl"
>;

interface AppContextType {
  siteSettings: SiteSettingsType | null;
  contact: ContactData | null;
  domains: DomainSummary[];
  posts: PostSummary[];
  session: SessionUser | null;

  selectedDomain: Domain | null;
  setSelectedDomain: (slugOrDomain: string | Domain) => Promise<void>;

  refreshSiteSettings: () => Promise<void>;
  refreshContact: () => Promise<void>;
  refreshDomains: () => Promise<void>;
  refreshPosts: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [siteSettings, setSiteSettings] = useState<SiteSettingsType | null>(
    null
  );
  const [contact, setContact] = useState<ContactData | null>(null);
  const [domains, setDomains] = useState<DomainSummary[]>([]);
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [session, setSession] = useState<SessionUser | null>(null);
  const [selectedDomain, setSelectedDomainState] = useState<Domain | null>(
    null
  );

  useEffect(() => {
    async function loadHomepageData() {
      try {
        const [settingsRes, contactRes, domainsRes, postsRes, sessionRes] =
          await Promise.allSettled([
            fetch("/api/settings"),
            fetch("/api/contact"),
            fetch("/api/domains?fields=basic"),
            fetch("/api/posts?fields=basic"),
            fetch("/api/auth/session"),
          ]);

        if (settingsRes.status === "fulfilled" && settingsRes.value.ok)
          setSiteSettings(await settingsRes.value.json());

        if (contactRes.status === "fulfilled" && contactRes.value.ok)
          setContact(await contactRes.value.json());

        if (domainsRes.status === "fulfilled" && domainsRes.value.ok)
          setDomains(await domainsRes.value.json());

        if (postsRes.status === "fulfilled" && postsRes.value.ok)
          setPosts(await postsRes.value.json());

        if (sessionRes.status === "fulfilled" && sessionRes.value.ok)
          setSession(await sessionRes.value.json());
      } catch (err) {
        console.error("❌ Failed to load homepage data:", err);
      }
    }

    loadHomepageData();
  }, []);

  const setSelectedDomain = async (slugOrDomain: string | Domain) => {
    try {
      if (typeof slugOrDomain !== "string") {
        setSelectedDomainState(slugOrDomain);
        return;
      }

      const cached = domains.find((d) => d.slug === slugOrDomain);
      if (cached && selectedDomain?.slug !== cached.slug) {
        const res = await fetch(`/api/domains/domain/${slugOrDomain}`);
        if (res.ok) {
          const data: Domain = await res.json();
          setSelectedDomainState(data);
        } else {
          console.warn("Domain not found:", slugOrDomain);
        }
      } else if (!cached) {
        const res = await fetch(`/api/domains/domain/${slugOrDomain}`);
        if (res.ok) setSelectedDomainState(await res.json());
      }
    } catch (err) {
      console.error("Error fetching domain:", err);
    }
  };

  const refreshSiteSettings = async () => {
    const res = await fetch("/api/settings");
    if (res.ok) setSiteSettings(await res.json());
  };

  const refreshContact = async () => {
    const res = await fetch("/api/contact");
    if (res.ok) setContact(await res.json());
  };

  const refreshDomains = async () => {
    const res = await fetch("/api/domains?fields=basic");
    if (res.ok) setDomains(await res.json());
  };

  const refreshPosts = async () => {
    const res = await fetch("/api/posts?fields=basic");
    if (res.ok) setPosts(await res.json());
  };

  return (
    <AppContext.Provider
      value={{
        siteSettings,
        contact,
        domains,
        posts,
        session,
        selectedDomain,
        setSelectedDomain,
        refreshSiteSettings,
        refreshContact,
        refreshDomains,
        refreshPosts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx)
    throw new Error(
      "useAppContext trebuie folosit doar în interiorul <AppProvider />"
    );
  return ctx;
}
