import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken");

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If authenticated, allow access to the requested page
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
