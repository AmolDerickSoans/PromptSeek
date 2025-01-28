'use client'; // Mark this component as a Client Component

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client'
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [session, setSession] = useState<{ user: any } | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: any } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: any, session: { user: any } | null) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <header>
        <h1>Welcome to My Next.js Site</h1>
        {!session ? (
          <button onClick={() => router.push('/login')}>Get Started</button>
        ) : (
          <div>
            <p>You are signed in!</p>
            <Link href="/dashboard">
              <button>Dashboard</button>
            </Link>
            <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
          </div>
        )}
      </header>

      {!session && (
        <div>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'github']} // Optional: Add providers
            view="forgotten_password" // Allow password reset
          />
        </div>
      )}
    </div>
  );
}