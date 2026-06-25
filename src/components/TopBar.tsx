import { useState } from 'react';
import {
  Bell,
  ChevronDown,
  Globe,
  LogOut,
  Menu,
  MessageCircle,
  Search,
  ShoppingCart,
  X,
} from 'lucide-react';
import type { Section } from '../types';

interface TopBarProps {
  onToggleSidebar: () => void;
  onNavigate: (section: Section) => void;
  onLogout: () => void;
  sidebarWidth: number;
  userEmail?: string;
}

export default function TopBar({ onToggleSidebar, onNavigate, onLogout, sidebarWidth, userEmail }: TopBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const avatarLetter = userEmail?.charAt(0).toUpperCase() ?? 'T';

  return (
    <header
      className="fixed top-0 left-0 h-16 bg-white border-b border-gray-100 z-30 flex items-center px-4 gap-3 shadow-sm transition-all duration-300"
      style={{ right: sidebarWidth }}
    >
      <button
        onClick={onToggleSidebar}
        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600 flex-shrink-0"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search products, services, investors..."
            className="w-full pr-10 pl-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-600/20 focus:border-brand-blue-600 transition-all placeholder:text-gray-400"
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 mr-auto">
        <button
          onClick={() => onNavigate('orders')}
          className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          aria-label="Orders"
        >
          <ShoppingCart size={20} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-brand-blue-600 text-white text-[10px] rounded-full flex items-center justify-center font-700 leading-none" style={{ fontWeight: 700 }}>
            2
          </span>
        </button>

        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-brand-green-500 text-white text-[10px] rounded-full flex items-center justify-center font-700 leading-none" style={{ fontWeight: 700 }}>
            5
          </span>
        </button>

        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600" aria-label="Messages">
          <MessageCircle size={20} />
        </button>

        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600" aria-label="Language">
          <Globe size={20} />
        </button>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        <button className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue-600 to-brand-green-500 flex items-center justify-center text-white text-sm font-700" style={{ fontWeight: 700 }}>
            {avatarLetter}
          </div>
          <span className="text-sm font-600 text-gray-700 hidden sm:block max-w-40 truncate" style={{ fontWeight: 600 }} dir="ltr">
            {userEmail ?? 'TolBuy user'}
          </span>
          <ChevronDown size={14} className="text-gray-400" />
        </button>

        <button
          onClick={onLogout}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors text-gray-500 hover:text-red-600"
          title="Sign out"
          aria-label="Sign out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
