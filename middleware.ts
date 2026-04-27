import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  // Protected paths logic
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // If trying to access /admin but not to /admin/login
    if (!request.nextUrl.pathname.startsWith('/admin/login')) {
      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } else {
      // If going to login but already has token
      if (token) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
