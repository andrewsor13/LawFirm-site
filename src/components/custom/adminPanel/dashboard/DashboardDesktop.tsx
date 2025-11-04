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
import { DashboardHeader } from ".";
import MetricCard from "./MetricCard";
import ActivityCard from "./ActivityCard";
import QuickActionCard from "./QuickActionCard";
import AnalyticsCard from "./AnalyticsCard";
import BlogStatistics from "./BlogStatistics";
import ClientDetails from "../clients/ClientDetails";
import CommentDetails from "../comments/CommentDetails";
import FaqDetails from "../faq/FaqDetails";
import Notiflix from "notiflix";
import type { DashboardProps, MetricData } from "./types";
import { useDashboardContext } from "./DashboardContext";

export default function DashboardDesktop({ session }: DashboardProps) {
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

  const recentComments = comments
    .filter((c) => !c.isAccepted)
    .slice(0, 5)
    .map((comment) => {
      const post = posts.find((p) => p.id === comment.postId);
      const shortText =
        comment.content.length > 120
          ? comment.content.slice(0, 120) + "..."
          : comment.content;
      return (
        <div
          key={comment.id}
          className="flex justify-between items-start border-b border-gray-100 pb-3"
        >
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <p className="font-medium text-sm text-[#2c1d16]">
                {comment.name}
              </p>
              <p className="text-xs text-gray-500 ml-3 whitespace-nowrap">
                {new Date(comment.createdAt).toLocaleDateString("ro-RO")}
              </p>
            </div>
            <p className="text-xs text-gray-600 mt-1">{shortText}</p>
            {post && (
              <a
                href={`/blog/${post.slug}`}
                className="text-xs text-[#a48374] underline hover:text-[#8c6f60] mt-1 inline-block"
                target="_blank"
              >
                {post.title}
              </a>
            )}
          </div>

          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => handleApproveComment(comment.id)}
              className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            >
              Aprobă
            </button>
            <CommentDetails
              comment={comment}
              postSlug={post?.slug}
              onApprove={handleApproveComment}
              onDelete={handleDeleteComment}
            />
          </div>
        </div>
      );
    });

  const recentClients = clients
    .filter((c) => !c.isReviewed)
    .slice(0, 5)
    .map((client) => {
      const msg =
        client.message && client.message.length > 100
          ? client.message.slice(0, 100) + "..."
          : client.message;
      return (
        <div
          key={client.id}
          className="flex justify-between items-start border-b border-gray-100 pb-3"
        >
          <div className="flex-1">
            <p className="font-medium text-sm text-[#2c1d16]">{client.name}</p>
            <p className="text-xs text-gray-600 mt-1">{msg}</p>
            <p className="text-xs text-[#5f85a6] mt-1">
              {client.email} • {client.phone}
            </p>
          </div>
          <div className="text-right ml-4">
            <ClientDetails
              client={client}
              onToggleReviewed={handleToggleReviewed}
            />
          </div>
        </div>
      );
    });

  const recentFaqs = faqs
    .filter(
      (f) =>
        (!f.text || f.text.trim() === "") && (!f.html || f.html.trim() === "")
    )
    .slice(0, 5)
    .map((faq) => (
      <div
        key={faq.id}
        className="flex justify-between items-start border-b border-gray-100 pb-3"
      >
        <div className="flex-1">
          <p className="font-medium text-sm text-[#2c1d16]">
            {faq.author || "Anonim"}
          </p>
          <p className="text-xs text-gray-700 mt-1">{faq.question}</p>
        </div>
        <FaqDetails faq={faq} />
      </div>
    ));

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

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader session={session} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <ActivityCard
            title="Comentarii în așteptare"
            items={recentComments}
            icon={MessageCircle}
            emptyMessage="Nu există comentarii noi"
          />
          <ActivityCard
            title="Mesaje clienți noi"
            items={recentClients}
            icon={Mail}
            emptyMessage="Nu există mesaje noi"
          />
          <QuickActionCard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ActivityCard
            title="Întrebări fără răspuns"
            items={recentFaqs}
            icon={HelpCircle}
            emptyMessage="Toate întrebările au răspuns 🎉"
          />
          <AnalyticsCard analyticsData={analytics} loading={loading} />
          <BlogStatistics posts={posts} comments={comments} />
        </div>
      </div>
    </div>
  );
}
