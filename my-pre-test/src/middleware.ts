import { type NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  console.log("middleware trigger");

  const authToken = request.cookies.get("authToken")?.value;
  const isAuthenticated = !!authToken;

  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/my-profile") ||
    pathname.startsWith("/my-component")
  ) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (pathname.startsWith("/login")) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-profile/:path*", "/my-component/:path*"],
};
