import type { AnalyticsData } from "../types";

export const mockAnalyticsData: AnalyticsData = {
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
