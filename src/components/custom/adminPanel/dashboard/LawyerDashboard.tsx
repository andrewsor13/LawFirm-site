"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import {
  TrendingUp,
  TrendingDown,
  FileText,
  MessageCircle,
  Eye,
  Clock,
  HelpCircle,
  Mail,
  Users,
  BarChart3,
  Calendar,
  Activity,
  LucideIcon,
} from "lucide-react";
import { RxAvatar } from "react-icons/rx";

interface Comment {
  id: number;
  name: string;
  content: string;
  isAccepted: boolean;
  postId: number;
  createdAt?: string;
  replies?: Reply[];
}

interface Reply {
  id: number;
  name: string;
  content: string;
  isAccepted: boolean;
  postId: number;
  createdAt?: string;
}

interface Posts {
  id: number;
  title: string;
  slug: string;
  imageUrl?: string;
  content?: string;
  createdAt: Date;
  _count: {
    comments: number;
  };
}

interface ClientDocument {
  id: number;
  fileName: string;
  fileLink: string;
  createdAt: string;
  clientId: number;
}

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  isReviewed: boolean;
  documents: ClientDocument[];
}

interface Faq {
  id: number;
  author?: string | null;
  email?: string | null;
  question: string;
  slug: string;
  text?: string;
  html?: string;
  domainId?: number | undefined;
  createdAt: string;
  updatedAt: string;
}

interface AnalyticsData {
  totalUsers: number;
  totalPageViews: number;
  totalSessions: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: PageView[];
  usersByDevice: DeviceData[];
  usersByCountry: CountryData[];
}

interface PageView {
  page: string;
  views: number;
  uniqueUsers: number;
}

interface DeviceData {
  deviceCategory: string;
  users: number;
  percentage: number;
}

interface CountryData {
  country: string;
  users: number;
}

interface LoadingState {
  posts: boolean;
  analytics: boolean;
  faqs: boolean;
}

interface MetricData {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: "up" | "down";
  trendValue?: string;
  loading?: boolean;
  subtitle?: string;
}

interface QuickAction {
  icon: LucideIcon;
  label: string;
  color: string;
  onClick?: () => void;
}

interface LoaderProps {
  sizeClass?: string;
  color?: string;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: "up" | "down";
  trendValue?: string;
  loading?: boolean;
  subtitle?: string;
}

interface ActivityCardProps {
  title: string;
  items: React.ReactNode[];
  icon: LucideIcon;
  emptyMessage?: string;
}

interface AnalyticsCardProps {
  analyticsData: AnalyticsData | null;
  loading: boolean;
}

interface BlogStatsProps {
  posts: Posts[];
  comments: Comment[];
}

interface DashboardProps {
  analyticsData?: AnalyticsData | null;
  session?: {
    user?: {
      name?: string;
      email?: string;
      role?: string;
    };
  };
}

interface DashboardHeaderProps {
  session?: {
    user?: {
      name?: string;
      email?: string;
      role?: string;
    };
  };
}

const fetcher = async <T,>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

const mockAnalyticsData: AnalyticsData = {
  totalUsers: 2547,
  totalPageViews: 8934,
  totalSessions: 3421,
  averageSessionDuration: 245,
  bounceRate: 32.5,
  topPages: [
    { page: "/blog/drepturile-consumatorului", views: 1250, uniqueUsers: 987 },
    { page: "/servicii/consultanta-juridica", views: 980, uniqueUsers: 745 },
    { page: "/despre-noi", views: 750, uniqueUsers: 623 },
  ],
  usersByDevice: [
    { deviceCategory: "Mobile", users: 1523, percentage: 59.8 },
    { deviceCategory: "Desktop", users: 892, percentage: 35.0 },
    { deviceCategory: "Tablet", users: 132, percentage: 5.2 },
  ],
  usersByCountry: [
    { country: "Romania", users: 2234 },
    { country: "Moldova", users: 234 },
    { country: "Italy", users: 79 },
  ],
};

