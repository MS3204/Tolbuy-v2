import { useMemo, useState } from 'react';
import { Activity, ArrowDownRight, ArrowUpRight, BarChart3, Briefcase, DollarSign, Search, TrendingDown, TrendingUp } from 'lucide-react';

const assets = [
  { symbol: 'AAPL', name: 'Apple', price: 192.5, change: 2.3, volume: '52M', sector: 'Technology' },
  { symbol: 'TSLA', name: 'Tesla', price: 248.8, change: -1.5, volume: '35M', sector: 'Automotive' },
  { symbol: 'AMZN', name: 'Amazon', price: 178.3, change: 3.1, volume: '28M', sector: 'Retail' },
  { symbol: 'MSFT', name: 'Microsoft', price: 415.2, change: 0.8, volume: '19M', sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 171.9, change: 1.2, volume: '22M', sector: 'Technology' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 875.4, change: 5.6, volume: '45M', sector: 'Semiconductors' },
];

const portfolio = [
  { symbol: 'AAPL', shares: 10, avgPrice: 180, currentPrice: 192.5 },
  { symbol: 'NVDA', shares: 5, avgPrice: 750, currentPrice: 875.4 },
  { symbol: 'MSFT', shares: 8, avgPrice: 400, currentPrice: 415.2 },
];

