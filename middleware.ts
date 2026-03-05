import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".webp")
  ) {
    return NextResponse.next();
  }

  // Allow home, tbd, events, about, contact, gallery, secret-admin, APIs, and SEO files
  if (
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/events" ||
    pathname === "/gallery" ||
    pathname === "/contact" ||
    pathname === "/tbd" ||
    pathname === "/secret-admin" ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Redirect everything else
  return NextResponse.redirect(new URL("/tbd", request.url));
}

export const config = {
  matcher: "/:path*",
};
