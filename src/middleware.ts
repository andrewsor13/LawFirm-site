import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    if (pathname === "/login" && req.nextauth.token) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }

    if (pathname === "/admin" && !req.nextauth.token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.search = "";
      return NextResponse.redirect(url);
    }

    if (pathname === "/admin" && req.nextauth.token) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        if (pathname.startsWith("/admin")) {
          return !!token?.role;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin", "/admin/:path*", "/login"],
};
