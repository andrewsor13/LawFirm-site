"use client";

import React from "react";
import {
  MessageCircle,
  FileText,
  Mail,
  Users,
  HelpCircle,
  Eye,
  Clock,
} from "lucide-react";
import DashboardHeader from "./DashboardHeader";
import MetricCard from "./MetricCard";
import ActivityCard from "./ActivityCard";
import QuickActionCard from "./QuickActionCard";
import AnalyticsCard from "./AnalyticsCard";
import BlogStatistics from "./BlogStatistics";
import ClientDetails from "../clients/ClientDetails";
import CommentDetails from "../comments/CommentDetails";
import FaqDetails from "../faq/FaqDetails";
import Notiflix from "notiflix";
import { useDashboardContext } from "./DashboardContext";
import type { DashboardProps, MetricData } from "./types";

export default function DashboardMobile({ session }: DashboardProps) {
  const {
    comments,
    clients,
    posts,
    faqs,
    analytics,
    loading,
    refreshComments,
    refreshClients,
  } = useDashboardContext();

  const handleApproveComment = async (id: number) => {
    const res = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isAccepted: true }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      Notiflix.Notify.success("Comentariu aprobat!");
      refreshComments();
    } else Notiflix.Notify.failure("Eroare la aprobarea comentariului.");
  };

  const handleDeleteComment = async (id: number) => {
    const res = await fetch(`/api/comments/${id}`, { method: "DELETE" });
    if (res.ok) {
      Notiflix.Notify.success("Comentariu șters!");
      refreshComments();
    } else Notiflix.Notify.failure("Eroare la ștergerea comentariului.");
  };

  const handleToggleReviewed = async (
    id: number,
    value: boolean,
    name: string
  ) => {
    const res = await fetch(`/api/clients/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isReviewed: value }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      Notiflix.Notify.success(`Clientul ${name} a fost actualizat!`);
      refreshClients();
    } else Notiflix.Notify.failure("Eroare la actualizarea clientului.");
  };

  const metrics: MetricData[] = [
    {
      title: "Comentarii noi",
      value: comments.filter((c) => !c.isAccepted).length,
      icon: MessageCircle,
      loading: loading,
    },
    {
      title: "Total comentarii",
      value: comments.filter((c) => c.isAccepted).length,
      icon: MessageCircle,
      loading: loading,
    },
    {
      title: "Articole publicate",
      value: posts.length,
      icon: FileText,
      loading: loading,
    },
    {
      title: "Mesaje clienți noi",
      value: clients.filter((c) => !c.isReviewed).length,
      icon: Mail,
      loading: loading,
    },
    {
      title: "Total clienți",
      value: clients.length,
      icon: Users,
      subtitle: "contacte primite",
      loading: loading,
    },
    {
      title: "Întrebări FAQ",
      value: faqs.length,
      icon: HelpCircle,
      subtitle: "publicate",
      loading: loading,
    },
    {
      title: "Utilizatori activi",
      value: analytics.totalUsers.toLocaleString("ro-RO"),
      icon: Users,
      loading: loading,
    },
    {
      title: "Vizualizări pagină",
      value: analytics.totalPageViews.toLocaleString("ro-RO"),
      icon: Eye,
      loading: loading,
    },
    {
      title: "Durata medie sesiune",
      value: `${Math.floor(analytics.averageSessionDuration / 60)}:${String(
        analytics.averageSessionDuration % 60
      ).padStart(2, "0")}`,
      icon: Clock,
      subtitle: "minute",
      loading: loading,
    },
  ];

  const recentComments = comments
    .filter((c) => !c.isAccepted)
    .slice(0, 3)
    .map((comment) => {
      const relatedPost = posts.find((p) => p.id === comment.postId);
      const shortText =
        comment.content.length > 100
          ? comment.content.slice(0, 100) + "..."
          : comment.content;
      return (
        <div key={comment.id} className="border-b border-gray-200 pb-3">
          <p className="text-sm font-medium text-[#2c1d16]">{comment.name}</p>
          <p className="text-xs text-gray-600 mt-1">{shortText}</p>
          {relatedPost && (
            <a
              href={`/blog/${relatedPost.slug}`}
              className="text-xs text-[#a48374] underline mt-1 block"
              target="_blank"
            >
              {relatedPost.title}
            </a>
          )}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleApproveComment(comment.id)}
              className="text-[10px] bg-green-500 text-white px-2 py-1 rounded"
            >
              Aprobă
            </button>
            <CommentDetails
              comment={comment}
              postSlug={relatedPost?.slug}
              onApprove={handleApproveComment}
              onDelete={handleDeleteComment}
            />
          </div>
        </div>
      );
    });

  const recentClients = clients
    .filter((c) => !c.isReviewed)
    .slice(0, 3)
    .map((client) => (
      <div key={client.id} className="border-b border-gray-200 pb-3">
        <p className="text-sm font-medium text-[#2c1d16]">{client.name}</p>
        <p className="text-xs text-gray-600 mt-1">{client.message}</p>
        <p className="text-xs text-[#5f85a6] mt-1">
          {client.email} • {client.phone}
        </p>
        <ClientDetails
          client={client}
          onToggleReviewed={handleToggleReviewed}
        />
      </div>
    ));

  const recentFaqs = faqs
    .filter(
      (f) =>
        (!f.text || f.text.trim() === "") && (!f.html || f.html.trim() === "")
    )
    .slice(0, 5)
    .map((faq) => (
      <div key={faq.id} className="border-b border-gray-200 pb-3">
        <p className="text-sm font-medium text-[#2c1d16]">
          {faq.author || "Anonim"}
        </p>
        <p className="text-xs text-gray-700 mt-1">{faq.question}</p>
        <FaqDetails faq={faq} />
      </div>
    ));

  return (
    <div className="px-4 py-6 space-y-6 bg-white min-h-screen">
      <DashboardHeader session={session} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>

      <QuickActionCard />
      <ActivityCard
        title="Comentarii în așteptare"
        items={recentComments}
        icon={MessageCircle}
        emptyMessage="Niciun comentariu nou"
      />
      <ActivityCard
        title="Mesaje clienți"
        items={recentClients}
        icon={Mail}
        emptyMessage="Niciun mesaj nou"
      />
      <ActivityCard
        title="Întrebări fără răspuns"
        items={recentFaqs}
        icon={HelpCircle}
        emptyMessage="Toate întrebările au fost răspunse 🎉"
      />
      <AnalyticsCard analyticsData={analytics} loading={loading} />
      <BlogStatistics posts={posts} comments={comments} />
    </div>
  );
}
