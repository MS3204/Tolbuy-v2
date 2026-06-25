import { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, RefreshCw, Search, ShieldCheck, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

const coins = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67420.5, change: 3.2, volume: '$28.4B', marketCap: '$1.33T', color: 'bg-orange-500' },
  { symbol: 'ETH', name: 'Ethereum', price: 3842.3, change: -1.8, volume: '$14.2B', marketCap: '$461B', color: 'bg-blue-500' },
  { symbol: 'BNB', name: 'BNB', price: 412.8, change: 0.5, volume: '$1.8B', marketCap: '$60B', color: 'bg-yellow-500' },
  { symbol: 'SOL', name: 'Solana', price: 178.9, change: 5.4, volume: '$3.2B', marketCap: '$83B', color: 'bg-violet-500' },
  { symbol: 'ADA', name: 'Cardano', price: 0.612, change: -2.1, volume: '$0.8B', marketCap: '$21B', color: 'bg-blue-700' },
  { symbol: 'XRP', name: 'XRP', price: 0.584, change: 1.3, volume: '$1.5B', marketCap: '$32B', color: 'bg-gray-700' },
  { symbol: 'DOGE', name: 'Dogecoin', price: 0.168, change: 8.2, volume: '$0.9B', marketCap: '$24B', color: 'bg-yellow-400' },
  { symbol: 'AVAX', name: 'Avalanche', price: 38.42, change: -0.9, volume: '$0.6B', marketCap: '$16B', color: 'bg-red-500' },
];

