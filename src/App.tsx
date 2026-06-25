import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import HomePage from './pages/HomePage';
import TolMarketPage from './pages/TolMarketPage';
import TolDigitalPage from './pages/TolDigitalPage';
import TolFoodPage from './pages/TolFoodPage';
import TolTradingPage from './pages/TolTradingPage';
import CryptoTolPage from './pages/CryptoTolPage';
import TolSentinelPage from './pages/TolSentinelPage';
import TolTokenPage from './pages/TolTokenPage';
import FavoritesPage from './pages/FavoritesPage';
import OrdersPage from './pages/OrdersPage';
import WalletPage from './pages/WalletPage';
import SettingsPage from './pages/SettingsPage';
import SupportPage from './pages/SupportPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import SignupPage from './pages/SignupPage';
import { useAuth } from './auth/AuthContext';
import type { Section } from './types';

const sidebarWidth = 256; // 64 * 4 = w-64

export default function App() {
  const { user, session, loading } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup' | 'logout'>('login');

  const contentMargin = sidebarCollapsed ? 64 : sidebarWidth;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-cairo flex items-center justify-center" dir="rtl">
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-6 py-4 text-center">
          <div className="mx-auto mb-2 h-9 w-9 rounded-full border-4 border-blue-100 border-t-brand-blue-600 animate-spin" />
          <p className="text-sm font-700 text-gray-700" style={{ fontWeight: 700 }}>
            Loading your session...
          </p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return authView === 'signup'
      ? <SignupPage onShowLogin={() => setAuthView('login')} />
      : <LoginPage onShowSignup={() => setAuthView('signup')} />;
  }

  if (authView === 'logout') {
    return (
      <LogoutPage
        onCancel={() => setAuthView('login')}
        onLoggedOut={() => {
          setActiveSection('home');
          setAuthView('login');
        }}
      />
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage onNavigate={setActiveSection} />;
      case 'tolmarket':
        return <TolMarketPage />;
      case 'toldigital':
        return <TolDigitalPage />;
      case 'tolfood':
        return <TolFoodPage />;
      case 'toltrading':
        return <TolTradingPage />;
      case 'crypto-tol':
        return <CryptoTolPage />;
      case 'tolsentinel':
        return <TolSentinelPage />;
      case 'toltoken':
        return <TolTokenPage />;
      case 'favorites':
        return <FavoritesPage />;
      case 'orders':
        return <OrdersPage />;
      case 'wallet':
        return <WalletPage />;
      case 'settings':
        return <SettingsPage />;
      case 'support':
        return <SupportPage />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-64 text-center animate-fade-in">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">🔧</span>
            </div>
            <h2 className="text-xl font-700 text-gray-800 mb-2" style={{ fontWeight: 700 }}>
              قيد التطوير
            </h2>
            <p className="text-sm text-gray-400">هذا القسم سيكون متاحاً قريباً</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-cairo" dir="rtl">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        collapsed={sidebarCollapsed}
      />

      {/* Main Layout */}
      <div
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginRight: contentMargin }}
      >
        {/* TopBar */}
        <TopBar
          onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
          onNavigate={setActiveSection}
          onLogout={() => setAuthView('logout')}
          sidebarWidth={contentMargin}
          userEmail={user?.email ?? ''}
        />

        {/* Page Content */}
        <main className="flex-1 pt-16">
          <div className="max-w-7xl mx-auto px-4 py-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

