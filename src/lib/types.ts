export interface AdminUser {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
}

export interface SessionUser {
  id: number;
  email: string;
  role: string;
  name: string;
}

export type Reply = {
  id: number;
  name: string;
  content: string;
  isAccepted: boolean;
  postId: number;
  createdAt?: string;
};

export type Comment = {
  id: number;
  name: string;
  content: string;
  isAccepted: boolean;
  postId: number;
  createdAt?: string;
  replies?: Reply[];
};

export type Posts = {
  id: number;
  title: string;
  slug: string;
  imageUrl?: string;
  content?: string;
  createdAt: string;
  _count: {
    comments: number;
  };
};

export type RouteParams = {
  params: Promise<{ id: string }>;
};
export type RouteSlugParams = {
  params: Promise<{ slug: string }>;
};

export type Document = {
  id: number;
  fileName: string;
  fileLink: string;
  createdAt: string;
  clientId: number;
};

export type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  isReviewed: boolean;
  documents: Document[];
};

export type Pages = {
  id: number;
  slug: string;
  title: string;
  content: string;
  updatedAt?: string;
  createdAt?: string;
};

export interface Faq {
  id: number;
  author?: string | null;
  email?: string | null;
  question: string;
  slug?: string;
  text?: string;
  html?: string;
  domainId?: number | undefined;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

export interface Domain {
  id: number;
  title: string;
  slug: string;
  icon: string;
  description: string;
  blogOnlyDescription?: string | null;
  detailedDescription?: string | null;
  blogOnlyDetailedDescription?: string | null;
  imagePath?: string | null;
  faqImage?: string | null;
  services: string[];
  faqs: Faq[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DomainProps {
  domain: Domain;
  iconSize?: number;
}

export interface Lawyer {
  id: number;
  name: string;
  photo: string | null;
  photoName: string | null;
  description: string;
  createdAt: Date;
  updatedAt: Date;
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

export interface SiteSettingsType {
  id: string;
  blogMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactData {
  id?: number;
  phone: string;
  email: string;
  address: string;
  mapEmbed: string;
}
