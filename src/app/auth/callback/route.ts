import { NextResponse } from 'next/server';

import { createClient } from '~/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  let next = searchParams.get('next') ?? '/';
  if (!next.startsWith('/')) {
    next = '/';
  }

  const forwardedHost = request.headers.get('x-forwarded-host');
  const host = request.headers.get('host');
  let redirectHost = '';

  if (process.env.NODE_ENV === 'development') {
    redirectHost = `http://localhost:${process.env.NEXT_PUBLIC_DEV_PORT}`;
  } else {
    redirectHost = `https://${forwardedHost || host}`;
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${redirectHost}${next}`);
    }
  }

  return NextResponse.redirect(`${redirectHost}/auth/login`);
}