function Loader({
  sizeClass = "w-8 h-8",
  color = "fill-[#cbad8d]",
}: LoaderProps) {
  return (
    <div className={`${sizeClass} animate-spin`}>
      <svg
        className={`${sizeClass} ${color}`}
        viewBox="0 0 100 101"
        fill="none"
      >
        <path
          d="m100 50.5908c0 27.2013-22.0914 49.2927-49.2927 49.2927-27.2013 0-49.2927-22.0914-49.2927-49.2927 0-27.2013 22.0914-49.2927 49.2927-49.2927 27.2013 0 49.2927 22.0914 49.2927 49.2927z"
          fill="currentColor"
        />
        <path
          d="m93.9676 39.0409c0-15.0816-12.2093-27.2909-27.2909-27.2909-15.0816 0-27.2909 12.2093-27.2909 27.2909 0 15.0816 12.2093 27.2909 27.2909 27.2909 15.0816 0 27.2909-12.2093 27.2909-27.2909z"
          fill="currentFill"
        />
      </svg>
    </div>
  );
}

function DashboardHeader({ session }: DashboardHeaderProps) {
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bună dimineața";
    if (hour < 18) return "Bună ziua";
    return "Bună seara";
  };

  return (
    <div className="mb-8">
      <div
        style={{
          background:
            "linear-gradient(135deg, #cbad8d 0%, #a48374 50%, #8c6f60 100%)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
        }}
        className="rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  style={{ backgroundColor: "#f5f0eb" }}
                  className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <RxAvatar size={48} className="text-[#8c6f60]" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-4 border-white" />
              </div>

              <div>
                <p className="text-sm opacity-90 mb-1">{getGreeting()},</p>
                <h1 className="text-3xl font-bold mb-1">
                  {session?.user?.name || "Admin"}
                </h1>
                <div className="flex items-center gap-3 text-sm opacity-90">
                  <span className="flex items-center gap-1">
                    <Mail size={14} />
                    {session?.user?.email}
                  </span>
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-semibold">
                    {session?.user?.role || "Administrator"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mb-2 mx-auto">
                  <Calendar size={24} />
                </div>
                <p className="text-xs opacity-75 mb-1">Data</p>
                <p className="font-semibold text-sm">
                  {new Date().toLocaleDateString("ro-RO", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mb-2 mx-auto">
                  <Activity size={24} />
                </div>
                <p className="text-xs opacity-75 mb-1">Status</p>
                <p className="font-semibold text-sm">Activ</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-lg opacity-95">
              Bine ai revenit! Iată o privire de ansamblu asupra activității din
              cabinet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  loading = false,
  subtitle = "",
}: MetricCardProps) {
  return (
    <div className="transform hover:scale-105 transition-all duration-300">
      <div
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
          borderColor: "rgba(203, 173, 141, 0.2)",
        }}
        className="h-40 rounded-xl p-6 border shadow-md hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-3">
          <div
            style={{
              background: "linear-gradient(135deg, #cbad8d 0%, #a48374 100%)",
            }}
            className="p-2.5 rounded-lg shadow-md"
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          {trend && trendValue && (
            <div
              className={`flex items-center text-sm font-semibold ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {trendValue}
            </div>
          )}
        </div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
        <div className="flex items-center justify-center h-12">
          {loading ? (
            <Loader sizeClass="w-8 h-8" color="fill-[#cbad8d]" />
          ) : (
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{value}</div>
              {subtitle && (
                <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActivityCard({
  title,
  items,
  icon: Icon,
  emptyMessage = "Nu există date",
}: ActivityCardProps) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
        borderColor: "rgba(203, 173, 141, 0.2)",
      }}
      className="rounded-xl p-6 border shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        <div
          style={{
            background: "linear-gradient(135deg, #5f85a6 0%, #8c6f60 100%)",
          }}
          className="p-2.5 rounded-lg mr-3 shadow-md"
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              style={{ borderLeftColor: "#cbad8d" }}
              className="p-3 bg-gray-50 rounded-lg border-l-4 hover:bg-gray-100 transition-colors"
            >
              {item}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            <Icon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function QuickActionCard() {
  const actions: QuickAction[] = [
    {
      icon: FileText,
      label: "Articol nou",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: MessageCircle,
      label: "Moderare comentarii",
      color: "from-green-500 to-green-600",
    },
    {
      icon: HelpCircle,
      label: "FAQ nou",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Mail,
      label: "Mesaje clienți",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
        borderColor: "rgba(203, 173, 141, 0.2)",
      }}
      className="rounded-xl p-6 border shadow-md"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Acțiuni rapide
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center p-4 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105"
          >
            <div
              className={`p-3 rounded-lg bg-gradient-to-r ${action.color} mb-2 shadow-md`}
            >
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 text-center">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AnalyticsCard({ analyticsData, loading }: AnalyticsCardProps) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
        borderColor: "rgba(203, 173, 141, 0.2)",
      }}
      className="rounded-xl p-6 border shadow-md"
    >
      <div className="flex items-center mb-4">
        <div
          style={{
            background: "linear-gradient(135deg, #cbad8d 0%, #a48374 100%)",
          }}
          className="p-2.5 rounded-lg mr-3 shadow-md"
        >
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          Google Analytics
        </h3>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <Loader sizeClass="w-8 h-8" color="fill-[#cbad8d]" />
        </div>
      ) : analyticsData ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium">Utilizatori activi:</span>
            <span className="text-sm font-bold">
              {analyticsData.totalUsers.toLocaleString("ro-RO")}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium">Vizualizări pagină:</span>
            <span className="text-sm font-bold">
              {analyticsData.totalPageViews.toLocaleString("ro-RO")}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium">Durata medie sesiune:</span>
            <span className="text-sm">
              {Math.round(analyticsData.averageSessionDuration / 60)}:
              {String(analyticsData.averageSessionDuration % 60).padStart(
                2,
                "0"
              )}{" "}
              min
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium">Rata de respingere:</span>
            <span className="text-sm">
              {analyticsData.bounceRate.toFixed(1)}%
            </span>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <BarChart3 className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>Conectați Google Analytics</p>
        </div>
      )}
    </div>
  );
}

function BlogStatistics({ posts, comments }: BlogStatsProps) {
  const totalComments = comments.filter((c: Comment) => c.isAccepted).length;
  const averageCommentsPerPost =
    posts.length > 0 && totalComments > 0
      ? (totalComments / posts.length).toFixed(1)
      : "0";
  const mostCommentedPost =
    posts.length > 0
      ? posts.reduce(
          (prev, current) =>
            prev._count.comments > current._count.comments ? prev : current,
          posts[0]
        )
      : null;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
        borderColor: "rgba(203, 173, 141, 0.2)",
      }}
      className="rounded-xl p-6 border shadow-md"
    >
      <div className="flex items-center mb-4">
        <div
          style={{
            background: "linear-gradient(135deg, #cbad8d 0%, #a48374 100%)",
          }}
          className="p-2.5 rounded-lg mr-3 shadow-md"
        >
          <FileText className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Statistici Blog</h3>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">Total articole:</span>
          <span className="text-sm font-bold">{posts.length}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">Total comentarii:</span>
          <span className="text-sm font-bold">{totalComments}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">Comentarii medii/articol:</span>
          <span className="text-sm">{averageCommentsPerPost}</span>
        </div>
        {mostCommentedPost && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium">Cel mai comentat:</span>
            <p className="text-xs text-[#5f85a6] mt-1">
              {mostCommentedPost.title}
            </p>
            <p className="text-xs text-gray-500">
              {mostCommentedPost._count.comments} comentarii
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LawyerDashboard({
  analyticsData: propAnalyticsData,
  session,
}: DashboardProps = {}) {
  const [loading, setLoading] = useState<LoadingState>({
    posts: true,
    analytics: false,
    faqs: true,
  });
  const { data: comments, isLoading: commentsLoading } = useSWR<Comment[]>(
    "/api/comments",
    fetcher
  );
  const { data: clients, isLoading: clientsLoading } = useSWR<Client[]>(
    "/api/clients",
    fetcher
  );
  const [posts, setPosts] = useState<Posts[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const [postsRes, faqsRes] = await Promise.all([
          fetch("/api/posts"),
          fetch("/api/faq"),
        ]);

        if (postsRes.ok) setPosts((await postsRes.json()) || []);
        if (faqsRes.ok) setFaqs((await faqsRes.json()) || []);

        setLoading((prev) => ({ ...prev, posts: false, faqs: false }));
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading((prev) => ({ ...prev, posts: false, faqs: false }));
      }
    };
    fetchStaticData();
  }, []);

  const analyticsData: AnalyticsData | null =
    propAnalyticsData || mockAnalyticsData;

  const handleApproveComment = (commentId: number): void => {
    console.log(`Approving comment ${commentId}`);
  };

  const handleRejectComment = (commentId: number): void => {
    console.log(`Rejecting comment ${commentId}`);
  };

  const metrics: MetricData[] = [
    {
      title: "Comentarii noi",
      value: comments
        ? comments.filter((c: Comment) => !c.isAccepted).length
        : 0,
      icon: MessageCircle,
      trend: "up",
      trendValue: "+12%",
      loading: commentsLoading,
    },
    {
      title: "Total comentarii",
      value: comments
        ? comments.filter((c: Comment) => c.isAccepted).length
        : 0,
      icon: MessageCircle,
      loading: commentsLoading,
    },
    {
      title: "Articole publicate",
      value: posts.length,
      icon: FileText,
      trend: "up",
      trendValue: "+5%",
      loading: loading.posts,
    },
    {
      title: "Mesaje clienți noi",
      value: clients ? clients.filter((c: Client) => !c.isReviewed).length : 0,
      icon: Mail,
      trend: "up",
      trendValue: "+3",
      loading: clientsLoading,
    },
    {
      title: "Total clienți",
      value: clients ? clients.length : 0,
      icon: Users,
      subtitle: "contacte primite",
      loading: clientsLoading,
    },
    {
      title: "Întrebări FAQ",
      value: faqs.length,
      icon: HelpCircle,
      subtitle: "publicate",
      loading: loading.faqs,
    },
    {
      title: "Utilizatori activi",
      value: analyticsData?.totalUsers.toLocaleString("ro-RO") || "N/A",
      icon: Users,
      trend: "up",
      trendValue: "+18%",
      loading: loading.analytics,
    },
    {
      title: "Vizualizări pagină",
      value: analyticsData?.totalPageViews.toLocaleString("ro-RO") || "N/A",
      icon: Eye,
      trend: "up",
      trendValue: "+25%",
      loading: loading.analytics,
    },
    {
      title: "Durata medie sesiune",
      value: analyticsData
        ? `${Math.round(analyticsData.averageSessionDuration / 60)}:${String(
            analyticsData.averageSessionDuration % 60
          ).padStart(2, "0")}`
        : "N/A",
      icon: Clock,
      subtitle: "minute",
      loading: loading.analytics,
    },
  ];

  const recentComments: React.ReactNode[] = comments
    ? comments
        .filter((c: Comment) => !c.isAccepted)
        .slice(0, 5)
        .map((comment: Comment) => (
          <div key={comment.id} className="flex justify-between items-start">
            <div>
              <p className="font-medium text-sm">{comment.name}</p>
              <p className="text-xs text-gray-600 mt-1">{comment.content}</p>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => handleApproveComment(comment.id)}
                className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
              >
                Aprobă
              </button>
              <button
                onClick={() => handleRejectComment(comment.id)}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Respinge
              </button>
            </div>
          </div>
        ))
    : [];

  const recentClients: React.ReactNode[] = clients
    ? clients
        .filter((c: Client) => !c.isReviewed)
        .slice(0, 5)
        .map((client: Client) => (
          <div key={client.id} className="flex justify-between items-start">
            <div>
              <p className="font-medium text-sm">{client.name}</p>
              <p className="text-xs text-gray-600 mt-1">{client.message}</p>
              <p className="text-xs text-[#5f85a6] mt-1">
                {client.email} • {client.phone}
              </p>
            </div>
            <div className="text-right ml-4">
              <p className="text-xs text-gray-500">
                {new Date(client.createdAt).toLocaleDateString("ro-RO")}
              </p>
              <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors mt-1">
                Vezi
              </button>
            </div>
          </div>
        ))
    : [];

  const recentFaqs: React.ReactNode[] = faqs.slice(0, 5).map((faq: Faq) => (
    <div key={faq.id} className="flex justify-between items-start">
      <div>
        <p className="font-medium text-sm">{faq.question}</p>
        {faq.author && (
          <p className="text-xs text-gray-600 mt-1">Autor: {faq.author}</p>
        )}
      </div>
      <div className="text-right ml-4">
        <p className="text-xs text-gray-500">
          {new Date(faq.updatedAt).toLocaleDateString("ro-RO")}
        </p>
      </div>
    </div>
  ));

  return (
    <div
      style={{ background: "white", minHeight: "100vh", padding: "2rem 1rem" }}
    >
      <div className="max-w-7xl mx-auto">
        <DashboardHeader session={session} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric: MetricData, index: number) => (
            <MetricCard key={index} {...metric} />
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
            title="FAQ recente"
            items={recentFaqs}
            icon={HelpCircle}
            emptyMessage="Nu există întrebări FAQ"
          />
          <AnalyticsCard
            analyticsData={analyticsData}
            loading={loading.analytics}
          />
          <BlogStatistics posts={posts} comments={comments || []} />
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbad8d;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a48374;
        }
      `}</style>
    </div>
  );
}