function Sparkline({ positive }: { positive: boolean }) {
  const data = positive ? [30, 36, 32, 42, 38, 48, 44, 55, 52, 60] : [60, 55, 58, 48, 50, 42, 44, 35, 38, 30];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 90;
    const y = 34 - ((value - min) / (max - min)) * 30 - 2;
    return `${x},${y}`;
  });
  return (
    <svg viewBox="0 0 90 36" className="h-9 w-24">
      <polyline points={points.join(' ')} fill="none" stroke={positive ? '#3DBE6E' : '#ef4444'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CryptoTolPage() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(coins[0]);
  const [usd, setUsd] = useState('');
  const [coinAmount, setCoinAmount] = useState('');

  const filteredCoins = useMemo(() => {
    return coins.filter((coin) => `${coin.symbol} ${coin.name}`.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const setUsdAmount = (value: string) => {
    setUsd(value);
    setCoinAmount(value ? (Number(value) / selected.price).toFixed(8) : '');
  };

  const setTokenAmount = (value: string) => {
    setCoinAmount(value);
    setUsd(value ? (Number(value) * selected.price).toFixed(2) : '');
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-800 text-gray-900" style={{ fontWeight: 800 }}>Crypto-Tol</h1>
          <p className="text-sm text-gray-500 mt-0.5">Watch crypto markets and simulate secure swaps.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ['Market cap', '$2.8T', true],
            ['24h volume', '$95B', true],
            ['BTC dom.', '52.4%', false],
            ['Active coins', '23,456', true],
          ].map(([label, value, up]) => (
            <div key={String(label)} className="rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-sm">
              <p className="text-xs text-gray-400">{label}</p>
              <p className="flex items-center gap-1 text-sm font-900 text-gray-900" style={{ fontWeight: 900 }}>
                {value}
                {up ? <TrendingUp size={13} className="text-brand-green-500" /> : <TrendingDown size={13} className="text-red-500" />}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.45fr_0.9fr]">
        <section className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-sm font-900 text-gray-900" style={{ fontWeight: 900 }}>Crypto markets</h2>
            <div className="relative sm:w-72">
              <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search coin"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-3 pr-9 text-sm outline-none focus:border-brand-blue-600"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-gray-50 text-xs text-gray-400">
                <tr>
                  <th className="px-4 py-3 font-800" style={{ fontWeight: 800 }}>Asset</th>
                  <th className="px-4 py-3 text-left font-800" style={{ fontWeight: 800 }}>Price</th>
                  <th className="px-4 py-3 text-left font-800" style={{ fontWeight: 800 }}>24h</th>
                  <th className="hidden px-4 py-3 text-left font-800 md:table-cell" style={{ fontWeight: 800 }}>Volume</th>
                  <th className="hidden px-4 py-3 text-left font-800 lg:table-cell" style={{ fontWeight: 800 }}>Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredCoins.map((coin) => (
                  <tr key={coin.symbol} onClick={() => setSelected(coin)} className={`cursor-pointer transition hover:bg-blue-50/60 ${selected.symbol === coin.symbol ? 'bg-blue-50' : ''}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-900 text-white ${coin.color}`} style={{ fontWeight: 900 }}>{coin.symbol.slice(0, 3)}</div>
                        <div>
                          <p className="font-900 text-gray-900" style={{ fontWeight: 900 }}>{coin.symbol}</p>
                          <p className="text-xs text-gray-400">{coin.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-left font-900 text-gray-900" style={{ fontWeight: 900 }}>${coin.price >= 1 ? coin.price.toLocaleString() : coin.price}</td>
                    <td className={`px-4 py-3 text-left font-900 ${coin.change >= 0 ? 'text-brand-green-500' : 'text-red-500'}`} style={{ fontWeight: 900 }}>
                      <span className="inline-flex items-center gap-1">{coin.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{coin.change >= 0 ? '+' : ''}{coin.change}%</span>
                    </td>
                    <td className="hidden px-4 py-3 text-left text-gray-500 md:table-cell">{coin.volume}</td>
                    <td className="hidden px-4 py-3 text-left lg:table-cell"><Sparkline positive={coin.change >= 0} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-900 text-gray-900" style={{ fontWeight: 900 }}>Swap</h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-800 text-brand-green-500" style={{ fontWeight: 800 }}><ShieldCheck size={13} />Secure</span>
          </div>

          <label className="block">
            <span className="text-xs font-800 text-gray-500" style={{ fontWeight: 800 }}>From USD</span>
            <input
              type="number"
              value={usd}
              onChange={(event) => setUsdAmount(event.target.value)}
              placeholder="0.00"
              className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-brand-blue-600"
            />
          </label>

          <div className="my-4 flex justify-center">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue-600 text-white shadow-md">
              <RefreshCw size={17} />
            </button>
          </div>

          <label className="block">
            <span className="text-xs font-800 text-gray-500" style={{ fontWeight: 800 }}>To {selected.symbol}</span>
            <div className="mt-1 flex gap-2">
              <input
                type="number"
                value={coinAmount}
                onChange={(event) => setTokenAmount(event.target.value)}
                placeholder="0.00000000"
                className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-brand-blue-600"
              />
              <div className={`flex w-20 items-center justify-center rounded-xl text-xs font-900 text-white ${selected.color}`} style={{ fontWeight: 900 }}>{selected.symbol}</div>
            </div>
          </label>

          <div className="mt-4 space-y-2 rounded-xl bg-gray-50 p-3 text-xs text-gray-500">
            <div className="flex justify-between"><span>Rate</span><span className="font-800 text-gray-700" style={{ fontWeight: 800 }}>1 {selected.symbol} = ${selected.price.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Network fee</span><span className="font-800 text-gray-700" style={{ fontWeight: 800 }}>~$2.50</span></div>
            <div className="flex justify-between"><span>Wallet</span><span className="inline-flex items-center gap-1 font-800 text-gray-700" style={{ fontWeight: 800 }}><Wallet size={13} /> Connected</span></div>
          </div>

          <button className="mt-4 w-full rounded-xl bg-brand-blue-600 py-2.5 text-sm font-900 text-white transition hover:bg-brand-blue-700" style={{ fontWeight: 900 }}>
            Preview swap
          </button>
        </section>
      </div>
    </div>
  );
}
