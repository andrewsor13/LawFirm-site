import type { LucideIcon } from "lucide-react";

import type { Session } from "next-auth";

export interface Reply {
  id: number;
  name: string;
  content: string;
  isAccepted: boolean;
  postId: number;
  createdAt?: string;
}

export interface Comment {
  id: number;
  name: string;
  content: string;
  isAccepted: boolean;
  postId: number;
  createdAt: string;
  replies?: Reply[];
}

export interface Posts {
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

export interface ClientDocument {
  id: number;
  fileName: string;
  fileLink: string;
  createdAt: string;
  clientId: number;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  isReviewed: boolean;
  documents: ClientDocument[];
}

export interface Faq {
  id: number;
  author?: string | null;
  email?: string | null;
  question: string;
  slug: string;
  text?: string;
  html?: string;
  domainId?: number | undefined;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PageView {
  page: string;
  views: number;
  uniqueUsers: number;
}

export interface DeviceData {
  deviceCategory: string;
  users: number;
  percentage: number;
}

export interface CountryData {
  country: string;
  users: number;
}

export interface AnalyticsData {
  totalUsers: number;
  totalPageViews: number;
  totalSessions: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: PageView[];
  usersByDevice: DeviceData[];
  usersByCountry: CountryData[];
}

export interface LoadingState {
  posts: boolean;
  analytics: boolean;
  faqs: boolean;
}

export interface MetricData {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: "up" | "down";
  trendValue?: string;
  loading?: boolean;
  subtitle?: string;
}

export interface QuickAction {
  icon: LucideIcon;
  label: string;
  color: string;
  href: string;
  onClick?: () => void;
}

export interface LoaderProps {
  sizeClass?: string;
  color?: string;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: "up" | "down";
  trendValue?: string;
  loading?: boolean;
  subtitle?: string;
}

export interface ActivityCardProps {
  title: string;
  items: React.ReactNode[];
  icon: LucideIcon;
  emptyMessage?: string;
}

export interface AnalyticsCardProps {
  analyticsData: AnalyticsData | null;
  loading: boolean;
}

export interface BlogStatsProps {
  posts: Posts[];
  comments: Comment[];
}

export interface DashboardProps {
  analyticsData?: AnalyticsData | null;
  session?: Session | null;
}

export interface DashboardHeaderProps {
  session?: Session | null;
}
