import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken");

  // Check if the user is authenticated
  if (!token || token.value !== "your-auth-token") {
    // If not authenticated or token is invalid, redirect to the login page
    console.log("Redirecting to / because token is invalid or missing");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If authenticated, allow access to the requested page
  console.log("Token is valid, proceeding to requested page");
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
