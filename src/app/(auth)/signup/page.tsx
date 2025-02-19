'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignUpPage() {
  const router = useRouter();
  const [origin, setOrigin] = useState('');

  useEffect(() => {
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
      <h1>Create Your Account</h1>
      {origin && (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          view="sign_up" // Set the view to sign-up
          providers={['google', 'github']} // Add other providers as needed
          redirectTo={`${origin}/api/auth/callback`}
        />
      )}
      <p>
        Already have an account? <a href="/login">Sign In</a>
      </p>
    </div>
  );
}