import { NextResponse, type NextRequest } from "next/server";

/* Versions 2–4 stay in the code for review but are not public yet: in
   production their pages answer like any unknown URL. `npm run dev` still
   serves them. Files with an extension pass through, because version 1 uses
   a few icons from /public/v2. Delete this file to publish them again. */
export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") return NextResponse.next();
  if (/\.[a-z0-9]+$/i.test(request.nextUrl.pathname)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/404", request.url));
}

export const config = {
  matcher: [
    "/v2/:path*",
    "/v3/:path*",
    "/v4/:path*",
    "/en/v2/:path*",
    "/en/v3/:path*",
    "/en/v4/:path*",
    "/api/v2/:path*",
  ],
};
