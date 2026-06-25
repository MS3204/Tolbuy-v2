import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, BarChart3, Bot, Brain, Lightbulb, Send, ShieldCheck, Sparkles, TrendingUp, User, Zap } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'ai';
  text: string;
}

const suggestions = [
  'Analyze my tech stocks',
  'Find portfolio risks',
  'Suggest products to sell',
  'Summarize crypto trend',
];

const responses = [
  'The current signal favors quality technology names, but concentration risk is high. Consider balancing high-growth exposure with cash-flow positive holdings.',
  'I found three risk pockets: crypto volatility, single-sector concentration, and orders tied to low-margin products. Reducing overlap would improve resilience.',
  'The strongest commerce opportunity is a bundle strategy: pair high-rating digital products with physical accessories and reward the purchase with TolToken points.',
  'Bitcoin momentum is positive, but short-term volatility remains elevated. Use staged entries and avoid committing the full order at once.',
];

const insights = [
  { title: 'Market signal', value: 'Bullish', Icon: TrendingUp, color: 'text-brand-green-500 bg-green-50' },
  { title: 'Risk level', value: 'Medium', Icon: AlertTriangle, color: 'text-yellow-600 bg-yellow-50' },
  { title: 'AI confidence', value: '91%', Icon: Brain, color: 'text-brand-blue-600 bg-blue-50' },
  { title: 'Protected assets', value: '8', Icon: ShieldCheck, color: 'text-brand-green-500 bg-green-50' },
];

const playbooks = [
  { title: 'Rebalance portfolio', desc: 'Reduce overweight assets and keep exposure within target bands.', Icon: BarChart3 },
  { title: 'Detect abnormal orders', desc: 'Scan commerce activity for unusual refunds, chargebacks, or delivery delays.', Icon: ShieldCheck },
  { title: 'Improve product mix', desc: 'Find high-margin products that pair well with current customer demand.', Icon: Lightbulb },
];

export default function TolSentinelPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'ai', text: 'Welcome to TolSentinel AI. Ask me about markets, products, risk, or portfolio decisions.' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const nextId = useRef(2);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    const clean = text.trim();
    if (!clean) return;

    setMessages((current) => [...current, { id: nextId.current++, role: 'user', text: clean }]);
    setInput('');
    setTyping(true);

    window.setTimeout(() => {
      const answer = responses[(nextId.current + clean.length) % responses.length];
      setMessages((current) => [...current, { id: nextId.current++, role: 'ai', text: answer }]);
      setTyping(false);
    }, 700);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-2xl font-800 text-gray-900" style={{ fontWeight: 800 }}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue-600 to-brand-green-500 text-white shadow-md">
              <Bot size={22} />
            </span>
            TolSentinel AI
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">An interactive assistant for commerce, crypto, trading, and risk intelligence.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl bg-white border border-gray-100 px-4 py-2 text-sm font-800 text-brand-green-500" style={{ fontWeight: 800 }}>
          <Zap size={16} />
          Live assistant
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="flex h-[620px] flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-l from-brand-blue-600 to-brand-green-500 p-4 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Sparkles size={19} />
            </div>
            <div>
              <p className="text-sm font-900" style={{ fontWeight: 900 }}>TolSentinel chat</p>
              <p className="text-xs text-white/75">Market and business intelligence sandbox</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${message.role === 'ai' ? 'bg-brand-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {message.role === 'ai' ? <Bot size={15} /> : <User size={15} />}
                </div>
                <div className={`max-w-[78%] rounded-xl px-3 py-2.5 text-sm leading-6 ${message.role === 'ai' ? 'rounded-tr-none bg-gray-50 text-gray-800' : 'rounded-tl-none bg-brand-blue-600 text-white'}`}>
                  {message.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue-600 text-white"><Bot size={15} /></div>
                <div className="rounded-xl rounded-tr-none bg-gray-50 px-4 py-3">
                  <div className="flex h-4 items-center gap-1">
                    {[0, 1, 2].map((index) => <span key={index} className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: `${index * 0.12}s` }} />)}
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-gray-100 p-3">
            <div className="mb-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  className="whitespace-nowrap rounded-full bg-blue-50 px-3 py-1.5 text-xs font-800 text-brand-blue-600 hover:bg-blue-100"
                  style={{ fontWeight: 800 }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && sendMessage(input)}
                placeholder="Ask TolSentinel..."
                className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-brand-blue-600"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue-600 text-white transition hover:bg-brand-blue-700 disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {insights.map(({ title, value, Icon, color }) => (
              <div key={title} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${color.split(' ')[1]}`}>
                  <Icon size={18} className={color.split(' ')[0]} />
                </div>
                <p className="text-xs text-gray-400">{title}</p>
                <p className="text-lg font-900 text-gray-900" style={{ fontWeight: 900 }}>{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-sm font-900 text-gray-900" style={{ fontWeight: 900 }}>Action playbooks</h2>
            <div className="space-y-3">
              {playbooks.map(({ title, desc, Icon }) => (
                <button key={title} className="flex w-full items-start gap-3 rounded-xl border border-gray-100 p-3 text-right transition hover:border-brand-blue-600/30 hover:bg-blue-50/50">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand-blue-600">
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-900 text-gray-900" style={{ fontWeight: 900 }}>{title}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-gray-400">{desc}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
