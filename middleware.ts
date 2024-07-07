import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token");

  if (!token) {
    if (request.nextUrl.pathname !== "/auth") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  } else {
    if (request.nextUrl.pathname === "/auth") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
