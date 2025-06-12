import { type NextRequest, NextResponse } from 'next/server';

import { createServerClient } from '@supabase/ssr';

import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../env';

const ROUTES = {
  protected: ['/profile/:path*'],
  unprotected: ['/auth/login', '/auth/sign-up', '/auth/signup-main'],
};

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const matchesRoute = (path: string, pattern: string) => {
    if (pattern.endsWith('/:path*')) {
      const base = pattern.replace('/:path*', '');
      return path.startsWith(base);
    }
    return path === pattern;
  };

  const isProtectedRoute = ROUTES.protected.some((pattern) =>
    matchesRoute(pathname, pattern)
  );

  const isUnprotectedRoute = ROUTES.unprotected.some((pattern) =>
    matchesRoute(pathname, pattern)
  );

  if (pathname === '/error') {
    const searchParams = request.nextUrl.searchParams;
    const message = searchParams.get('message');
    const redirectHeader = request.headers.get('X-Redirect-Source');

    if (pathname === '/error') {
      if (!message || redirectHeader !== 'server') {
        const url = request.nextUrl.clone();
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
      }
    }
  }

  if (user && isUnprotectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = `/profile/${user.id}`;
    return NextResponse.redirect(url);
  }

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
