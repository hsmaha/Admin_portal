import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get("admin_auth")?.value === "true";
  const isLoginPage = req.nextUrl.pathname.startsWith("/admin/login");

  if (!isLoggedIn && req.nextUrl.pathname.startsWith("/admin") && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}
