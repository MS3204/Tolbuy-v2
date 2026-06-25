import { useState } from 'react';
import { ArrowLeft, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

interface LogoutPageProps {
  onCancel: () => void;
  onLoggedOut: () => void;
}

export default function LogoutPage({ onCancel, onLoggedOut }: LogoutPageProps) {
  const { signOut, user } = useAuth();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogout = async () => {
    setError('');
    setSubmitting(true);
    const { error: authError } = await signOut();
    setSubmitting(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    onLoggedOut();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-cairo flex items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-lg rounded-2xl bg-white border border-gray-100 shadow-sm p-6 sm:p-8 text-center">
        <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-blue-50 text-brand-blue-600 flex items-center justify-center">
          <ShieldCheck size={28} />
        </div>
        <h1 className="text-2xl font-900 text-gray-900" style={{ fontWeight: 900 }}>Sign out?</h1>
        <p className="text-sm text-gray-500 mt-2">
          You are signed in as <span className="font-700 text-gray-700" style={{ fontWeight: 700 }}>{user?.email}</span>.
        </p>

        {error && (
          <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-7 grid sm:grid-cols-2 gap-3">
          <button
            onClick={handleLogout}
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-800 text-white transition hover:bg-red-700 disabled:opacity-50"
            style={{ fontWeight: 800 }}
          >
            <LogOut size={16} />
            {submitting ? 'Signing out...' : 'Sign out'}
          </button>
          <button
            onClick={onCancel}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-800 text-gray-700 transition hover:bg-gray-200"
            style={{ fontWeight: 800 }}
          >
            <ArrowLeft size={16} />
            Stay signed in
          </button>
        </div>
      </div>
    </div>
  );
}
