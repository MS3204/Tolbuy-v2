import { FormEvent, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowLeft, Lock, Mail, ShieldCheck, Sparkles, Chrome } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

interface SignupPageProps {
  onShowLogin: () => void;
}

export default function SignupPage({ onShowLogin }: SignupPageProps) {
  const { signUp, signInWithGoogle, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    const { error: authError } = await signUp(email, password);
    setSubmitting(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    setMessage('Account created. Check your email if confirmation is enabled, then sign in.');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-cairo" dir="rtl">
      <main className="min-h-screen px-4 py-10 flex items-center justify-center">
        <div className="w-full max-w-5xl grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 sm:p-8">
            <button
              onClick={onShowLogin}
              className="mb-6 inline-flex items-center gap-2 text-sm font-700 text-brand-blue-600 hover:underline"
              style={{ fontWeight: 700 }}
            >
              <ArrowLeft size={16} />
              Back to login
            </button>

            <div className="mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-brand-green-500 flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h1 className="text-2xl font-900 text-gray-900" style={{ fontWeight: 900 }}>Create your account</h1>
              <p className="text-sm text-gray-500 mt-1">
                Start with secure email/password authentication powered by Supabase.
              </p>
            </div>

            {!isConfigured && (
              <div className="mb-4 rounded-xl border border-yellow-200 bg-yellow-50 px-3 py-2 text-sm text-yellow-800">
                Add Supabase keys to your .env file before signing up.
              </div>
            )}

            {error && (
              <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            {message && (
              <div className="mb-4 rounded-xl border border-green-100 bg-green-50 px-3 py-2 text-sm text-green-700">
                {message}
              </div>
            )}

            <div className="mb-4">
              <button
                type="button"
                onClick={async () => {
                  const { error } = await signInWithGoogle();
                  if (error) setError(error.message);
                }}
                disabled={!isConfigured}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-800 text-gray-900 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ fontWeight: 800 }}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Chrome size={16} /> Continue with Google
                </span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AuthInput icon={<Mail size={16} />} label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
              <AuthInput icon={<Lock size={16} />} label="Password" type="password" value={password} onChange={setPassword} placeholder="Minimum 6 characters" />
              <AuthInput icon={<Lock size={16} />} label="Confirm password" type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Repeat password" />

              <button
                type="submit"
                disabled={submitting || !isConfigured}
                className="w-full rounded-xl bg-brand-green-500 px-4 py-2.5 text-sm font-800 text-white transition hover:bg-brand-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ fontWeight: 800 }}
              >
                {submitting ? 'Creating account...' : 'Create account'}
              </button>
            </form>
          </section>

          <section className="rounded-2xl bg-gradient-to-br from-brand-blue-600 to-brand-green-500 p-6 sm:p-8 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgba(255,255,255,0.22),transparent_24%),radial-gradient(circle_at_20%_82%,rgba(255,255,255,0.16),transparent_28%)]" />
            <div className="relative z-10 h-full flex flex-col justify-between gap-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm mb-5">
                  <Sparkles size={16} />
                  One account for the full TolBuy ecosystem
                </div>
                <h2 className="text-3xl font-900 leading-tight mb-3" style={{ fontWeight: 900 }}>
                  Marketplace, wallet, rewards, and AI tools in one secure dashboard.
                </h2>
                <p className="text-white/75 leading-7">
                  Supabase handles the auth session while TolBuy keeps the commerce workspace fast and focused.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  ['Secure', 'Email auth'],
                  ['Fast', 'Session restore'],
                  ['Ready', 'Logout flow'],
                ].map(([title, subtitle]) => (
                  <div key={title} className="rounded-xl bg-white/15 p-4">
                    <div className="font-900 text-lg" style={{ fontWeight: 900 }}>{title}</div>
                    <div className="text-xs text-white/70">{subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

interface AuthInputProps {
  icon: ReactNode;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

function AuthInput({ icon, label, type, value, onChange, placeholder }: AuthInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-700 text-gray-700" style={{ fontWeight: 700 }}>{label}</span>
      <div className="relative mt-1">
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        <input
          type={type}
          required
          minLength={type === 'password' ? 6 : undefined}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-3 pr-10 text-sm outline-none transition focus:border-brand-green-500 focus:ring-2 focus:ring-brand-green-500/15"
          placeholder={placeholder}
          dir="ltr"
        />
      </div>
    </label>
  );
}
