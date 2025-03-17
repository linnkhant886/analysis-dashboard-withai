import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken");

  // Check if the user is authenticated
  if (!token || token.value !== "simple-auth-token-123") {
    // If not authenticated or token is invalid, redirect to the login page
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If authenticated, allow access to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
