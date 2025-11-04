import { google } from "googleapis";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), "google-service-account.json"),
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
    });

    const analyticsData = google.analyticsdata("v1beta");

    const response = await analyticsData.properties.runReport({
      property: "properties/YOUR_GA4_PROPERTY_ID",
      auth,
      requestBody: {
        dateRanges: [{ startDate: "today", endDate: "today" }],
        metrics: [{ name: "activeUsers" }],
      },
    });

    const activeUsers =
      response.data.rows?.[0]?.metricValues?.[0]?.value || "0";

    return NextResponse.json({ activeUsers });
  } catch (error) {
    console.error("GA Error:", error);
    return NextResponse.json({ activeUsers: "N/A" }, { status: 500 });
  }
}
