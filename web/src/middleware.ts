import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Check if the request is for an API route
  const isApiRoute = request.nextUrl.pathname.startsWith("/api");

  // Get the authentication result
  const { user, response } = await updateSession(request);

  // If no user is found
  if (!user) {
    // For API routes: Return a forbidden error
    if (isApiRoute) {
      // Use NextResponse.json directly to set the status code to 403
      return NextResponse.json(
        {
          isSuccess: false,
          data: null,
          error: {
            errorIdentifier: "Authentication required",
            origin: "Middleware",
            message: "Forbidden: Authentication required",
            code: "FORBIDDEN",
            name: "AuthError",
          },
        },
        { status: 403 }
      );
    }

    // For frontend routes: Redirect to login page
    if (
      !request.nextUrl.pathname.startsWith("/auth") &&
      !pathsToIgnoreAuth.includes(request.nextUrl.pathname)
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  // Return the original response if authenticated or for excluded paths
  return response;
}

const pathsToIgnoreAuth = ["/"];

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml
     * - robots.txt
     * - static files (svg, png, jpg, jpeg, gif, webp)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