function LineChart({ positive }: { positive: boolean }) {
  const data = positive ? [30, 34, 32, 40, 38, 46, 44, 52, 57, 61, 60, 68] : [68, 62, 64, 55, 58, 50, 48, 44, 40, 42, 35, 32];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const width = 320;
  const height = 120;
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / (max - min)) * (height - 12) - 6;
    return `${x},${y}`;
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-32 w-full" preserveAspectRatio="none">
      <polyline points={points.join(' ')} fill="none" stroke={positive ? '#3DBE6E' : '#ef4444'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TolTradingPage() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(assets[0]);
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState('');

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => `${asset.symbol} ${asset.name} ${asset.sector}`.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const portfolioValue = portfolio.reduce((sum, item) => sum + item.shares * item.currentPrice, 0);
  const portfolioCost = portfolio.reduce((sum, item) => sum + item.shares * item.avgPrice, 0);
  const gain = portfolioValue - portfolioCost;
  const orderValue = (Number(quantity) || 0) * selected.price;

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-800 text-gray-900" style={{ fontWeight: 800 }}>TolTrading</h1>
        <p className="text-sm text-gray-500 mt-0.5">Track markets, review your portfolio, and stage buy or sell orders.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Metric icon={<DollarSign size={17} />} label="Portfolio value" value={`$${portfolioValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} tone="blue" />
        <Metric icon={<ArrowUpRight size={17} />} label="Unrealized gain" value={`${gain >= 0 ? '+' : ''}$${gain.toFixed(2)}`} tone="green" />
        <Metric icon={<Briefcase size={17} />} label="Open positions" value={String(portfolio.length)} tone="gray" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.45fr_0.9fr]">
        <section className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="inline-flex items-center gap-2 text-sm font-900 text-gray-900" style={{ fontWeight: 900 }}>
              <BarChart3 size={17} className="text-brand-blue-600" />
              Markets
            </h2>
            <div className="relative sm:w-72">
              <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search symbol"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-3 pr-9 text-sm outline-none focus:border-brand-blue-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredAssets.map((asset) => (
              <button
                key={asset.symbol}
                onClick={() => setSelected(asset)}
                className={`grid w-full grid-cols-[1fr_auto] items-center rounded-xl border p-3 text-right transition sm:grid-cols-[1fr_auto_auto_auto] ${selected.symbol === asset.symbol ? 'border-brand-blue-600/30 bg-blue-50' : 'border-transparent hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue-600 text-xs font-900 text-white" style={{ fontWeight: 900 }}>{asset.symbol.slice(0, 2)}</div>
                  <div>
                    <p className="text-sm font-900 text-gray-900" style={{ fontWeight: 900 }}>{asset.symbol}</p>
                    <p className="text-xs text-gray-400">{asset.name} · {asset.sector}</p>
                  </div>
                </div>
                <p className="text-left text-sm font-900 text-gray-900" style={{ fontWeight: 900 }}>${asset.price.toFixed(2)}</p>
                <p className={`hidden items-center justify-end gap-1 text-sm font-800 sm:flex ${asset.change >= 0 ? 'text-brand-green-500' : 'text-red-500'}`} style={{ fontWeight: 800 }}>
                  {asset.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {asset.change >= 0 ? '+' : ''}{asset.change}%
                </p>
                <p className="hidden text-left text-xs text-gray-400 sm:block">{asset.volume}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-900 text-gray-900" style={{ fontWeight: 900 }}>{selected.symbol}</h2>
              <p className="text-xs text-gray-400">{selected.name}</p>
            </div>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-900 ${selected.change >= 0 ? 'bg-green-50 text-brand-green-500' : 'bg-red-50 text-red-500'}`} style={{ fontWeight: 900 }}>
              {selected.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {selected.change >= 0 ? '+' : ''}{selected.change}%
            </span>
          </div>

          <LineChart positive={selected.change >= 0} />

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button onClick={() => setSide('buy')} className={`rounded-xl py-2 text-sm font-900 transition ${side === 'buy' ? 'bg-brand-green-500 text-white' : 'bg-gray-100 text-gray-600'}`} style={{ fontWeight: 900 }}>Buy</button>
            <button onClick={() => setSide('sell')} className={`rounded-xl py-2 text-sm font-900 transition ${side === 'sell' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'}`} style={{ fontWeight: 900 }}>Sell</button>
          </div>

          <label className="mt-4 block">
            <span className="text-xs font-800 text-gray-500" style={{ fontWeight: 800 }}>Quantity</span>
            <input
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              placeholder="0"
              className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-brand-blue-600"
            />
          </label>

          <div className="mt-3 rounded-xl bg-gray-50 p-3 text-sm">
            <div className="flex justify-between text-gray-500"><span>Market price</span><span>${selected.price.toFixed(2)}</span></div>
            <div className="mt-1 flex justify-between font-900 text-gray-900" style={{ fontWeight: 900 }}><span>Estimated total</span><span>${orderValue.toFixed(2)}</span></div>
          </div>

          <button className={`mt-4 w-full rounded-xl py-2.5 text-sm font-900 text-white transition ${side === 'buy' ? 'bg-brand-green-500 hover:bg-brand-green-600' : 'bg-red-500 hover:bg-red-600'}`} style={{ fontWeight: 900 }}>
            Preview {side} order
          </button>
        </section>
      </div>

      <section className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <h2 className="mb-3 inline-flex items-center gap-2 text-sm font-900 text-gray-900" style={{ fontWeight: 900 }}>
          <Activity size={17} className="text-brand-blue-600" />
          Portfolio
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="text-xs text-gray-400">
              <tr>
                <th className="py-2 font-800" style={{ fontWeight: 800 }}>Asset</th>
                <th className="py-2 text-left font-800" style={{ fontWeight: 800 }}>Shares</th>
                <th className="py-2 text-left font-800" style={{ fontWeight: 800 }}>Average</th>
                <th className="py-2 text-left font-800" style={{ fontWeight: 800 }}>Current</th>
                <th className="py-2 text-left font-800" style={{ fontWeight: 800 }}>P/L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {portfolio.map((item) => {
                const profit = (item.currentPrice - item.avgPrice) * item.shares;
                return (
                  <tr key={item.symbol}>
                    <td className="py-3 font-900 text-gray-900" style={{ fontWeight: 900 }}>{item.symbol}</td>
                    <td className="py-3 text-left text-gray-600">{item.shares}</td>
                    <td className="py-3 text-left text-gray-600">${item.avgPrice.toFixed(2)}</td>
                    <td className="py-3 text-left text-gray-900">${item.currentPrice.toFixed(2)}</td>
                    <td className={`py-3 text-left font-900 ${profit >= 0 ? 'text-brand-green-500' : 'text-red-500'}`} style={{ fontWeight: 900 }}>{profit >= 0 ? '+' : ''}${profit.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Metric({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: 'blue' | 'green' | 'gray' }) {
  const classes = {
    blue: 'bg-brand-blue-600 text-white',
    green: 'bg-white text-brand-green-500',
    gray: 'bg-white text-gray-900',
  };

  return (
    <div className={`rounded-xl border border-gray-100 p-4 shadow-sm ${classes[tone]}`}>
      <div className="mb-2 flex items-center gap-2 text-sm opacity-80">{icon}<span>{label}</span></div>
      <p className="text-2xl font-900" style={{ fontWeight: 900 }}>{value}</p>
    </div>
  );
}
