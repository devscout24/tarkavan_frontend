import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("tarkavan_token")?.value;
  const role = request.cookies.get("tarkavan_role")?.value;
  const { pathname } = request.nextUrl;

  // Not logged in → redirect to login
  if (!token) {
    if (!pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // 🔐 Role-based protection
  if (pathname.startsWith("/parent") && role !== "parent") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/player") && role !== "player") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/coach") && role !== "coach") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/club") && role !== "club") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔁 Root → redirect to role dashboard
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${role}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/parent/:path*",
    "/player/:path*",
    "/coach/:path*",
    "/club/:path*",
  ],
};