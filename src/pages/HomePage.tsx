import { useState } from 'react';
import {
  ShoppingCart,
  Monitor,
  UtensilsCrossed,
  TrendingUp,
  Bitcoin,
  Bot,
  ArrowLeft,
  Eye,
  EyeOff,
  ArrowUpRight,
  Brain,
  BarChart2,
  ShieldCheck,
  Lightbulb,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';
import type { Section, Order } from '../types';

interface HomePageProps {
  onNavigate: (section: Section) => void;
}

const heroBanners = [
  {
    title: 'كل شيء تحتاجه في منصة واحدة',
    subtitle: 'تسوق، استثمر، تداول، ابدع و اربح مع TolBuy',
    gradient: 'from-brand-blue-600 via-blue-700 to-brand-green-500',
    image: 'https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'تداول العملات الرقمية بذكاء',
    subtitle: 'استخدم Crypto-Tol للتداول الآمن والفعّال',
    gradient: 'from-blue-800 via-brand-blue-600 to-cyan-500',
    image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'TolSentinel AI مساعدك الذكي',
    subtitle: 'تحليل السوق واتخاذ القرار بدعم من الذكاء الاصطناعي',
    gradient: 'from-brand-green-600 via-brand-green-500 to-teal-400',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const quickAccess = [
  { id: 'tolmarket' as Section, labelAr: 'TolMarket', actionAr: 'تسوق الآن', Icon: ShoppingCart, color: 'bg-blue-50 text-brand-blue-600', iconBg: 'bg-brand-blue-600' },
  { id: 'toldigital' as Section, labelAr: 'TolDigital', actionAr: 'منتجات رقمية', Icon: Monitor, color: 'bg-green-50 text-brand-green-600', iconBg: 'bg-brand-green-500' },
  { id: 'tolfood' as Section, labelAr: 'TolFood', actionAr: 'اطلب طعامك', Icon: UtensilsCrossed, color: 'bg-orange-50 text-orange-600', iconBg: 'bg-orange-500' },
  { id: 'toltrading' as Section, labelAr: 'TolTrading', actionAr: 'استثمر الآن', Icon: TrendingUp, color: 'bg-blue-50 text-brand-blue-600', iconBg: 'bg-brand-blue-700' },
  { id: 'crypto-tol' as Section, labelAr: 'Crypto-Tol', actionAr: 'تداول العملات', Icon: Bitcoin, color: 'bg-yellow-50 text-yellow-600', iconBg: 'bg-yellow-500' },
  { id: 'tolsentinel' as Section, labelAr: 'TolSentinel AI', actionAr: 'مساعدك الذكي', Icon: Bot, color: 'bg-green-50 text-brand-green-600', iconBg: 'bg-brand-green-500' },
];

const recentOrders: Order[] = [
  { id: '1', productAr: 'سماعات لاسلكية', price: 59.99, status: 'delivered', image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=80' },
  { id: '2', productAr: 'كتاب تصميم الشعارات', price: 15.00, status: 'delivered', image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=80' },
  { id: '3', productAr: 'وجبة برجر ديلوكس', price: 12.50, status: 'shipping', image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=80' },
  { id: '4', productAr: 'دورة تعلم البرمجة', price: 49.00, status: 'completed', image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=80' },
];

const chartData = [2000, 2400, 2200, 2800, 3100, 2900, 3400, 3200, 3800, 4100, 3900, 4532];
const chartLabels = ['01', '04', '07', '10', '13', '16', '19', '22', '25', '28', '30', '31'];

const statusConfig = {
  delivered: { label: 'تم التوصيل', className: 'bg-green-100 text-green-700' },
  shipping: { label: 'قيد التوصيل', className: 'bg-blue-100 text-brand-blue-600' },
  completed: { label: 'مكتمل', className: 'bg-gray-100 text-gray-600' },
  cancelled: { label: 'ملغي', className: 'bg-red-100 text-red-600' },
};

const aiFeatures = [
  { Icon: BarChart2, titleAr: 'تحليل السوق', subAr: 'اكتشف الفرص', color: 'text-brand-blue-600 bg-blue-50' },
  { Icon: ShieldCheck, titleAr: 'كشف المخاطر', subAr: 'حماية استثماراتك', color: 'text-brand-green-500 bg-green-50' },
  { Icon: Lightbulb, titleAr: 'اقتراح المنتجات', subAr: 'أفضل التوصيات', color: 'text-orange-500 bg-orange-50' },
  { Icon: DollarSign, titleAr: 'مراقبة الأسعار', subAr: 'تنبيهات ذكية', color: 'text-brand-blue-600 bg-blue-50' },
];

function MiniChart() {
  const maxVal = Math.max(...chartData);
  const minVal = Math.min(...chartData);
  const h = 100;
  const w = 320;
  const pts = chartData.map((v, i) => {
    const x = (i / (chartData.length - 1)) * w;
    const y = h - ((v - minVal) / (maxVal - minVal)) * (h - 10) - 5;
    return `${x},${y}`;
  });
  const polyline = pts.join(' ');
  const lastPt = pts[pts.length - 1].split(',');

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h + 20}`} className="w-full h-28" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E56C8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1E56C8" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <polygon
          points={`0,${h + 5} ${polyline} ${w},${h + 5}`}
          fill="url(#chartGrad)"
        />
        <polyline
          points={polyline}
          fill="none"
          stroke="#1E56C8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={lastPt[0]} cy={lastPt[1]} r="5" fill="#1E56C8" />
        <circle cx={lastPt[0]} cy={lastPt[1]} r="3" fill="white" />
        <rect x={Number(lastPt[0]) - 30} y={Number(lastPt[1]) - 22} width="60" height="18" rx="4" fill="#1E56C8" />
        <text x={Number(lastPt[0])} y={Number(lastPt[1]) - 9} textAnchor="middle" fill="white" fontSize="9" fontFamily="Cairo" fontWeight="700">
          $4,532
        </text>
      </svg>
      <div className="flex justify-between px-1 -mt-1">
        {chartLabels.map((l, i) => (
          <span key={i} className="text-[10px] text-gray-400" style={{ fontFamily: 'Cairo' }}>{l}</span>
        ))}
      </div>
    </div>
  );
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [balanceVisible, setBalanceVisible] = useState(true);

  const banner = heroBanners[bannerIndex];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Banner */}
      <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-l ${banner.gradient} min-h-48 flex items-center`}>
        <div className="absolute inset-0 opacity-20">
          <img src={banner.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 flex-1 p-8">
          <h1 className="text-2xl md:text-3xl font-800 text-white mb-2 leading-tight" style={{ fontWeight: 800 }}>
            {banner.title}
          </h1>
          <p className="text-white/80 text-sm md:text-base mb-5">{banner.subtitle}</p>
          <button
            onClick={() => onNavigate('tolmarket')}
            className="inline-flex items-center gap-2 bg-white text-brand-blue-600 px-5 py-2.5 rounded-xl font-700 text-sm hover:shadow-lg hover:scale-105 transition-all duration-200"
            style={{ fontWeight: 700 }}
          >
            <ChevronLeft size={16} />
            استكشف الآن
          </button>
        </div>
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => setBannerIndex(i)}
              className={`rounded-full transition-all duration-200 ${i === bannerIndex ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/50'}`}
            />
          ))}
        </div>
        {/* Nav arrows */}
        <button
          onClick={() => setBannerIndex((bannerIndex - 1 + heroBanners.length) % heroBanners.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => setBannerIndex((bannerIndex + 1) % heroBanners.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {quickAccess.map(({ id, labelAr, actionAr, Icon, iconBg }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-brand-blue-600/30 hover:shadow-md transition-all duration-200 group"
          >
            <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200 shadow-sm`}>
              <Icon size={22} />
            </div>
            <div className="text-center">
              <div className="text-xs font-700 text-gray-800 leading-tight" style={{ fontWeight: 700 }}>{labelAr}</div>
              <div className="text-[11px] text-gray-400 leading-tight flex items-center gap-0.5 justify-center">
                {actionAr}
                <ArrowLeft size={10} />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Wallet Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-700 text-gray-800 text-sm" style={{ fontWeight: 700 }}>محفظتي</h3>
            <button onClick={() => setBalanceVisible(!balanceVisible)} className="text-gray-400 hover:text-gray-600 transition-colors">
              {balanceVisible ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          <div className="mb-1">
            <span className="text-gray-400 text-xs">إجمالي الرصيد</span>
          </div>
          <div className="text-2xl font-800 text-gray-900 mb-1" style={{ fontWeight: 800 }}>
            {balanceVisible ? '$ 4,532.00' : '$ ••••••'}
          </div>
          <div className="flex items-center gap-1 mb-4">
            <ArrowUpRight size={14} className="text-brand-green-500" />
            <span className="text-brand-green-500 text-xs font-600" style={{ fontWeight: 600 }}>+ 12.55%</span>
            <span className="text-gray-400 text-xs">من الشهر الماضي</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onNavigate('wallet')}
              className="flex-1 py-2 bg-brand-blue-600 hover:bg-brand-blue-700 text-white rounded-xl text-sm font-700 transition-colors"
              style={{ fontWeight: 700 }}
            >
              إيداع
            </button>
            <button
              onClick={() => onNavigate('wallet')}
              className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-700 transition-colors"
              style={{ fontWeight: 700 }}
            >
              سحب
            </button>
          </div>

          {/* Asset Distribution */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-3 font-600" style={{ fontWeight: 600 }}>توزيع الأصول</p>
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#f3f4f6" strokeWidth="4" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#1E56C8" strokeWidth="4" strokeDasharray="39.6 88" strokeLinecap="round" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#3DBE6E" strokeWidth="4" strokeDasharray="26.4 88" strokeLinecap="round" strokeDashoffset="-39.6" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#60a5fa" strokeWidth="4" strokeDasharray="13.2 88" strokeLinecap="round" strokeDashoffset="-66" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="4" strokeDasharray="8.8 88" strokeLinecap="round" strokeDashoffset="-79.2" />
              </svg>
              <div className="space-y-1 flex-1">
                {[
                  { label: 'USD', pct: '45%', color: 'bg-brand-blue-600' },
                  { label: 'Crypto', pct: '30%', color: 'bg-brand-green-500' },
                  { label: 'Investments', pct: '15%', color: 'bg-blue-400' },
                  { label: 'Others', pct: '10%', color: 'bg-gray-200' },
                ].map(({ label, pct, color }) => (
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
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-700 text-gray-800 text-sm" style={{ fontWeight: 700 }}>أداء محفظتي الاستثمارية</h3>
            <span className="text-xs px-2 py-0.5 bg-blue-50 text-brand-blue-600 rounded-lg font-600" style={{ fontWeight: 600 }}>هذا الشهر</span>
          </div>
          <MiniChart />
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-700 text-gray-800 text-sm" style={{ fontWeight: 700 }}>آخر الطلبات</h3>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs text-brand-blue-600 hover:underline font-600"
              style={{ fontWeight: 600 }}
            >
              عرض الكل
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => {
              const { label, className } = statusConfig[order.status];
              return (
                <div key={order.id} className="flex items-center gap-3">
                  <img
                    src={order.image}
                    alt={order.productAr}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-600 text-gray-800 truncate" style={{ fontWeight: 600 }}>{order.productAr}</p>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-600 ${className}`} style={{ fontWeight: 600 }}>
                      {label}
                    </span>
                  </div>
                  <span className="text-sm font-700 text-gray-900 flex-shrink-0" style={{ fontWeight: 700 }}>
                    ${order.price.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* TolSentinel AI Banner */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue-600 to-brand-green-500 flex items-center justify-center shadow-lg">
              <Brain size={28} className="text-white" />
            </div>
            <div>
              <h3 className="font-800 text-gray-900 text-base" style={{ fontWeight: 800 }}>TolSentinel AI</h3>
              <p className="text-sm text-gray-500">مساعدك الذكي في التحليل واتخاذ القرار</p>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {aiFeatures.map(({ Icon, titleAr, subAr, color }) => (
              <div key={titleAr} className={`flex items-center gap-2 p-3 rounded-xl ${color.split(' ')[1]}`}>
                <Icon size={18} className={color.split(' ')[0]} />
                <div>
                  <p className="text-xs font-700 text-gray-800" style={{ fontWeight: 700 }}>{titleAr}</p>
                  <p className="text-[11px] text-gray-500">{subAr}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('tolsentinel')}
            className="flex-shrink-0 flex items-center gap-2 bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-4 py-2.5 rounded-xl font-700 text-sm transition-all hover:shadow-md"
            style={{ fontWeight: 700 }}
          >
            افتح المساعد
            <Bot size={16} />
          </button>
        </div>
      </div>

      {/* Featured Products Row */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-700 text-gray-800" style={{ fontWeight: 700 }}>منتجات مميزة</h3>
          <button onClick={() => onNavigate('tolmarket')} className="text-sm text-brand-blue-600 hover:underline font-600" style={{ fontWeight: 600 }}>
            عرض الكل
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { nameAr: 'سماعات بلوتوث احترافية', price: 89.99, rating: 4.8, reviews: 234, img: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'الأكثر مبيعًا' },
            { nameAr: 'ساعة ذكية متطورة', price: 149.99, rating: 4.6, reviews: 189, img: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'جديد' },
            { nameAr: 'حقيبة جلدية فاخرة', price: 75.00, rating: 4.7, reviews: 156, img: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400' },
            { nameAr: 'نظارات شمسية عصرية', price: 45.00, rating: 4.5, reviews: 98, img: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'خصم 20%' },
          ].map((p, i) => (
            <button
              key={i}
              onClick={() => onNavigate('tolmarket')}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-brand-blue-600/20 transition-all duration-200 text-right group"
            >
              <div className="relative overflow-hidden h-36">
                <img src={p.img} alt={p.nameAr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {p.badge && (
                  <span className="absolute top-2 right-2 text-[11px] px-2 py-0.5 bg-brand-blue-600 text-white rounded-full font-600" style={{ fontWeight: 600 }}>
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-600 text-gray-800 mb-1 truncate" style={{ fontWeight: 600 }}>{p.nameAr}</p>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={11} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-gray-500">{p.rating} ({p.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-800 text-brand-blue-600 text-sm" style={{ fontWeight: 800 }}>${p.price}</span>
                  <span className="w-7 h-7 bg-brand-blue-600 rounded-lg flex items-center justify-center">
                    <ShoppingCart size={13} className="text-white" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
