import { FormEvent, useState } from 'react';
import { Lock, Mail, ShieldCheck, ShoppingCart, Chrome } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

interface LoginPageProps {
  onShowSignup: () => void;
}

export default function LoginPage({ onShowSignup }: LoginPageProps) {
  const { signIn, signInWithGoogle, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    const { error: authError } = await signIn(email, password);
    setSubmitting(false);
    if (authError) setError(authError.message);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-cairo" dir="rtl">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden lg:flex relative overflow-hidden bg-brand-blue-600 p-10 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(61,190,110,0.38),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.22),transparent_24%)]" />
          <div className="relative z-10 flex flex-col justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                <ShoppingCart size={22} />
              </div>
              <div className="text-2xl font-900" style={{ fontWeight: 900 }}>TolBuy</div>
            </div>
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm mb-5">
                <ShieldCheck size={16} />
                Secure commerce workspace
              </div>
              <h1 className="text-4xl font-900 leading-tight mb-4" style={{ fontWeight: 900 }}>
                Welcome back to your TolBuy dashboard
              </h1>
              <p className="text-white/75 text-base leading-7">
                Sign in to manage orders, wallets, marketplace activity, and AI trading insights from one clean workspace.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {['Orders', 'Wallet', 'AI'].map((item) => (
                <div key={item} className="rounded-xl bg-white/12 p-4">
                  <div className="text-xl font-800" style={{ fontWeight: 800 }}>24/7</div>
                  <div className="text-xs text-white/70">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <main className="flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden flex items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-brand-blue-600 text-white flex items-center justify-center">
                <ShoppingCart size={20} />
              </div>
              <span className="text-2xl font-900 text-brand-blue-600" style={{ fontWeight: 900 }}>TolBuy</span>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-900 text-gray-900" style={{ fontWeight: 900 }}>Login</h2>
                <p className="text-sm text-gray-500 mt-1">Use your email and password to continue.</p>
              </div>

              {!isConfigured && (
                <div className="mb-4 rounded-xl border border-yellow-200 bg-yellow-50 px-3 py-2 text-sm text-yellow-800">
                  Add Supabase keys to your .env file before signing in.
                </div>
              )}

              {error && (
                <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
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
                <label className="block">
                  <span className="text-sm font-700 text-gray-700" style={{ fontWeight: 700 }}>Email</span>
                  <div className="relative mt-1">
                    <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-3 pr-10 text-sm outline-none transition focus:border-brand-blue-600 focus:ring-2 focus:ring-brand-blue-600/15"
                      placeholder="you@example.com"
                      dir="ltr"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-sm font-700 text-gray-700" style={{ fontWeight: 700 }}>Password</span>
                  <div className="relative mt-1">
                    <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-3 pr-10 text-sm outline-none transition focus:border-brand-blue-600 focus:ring-2 focus:ring-brand-blue-600/15"
                      placeholder="••••••••"
                      dir="ltr"
                    />
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={submitting || !isConfigured}
                  className="w-full rounded-xl bg-brand-blue-600 px-4 py-2.5 text-sm font-800 text-white transition hover:bg-brand-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ fontWeight: 800 }}
                >
                  {submitting ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                New to TolBuy?{' '}
                <button onClick={onShowSignup} className="font-800 text-brand-blue-600 hover:underline" style={{ fontWeight: 800 }}>
                  Create account
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
