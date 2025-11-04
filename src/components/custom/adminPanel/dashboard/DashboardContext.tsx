"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Comment, Client, Posts, Faq, AnalyticsData } from "./types";
import { safeFetcher } from "./utils/fetcher";
import { mockAnalyticsData } from "./analytics/mock";

interface DashboardContextType {
  comments: Comment[];
  clients: Client[];
  posts: Posts[];
  faqs: Faq[];
  analytics: AnalyticsData;
  loading: boolean;

  refreshComments: () => Promise<void>;
  refreshClients: () => Promise<void>;
  refreshPosts: () => Promise<void>;
  refreshFaqs: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  //   const [analytics, setAnalytics] = useState<AnalyticsData>(mockAnalyticsData);
  const [loading, setLoading] = useState(true);
  const analytics = mockAnalyticsData;

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [comments, clients, posts, faqs] = await Promise.all([
          safeFetcher<Comment[]>("/api/comments"),
          safeFetcher<Client[]>("/api/clients"),
          safeFetcher<Posts[]>("/api/posts?fields=basic"),
          safeFetcher<Faq[]>("/api/faq"),
        ]);

        if (comments) setComments(comments);
        if (clients) setClients(clients);
        if (posts) setPosts(posts);
        if (faqs) setFaqs(faqs);
      } catch (err) {
        console.error("❌ Dashboard fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  const refreshComments = async () => {
    const res = await fetch("/api/comments");
    if (res.ok) setComments(await res.json());
  };

  const refreshClients = async () => {
    const res = await fetch("/api/clients");
    if (res.ok) setClients(await res.json());
  };

  const refreshPosts = async () => {
    const res = await fetch("/api/posts");
    if (res.ok) setPosts(await res.json());
  };

  const refreshFaqs = async () => {
    const res = await fetch("/api/faq");
    if (res.ok) setFaqs(await res.json());
  };

  return (
    <DashboardContext.Provider
      value={{
        comments,
        clients,
        posts,
        faqs,
        analytics,
        loading,
        refreshComments,
        refreshClients,
        refreshPosts,
        refreshFaqs,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const ctx = useContext(DashboardContext);
  if (!ctx)
    throw new Error("useDashboardContext trebuie folosit în DashboardProvider");
  return ctx;
}
