import { createContext, useContext } from 'react';
import type { AuthError, Session, User } from '@supabase/supabase-js';

export interface AuthResult {
  error: AuthError | Error | null;
}

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult>;
  signInWithOAuth: (provider: 'google') => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider.');
  }
  return context;
}
