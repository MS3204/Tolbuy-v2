import {
  Home,
  ShoppingCart,
  Monitor,
  UtensilsCrossed,
  TrendingUp,
  Bitcoin,
  Bot,
  Coins,
  Heart,
  ClipboardList,
  Wallet,
  Settings,
  HelpCircle,
  ChevronLeft,
  ShieldCheck,
} from 'lucide-react';
import type { Section } from '../types';

interface SidebarProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
  collapsed: boolean;
}

const primaryNav = [
  { id: 'tolmarket' as Section, labelAr: 'TolMarket', subAr: 'التجارة التقليدية', Icon: ShoppingCart },
  { id: 'toldigital' as Section, labelAr: 'TolDigital', subAr: 'المنتجات الرقمية', Icon: Monitor },
  { id: 'tolfood' as Section, labelAr: 'TolFood', subAr: 'الطعام والمشروبات', Icon: UtensilsCrossed },
  { id: 'toltrading' as Section, labelAr: 'TolTrading', subAr: 'الاستثمار والتداول', Icon: TrendingUp },
  { id: 'crypto-tol' as Section, labelAr: 'Crypto-Tol', subAr: 'العملات الرقمية', Icon: Bitcoin },
  { id: 'tolsentinel' as Section, labelAr: 'TolSentinel AI', subAr: 'الذكاء الاصطناعي', Icon: Bot },
  { id: 'toltoken' as Section, labelAr: 'TolToken', subAr: 'المكافآت والنقاط', Icon: Coins },
];

const secondaryNav = [
  { id: 'favorites' as Section, labelAr: 'المفضلة', Icon: Heart },
  { id: 'orders' as Section, labelAr: 'الطلبات', Icon: ClipboardList },
  { id: 'wallet' as Section, labelAr: 'المحفظة', Icon: Wallet },
  { id: 'settings' as Section, labelAr: 'الإعدادات', Icon: Settings },
  { id: 'support' as Section, labelAr: 'الدعم والمساعدة', Icon: HelpCircle },
];

export default function Sidebar({ activeSection, onNavigate, collapsed }: SidebarProps) {
  return (
    <aside
      className={`
        fixed top-0 right-0 h-full bg-white border-l border-gray-100 z-40
        flex flex-col transition-all duration-300 shadow-sm
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-4 cursor-pointer border-b border-gray-100"
        onClick={() => onNavigate('home')}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-brand-blue-600 relative">
          <ShoppingCart size={18} className="text-white" />
          <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 bg-brand-green-500 rounded-full flex items-center justify-center">
            <ShieldCheck size={9} className="text-white" />
          </div>
        </div>
        {!collapsed && (
          <div className="flex items-baseline gap-0.5">
            <span className="text-xl font-900 text-brand-blue-600 leading-none" style={{ fontWeight: 800 }}>Tol</span>
            <span className="text-xl font-900 text-brand-green-500 leading-none" style={{ fontWeight: 800 }}>Buy</span>
          </div>
        )}
      </div>

      {/* Home */}
      <div className="px-3 pt-3">
        <button
          onClick={() => onNavigate('home')}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
            ${activeSection === 'home'
              ? 'bg-brand-blue-600 text-white shadow-md shadow-brand-blue-600/30'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
          `}
        >
          <Home size={18} className="flex-shrink-0" />
          {!collapsed && <span className="font-600 text-sm" style={{ fontWeight: 600 }}>الرئيسية</span>}
        </button>
      </div>

      {/* Primary Navigation */}
      <div className="px-3 pt-2 flex-1 overflow-y-auto scrollbar-hide">
        <div className="space-y-0.5">
          {primaryNav.map(({ id, labelAr, subAr, Icon }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                  ${isActive
                    ? 'bg-blue-50 text-brand-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all
                  ${isActive
                    ? 'bg-brand-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-brand-blue-600'}
                `}>
                  <Icon size={16} />
                </div>
                {!collapsed && (
                  <div className="text-right flex-1 min-w-0">
                    <div className={`text-sm leading-tight truncate ${isActive ? 'font-700 text-brand-blue-600' : 'font-600 text-gray-700'}`} style={{ fontWeight: isActive ? 700 : 600 }}>
                      {labelAr}
                    </div>
                    <div className="text-xs text-gray-400 truncate leading-tight mt-0.5">{subAr}</div>
                  </div>
                )}
                {!collapsed && isActive && (
                  <ChevronLeft size={14} className="text-brand-blue-600 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 border-t border-gray-100 pt-3 space-y-0.5">
          {secondaryNav.map(({ id, labelAr, Icon }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200
                  ${isActive
                    ? 'bg-blue-50 text-brand-blue-600 font-600'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}
                `}
              >
                <Icon size={16} className="flex-shrink-0" />
                {!collapsed && <span className="text-sm" style={{ fontWeight: isActive ? 600 : 400 }}>{labelAr}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* TolToken Balance Widget */}
      {!collapsed && (
        <div className="m-3 p-3 rounded-xl bg-gradient-to-br from-brand-blue-600 to-brand-green-500 text-white">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs opacity-80">رصيد TolToken</span>
            <Coins size={16} className="opacity-80" />
          </div>
          <div className="text-2xl font-800 leading-tight" style={{ fontWeight: 800 }}>2,450</div>
          <div className="text-xs opacity-70 mb-2">نقطة</div>
          <button
            onClick={() => onNavigate('toltoken')}
            className="w-full py-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-xs font-600"
            style={{ fontWeight: 600 }}
          >
            استكشف المزايا
          </button>
        </div>
      )}
    </aside>
  );
}
