'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    // Set the origin after component mounts
    setOrigin(window.location.origin);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div className="auth-container">
      <h1>Welcome to the Course Platform</h1>
      {origin && (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'github']}
          redirectTo={`${origin}/api/auth/callback`}
        />
      )}
      <p>
        No account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}