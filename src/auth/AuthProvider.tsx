import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { AuthResult, AuthContextValue } from './AuthContext';
import { AuthContext } from './AuthContext';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const missingConfigError = new Error('Supabase environment variables are missing.');

type ProfileUpsertUser = {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown> | null;
} | null;


export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const upsertProfile = async (u: ProfileUpsertUser) => {
      if (!supabase) return;
      if (!u?.id) return;

      // Best-effort: create/update a public.profiles row after sign-in.
      // Requires `public.profiles` table + RLS policy.
      try {
        await supabase.from('profiles').upsert(
          {
            id: u.id,
            email: u.email ?? '',
            full_name: u.user_metadata?.full_name ?? u.user_metadata?.name ?? '',
            role: u.user_metadata?.role ?? 'user',
          },
          { onConflict: 'id' }
        );
      } catch {
        // ignore
      }
    };

    let active = true;

    const timeoutId = window.setTimeout(() => {
      if (!active) return;
      // Avoid getting stuck on Loading UI if getSession is slow.
      setLoading(false);
    }, 3000);

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      window.clearTimeout(timeoutId);
      setSession(data.session);
      setLoading(false);
      upsertProfile(data.session?.user ?? null);
    });


    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
      upsertProfile(nextSession?.user ?? null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextValue = useMemo<AuthContextValue>(() => ({
    user: session?.user ?? null,
    session,
    loading,
    isConfigured: isSupabaseConfigured,

    signIn: async (email, password): Promise<AuthResult> => {
      if (!supabase) return { error: missingConfigError };
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    },

    signUp: async (email, password): Promise<AuthResult> => {
      if (!supabase) return { error: missingConfigError };
      const { error } = await supabase.auth.signUp({ email, password });
      return { error };
    },

    signInWithOAuth: async (provider: 'google'): Promise<AuthResult> => {
      if (!supabase) return { error: missingConfigError };
      const redirectTo = window.location.origin;
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo },
      });
      return { error };
    },

    signInWithGoogle: async (): Promise<AuthResult> => {
      // Keep separate to make the UI simpler.
      return (await supabase!.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      })) as AuthResult;
    },

    signOut: async (): Promise<AuthResult> => {
      if (!supabase) return { error: missingConfigError };
      const { error } = await supabase.auth.signOut();
      return { error };
    },
  }), [loading, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

