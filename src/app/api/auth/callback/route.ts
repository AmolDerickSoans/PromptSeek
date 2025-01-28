// app/api/auth/callback/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const type = requestUrl.searchParams.get('type')
  
  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)

    // If it's a recovery (password reset), redirect to password reset page
    if (type === 'recovery') {
      return NextResponse.redirect(new URL('/password-reset', request.url))
    }

    // For normal sign-in/up, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If no code, redirect to home page
  return NextResponse.redirect(new URL('/', request.url))
}