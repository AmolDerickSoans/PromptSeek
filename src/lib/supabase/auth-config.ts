import { type EmailOtpType } from '@supabase/supabase-js'

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/'
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  // Make sure to include trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url
}

export const authConfig = {
  providers: ['google'],
  appearance: {
    theme: 'default',
    variables: {
      default: {
        colors: {
          brand: 'rgb(37 99 235)', // blue-600
          brandAccent: 'rgb(29 78 216)' // blue-700
        }
      }
    }
  },
  callbacks: {
    async signInWithPassword({ user, error }: { user: any; error: any }) {
      return { user, error }
    }
  },
  redirects: {
    afterSignIn: '/dashboard',
    afterSignUp: '/dashboard',
  }
}
