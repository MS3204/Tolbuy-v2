import { useState } from 'react';
import {
  Wallet,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  History,
} from 'lucide-react';

const assets = [
  { label: 'USD', pct: '45%', amount: 2039.4, color: 'bg-brand-blue-600' },
  { label: 'Crypto', pct: '30%', amount: 1359.6, color: 'bg-brand-green-500' },
  { label: 'Investments', pct: '15%', amount: 679.8, color: 'bg-blue-400' },
  { label: 'Others', pct: '10%', amount: 453.2, color: 'bg-gray-200' },
];

const transactions = [
  { id: 1, descAr: 'إيداع بنكي', amount: 500, type: 'credit' as const, date: '2024-06-22' },
  { id: 2, descAr: 'شراء BTC', amount: -120, type: 'debit' as const, date: '2024-06-21' },
  { id: 3, descAr: 'استرداد طلب TLB-003', amount: 49, type: 'credit' as const, date: '2024-06-20' },
  { id: 4, descAr: 'سحب إلى البنك', amount: -200, type: 'debit' as const, date: '2024-06-18' },
  { id: 5, descAr: 'مكافأة TolToken', amount: 25, type: 'credit' as const, date: '2024-06-17' },
];

export default function WalletPage() {
  const [balanceVisible, setBalanceVisible] = useState(true);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-800 text-gray-900 flex items-center gap-2" style={{ fontWeight: 800 }}>
          <Wallet size={24} className="text-brand-blue-600" /> المحفظة
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">إدارة رصيدك وأصولك المالية</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 bg-gradient-to-l from-brand-blue-600 to-brand-green-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm opacity-80">إجمالي الرصيد</span>
            <button
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="text-white/80 hover:text-white transition-colors"
            >
              {balanceVisible ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          <div className="text-4xl font-800 mb-2" style={{ fontWeight: 800 }}>
            {balanceVisible ? '$ 4,532.00' : '$ ••••••'}
          </div>
          <div className="flex items-center gap-1 mb-6">
            <ArrowUpRight size={16} className="opacity-90" />
            <span className="text-sm font-600" style={{ fontWeight: 600 }}>+ 12.55%</span>
            <span className="text-sm opacity-70">من الشهر الماضي</span>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white text-brand-blue-600 rounded-xl text-sm font-700 hover:shadow-md transition-all" style={{ fontWeight: 700 }}>
              <Plus size={16} />
              إيداع
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-sm font-700 transition-all" style={{ fontWeight: 700 }}>
              <Minus size={16} />
              سحب
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p className="text-xs text-gray-500 mb-3 font-600" style={{ fontWeight: 600 }}>توزيع الأصول</p>
          <div className="flex items-center gap-4 mb-4">
            <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90 flex-shrink-0">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#f3f4f6" strokeWidth="4" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#1E56C8" strokeWidth="4" strokeDasharray="39.6 88" strokeLinecap="round" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#3DBE6E" strokeWidth="4" strokeDasharray="26.4 88" strokeLinecap="round" strokeDashoffset="-39.6" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#60a5fa" strokeWidth="4" strokeDasharray="13.2 88" strokeLinecap="round" strokeDashoffset="-66" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="4" strokeDasharray="8.8 88" strokeLinecap="round" strokeDashoffset="-79.2" />
            </svg>
            <div className="space-y-2 flex-1">
              {assets.map(({ label, pct, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${color}`} />
                    <span className="text-xs text-gray-500">{label}</span>
                  </div>
                  <span className="text-xs font-600 text-gray-700" style={{ fontWeight: 600 }}>{pct}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2 pt-3 border-t border-gray-100">
            {assets.map(({ label, amount, color }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-gray-600">{label}</span>
                </div>
                <span className="font-700 text-gray-900" style={{ fontWeight: 700 }}>
                  ${amount.toLocaleString('en', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 p-4 border-b border-gray-100">
          <History size={18} className="text-brand-blue-600" />
          <h3 className="font-700 text-gray-800" style={{ fontWeight: 700 }}>آخر المعاملات</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${tx.type === 'credit' ? 'bg-green-50' : 'bg-red-50'}`}>
                {tx.type === 'credit' ? (
                  <ArrowUpRight size={18} className="text-brand-green-500" />
                ) : (
                  <ArrowDownRight size={18} className="text-red-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-600 text-gray-800" style={{ fontWeight: 600 }}>{tx.descAr}</p>
                <p className="text-xs text-gray-400">{tx.date}</p>
              </div>
              <span className={`font-800 text-sm flex-shrink-0 ${tx.type === 'credit' ? 'text-brand-green-500' : 'text-red-500'}`} style={{ fontWeight: 800 }}>
                {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
