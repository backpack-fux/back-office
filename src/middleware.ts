import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("pyv2_auth_token");
  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");
  const isHomePage = request.nextUrl.pathname === "/";
  const isCalendarRoute = request.nextUrl.pathname === "/calendar";

  if (authToken) {
    // User is authenticated
    if (isAuthRoute) {
      // Redirect authenticated users from auth routes to the dashboard
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (isHomePage) {
      // Rewrite authenticated users from home page to the dashboard
      return NextResponse.rewrite(new URL("/dashboard", request.url));
    }
  } else {
    // User is not authenticated
    if (!isAuthRoute && (isDashboardRoute || isHomePage)) {
      // Rewrite unauthenticated users from home page to the auth route
      return NextResponse.rewrite(new URL("/auth", request.url));
    }
  }

  // Allow the request to proceed if no redirection is needed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
