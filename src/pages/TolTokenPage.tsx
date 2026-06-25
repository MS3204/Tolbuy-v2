import { useState } from 'react';
import { ArrowUpRight, Award, Coins, Gift, History, ShoppingCart, Star, TrendingUp } from 'lucide-react';

const currentPoints = 2450;

const tiers = [
  { name: 'Bronze', min: 0, max: 999, gradient: 'from-amber-600 to-amber-700', perks: ['2% shopping discount', 'Monthly double-point day', 'Standard support'] },
  { name: 'Silver', min: 1000, max: 4999, gradient: 'from-gray-400 to-gray-600', perks: ['5% shopping discount', 'Free shipping offers', 'Priority support'] },
  { name: 'Gold', min: 5000, max: 9999, gradient: 'from-yellow-400 to-yellow-600', perks: ['10% shopping discount', 'Instant delivery perks', 'Early sale access'] },
  { name: 'Platinum', min: 10000, max: Infinity, gradient: 'from-brand-blue-600 to-brand-green-500', perks: ['15% shopping discount', 'Account manager', 'Exclusive events'] },
];

const rewards = [
  { id: 1, title: '$10 order discount', cost: 500, category: 'Shopping', image: 'https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, title: 'Two free deliveries', cost: 300, category: 'Food', image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 3, title: '$25 Crypto-Tol credit', cost: 1000, category: 'Crypto', image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 4, title: 'TolSentinel Pro month', cost: 2000, category: 'AI', image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

const history = [
  { id: 1, title: 'Headphones purchase', points: 90, date: '2026-06-20', type: 'Earned' },
  { id: 2, title: 'Redeemed order discount', points: -200, date: '2026-06-18', type: 'Redeemed' },
  { id: 3, title: 'React course purchase', points: 49, date: '2026-06-15', type: 'Earned' },
  { id: 4, title: 'Daily login bonus', points: 10, date: '2026-06-14', type: 'Bonus' },
  { id: 5, title: 'Friend referral', points: 200, date: '2026-06-12', type: 'Bonus' },
  { id: 6, title: 'TolFood order', points: 12, date: '2026-06-10', type: 'Earned' },
];

export default function TolTokenPage() {
  const [tab, setTab] = useState<'overview' | 'redeem' | 'history'>('overview');
  const [redeemed, setRedeemed] = useState<number[]>([]);
  const currentTier = tiers[1];
  const nextTier = tiers[2];
  const availablePoints = currentPoints - redeemed.reduce((sum, id) => sum + (rewards.find((reward) => reward.id === id)?.cost ?? 0), 0);
  const progress = ((availablePoints - currentTier.min) / (nextTier.min - currentTier.min)) * 100;

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="flex items-center gap-3 text-2xl font-800 text-gray-900" style={{ fontWeight: 800 }}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue-600 to-brand-green-500 text-white shadow-md">
            <Coins size={22} />
          </span>
          TolToken
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">Earn, redeem, and track loyalty points across the TolBuy ecosystem.</p>
      </div>

      <section className="rounded-2xl bg-gradient-to-l from-brand-blue-600 to-brand-green-500 p-6 text-white">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm text-white/75">Available balance</p>
            <p className="mt-1 text-5xl font-900" style={{ fontWeight: 900 }}>{availablePoints.toLocaleString()}</p>
            <p className="text-sm text-white/75">TolToken points</p>
          </div>
          <div className="rounded-xl bg-white/15 p-4 lg:w-80">
            <div className="flex items-center justify-between">
              <span className="text-sm font-900" style={{ fontWeight: 900 }}>{currentTier.name} member</span>
              <span className="text-xs text-white/70">{Math.max(nextTier.min - availablePoints, 0).toLocaleString()} to {nextTier.name}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/25">
              <div className="h-full rounded-full bg-white transition-all" style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }} />
            </div>
            <p className="mt-2 text-xs text-white/70">{Math.round(Math.max(0, Math.min(progress, 100)))}% progress to {nextTier.name}</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { Icon: TrendingUp, label: 'Earned this month', value: '+361', color: 'text-brand-green-500' },
          { Icon: Gift, label: 'Rewards redeemed', value: String(redeemed.length), color: 'text-brand-blue-600' },
          { Icon: ShoppingCart, label: 'Completed orders', value: '12', color: 'text-orange-500' },
          { Icon: Star, label: 'Base earn rate', value: '1% / order', color: 'text-yellow-500' },
        ].map(({ Icon, label, value, color }) => (
          <div key={label} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <Icon size={17} className={color} />
            <p className={`mt-2 text-lg font-900 ${color}`} style={{ fontWeight: 900 }}>{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {[
          { id: 'overview', label: 'Membership tiers', Icon: Award },
          { id: 'redeem', label: 'Redeem points', Icon: Gift },
          { id: 'history', label: 'Point history', Icon: History },
        ].map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id as typeof tab)}
            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-800 transition ${tab === id ? 'bg-brand-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-blue-600/40'}`}
            style={{ fontWeight: 800 }}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((tier) => {
            const active = tier.name === currentTier.name;
            return (
              <article key={tier.name} className={`overflow-hidden rounded-xl border bg-white shadow-sm ${active ? 'border-brand-blue-600' : 'border-gray-100'}`}>
                <div className={`bg-gradient-to-l ${tier.gradient} p-4 text-white`}>
                  <p className="text-lg font-900" style={{ fontWeight: 900 }}>{tier.name}</p>
                  <p className="text-xs text-white/75">{tier.max === Infinity ? `${tier.min.toLocaleString()}+ points` : `${tier.min.toLocaleString()}-${tier.max.toLocaleString()} points`}</p>
                  {active && <span className="mt-3 inline-block rounded-full bg-white/20 px-2 py-1 text-xs font-800" style={{ fontWeight: 800 }}>Current tier</span>}
                </div>
                <ul className="space-y-2 p-4">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-green-500" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      )}

      {tab === 'redeem' && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {rewards.map((reward) => {
            const canRedeem = availablePoints >= reward.cost && !redeemed.includes(reward.id);
            const isRedeemed = redeemed.includes(reward.id);
            return (
              <article key={reward.id} className={`overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm ${!canRedeem && !isRedeemed ? 'opacity-60' : ''}`}>
                <img src={reward.image} alt={reward.title} className="h-32 w-full object-cover" />
                <div className="p-4">
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-800 text-brand-blue-600" style={{ fontWeight: 800 }}>{reward.category}</span>
                  <h2 className="mt-3 text-sm font-900 text-gray-900" style={{ fontWeight: 900 }}>{reward.title}</h2>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-sm font-900 text-brand-blue-600" style={{ fontWeight: 900 }}><Coins size={14} />{reward.cost.toLocaleString()}</span>
                    <button
                      disabled={!canRedeem}
                      onClick={() => setRedeemed((items) => [...items, reward.id])}
                      className={`rounded-xl px-3 py-2 text-xs font-900 transition ${isRedeemed ? 'bg-brand-green-500 text-white' : canRedeem ? 'bg-brand-blue-600 text-white hover:bg-brand-blue-700' : 'bg-gray-200 text-gray-400'}`}
                      style={{ fontWeight: 900 }}
                    >
                      {isRedeemed ? 'Redeemed' : 'Redeem'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {tab === 'history' && (
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          {history.map((item) => (
            <div key={item.id} className="flex items-center gap-3 border-b border-gray-50 p-4 last:border-b-0">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${item.points > 0 ? 'bg-green-50 text-brand-green-500' : 'bg-orange-50 text-orange-500'}`}>
                {item.points > 0 ? <ArrowUpRight size={17} /> : <Coins size={17} />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-900 text-gray-900" style={{ fontWeight: 900 }}>{item.title}</p>
                <p className="text-xs text-gray-400">{item.date} · {item.type}</p>
              </div>
              <p className={`text-sm font-900 ${item.points > 0 ? 'text-brand-green-500' : 'text-orange-500'}`} style={{ fontWeight: 900 }}>{item.points > 0 ? '+' : ''}{item.points}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
