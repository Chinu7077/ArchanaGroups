import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/features/auth/lib/auth/session';

type Route = string;
type RoutePattern = RegExp;

// Define protected routes with better type safety
const protectedRoutes: Route[] = ['/partner/dashboard', '/admin/dashboard'];
const authRoutes: Route[] = ['/auth/partner-login', '/auth/admin-login'];
const adminRoutes: Route[] = ['/admin/dashboard'];
const partnerRoutes: Route[] = ['/partner/dashboard'];

// Optimized route matching
const isRouteMatch = (pathname: string, routes: Route[]): boolean => {
  return routes.some((route) => pathname.startsWith(route));
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always log middleware execution to confirm it's running
  console.log(`🔧 Middleware executing for: ${pathname}`);

  // Skip middleware for API routes, static files, and other assets
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.startsWith('/test-files.html') ||
    pathname.startsWith('/debug-upload.html') ||
    pathname.includes('.') // Skip files with extensions
  ) {
    console.log(`⏭️  Skipping middleware for: ${pathname}`);
    return NextResponse.next();
  }

  // Get session from cookies
  const session = await verifySession();
  console.log(`🔐 Session check for ${pathname}:`, session ? `User ${session.userId} (${session.role})` : 'No session');

  // Check if the current route is protected using optimized function
  const isProtectedRoute = isRouteMatch(pathname, protectedRoutes);
  const isAuthRoute = isRouteMatch(pathname, authRoutes);
  const isAdminRoute = isRouteMatch(pathname, adminRoutes);
  const isPartnerRoute = isRouteMatch(pathname, partnerRoutes);

  console.log(`🛡️  Route protection check:`, {
    pathname,
    isProtectedRoute,
    isAuthRoute,
    isAdminRoute,
    isPartnerRoute,
    hasSession: !!session?.userId
  });

  // If user is not authenticated and trying to access protected routes
  if (isProtectedRoute && !session?.userId) {
    console.log(`🚫 Unauthorized access attempt to ${pathname} - redirecting to login`);
    // Redirect to appropriate login page based on route
    if (isAdminRoute) {
      return NextResponse.redirect(new URL('/auth/admin-login', request.url));
    } else if (isPartnerRoute) {
      return NextResponse.redirect(new URL('/auth/partner-login', request.url));
    }
    // Default redirect for other protected routes
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is authenticated and trying to access auth routes, redirect to dashboard
  if (isAuthRoute && session?.userId) {
    if (session.role === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } else if (session.role === 'partner') {
      return NextResponse.redirect(new URL('/partner/dashboard', request.url));
    }
  }

  // Prevent authenticated users from accessing wrong login forms
  if (session?.userId) {
    // Partner trying to access admin login
    if (pathname === '/auth/admin-login' && session.role === 'partner') {
      return NextResponse.redirect(new URL('/partner/dashboard', request.url));
    }

    // Admin trying to access partner login
    if (pathname === '/auth/partner-login' && session.role === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  // Role-based access control
  if (session?.userId) {
    // Admin trying to access partner routes
    if (isPartnerRoute && session.role !== 'partner') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    // Partner trying to access admin routes
    if (isAdminRoute && session.role !== 'admin') {
      return NextResponse.redirect(new URL('/partner/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on with improved performance
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap.xml
     * - public files (images, fonts, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)',
  ],
};
