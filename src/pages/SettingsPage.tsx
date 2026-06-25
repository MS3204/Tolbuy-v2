import { useState } from 'react';
import { Settings, Bell, Shield, Moon, Globe, Save, Check } from 'lucide-react';

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-brand-blue-600' : 'bg-gray-200'}`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? 'right-0.5' : 'right-5'}`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [name, setName] = useState('أحمد محمد');
  const [email, setEmail] = useState('ahmed@example.com');
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('ar');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-800 text-gray-900 flex items-center gap-2" style={{ fontWeight: 800 }}>
          <Settings size={24} className="text-brand-blue-600" /> الإعدادات
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">إدارة حسابك وتفضيلاتك</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-700 text-gray-800 text-sm" style={{ fontWeight: 700 }}>الملف الشخصي</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue-600 to-brand-green-500 flex items-center justify-center text-white text-2xl font-700" style={{ fontWeight: 700 }}>
              أ
            </div>
            <button type="button" className="text-sm text-brand-blue-600 font-600 hover:underline" style={{ fontWeight: 600 }}>
              تغيير الصورة
            </button>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">الاسم</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-600/20 focus:border-brand-blue-600 transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-600/20 focus:border-brand-blue-600 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-700 text-gray-800 text-sm" style={{ fontWeight: 700 }}>التفضيلات</h3>
        </div>
        <div className="divide-y divide-gray-50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <Bell size={18} className="text-brand-blue-600" />
              </div>
              <div>
                <p className="text-sm font-600 text-gray-800" style={{ fontWeight: 600 }}>الإشعارات</p>
                <p className="text-xs text-gray-400">تلقي تنبيهات الطلبات والعروض</p>
              </div>
            </div>
            <Toggle enabled={notifications} onChange={setNotifications} />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                <Shield size={18} className="text-brand-green-500" />
              </div>
              <div>
                <p className="text-sm font-600 text-gray-800" style={{ fontWeight: 600 }}>المصادقة الثنائية</p>
                <p className="text-xs text-gray-400">حماية إضافية لحسابك</p>
              </div>
            </div>
            <Toggle enabled={twoFactor} onChange={setTwoFactor} />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <Moon size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-600 text-gray-800" style={{ fontWeight: 600 }}>الوضع الداكن</p>
                <p className="text-xs text-gray-400">تغيير مظهر التطبيق</p>
              </div>
            </div>
            <Toggle enabled={darkMode} onChange={setDarkMode} />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <Globe size={18} className="text-brand-blue-600" />
              </div>
              <div>
                <p className="text-sm font-600 text-gray-800" style={{ fontWeight: 600 }}>اللغة</p>
                <p className="text-xs text-gray-400">لغة واجهة التطبيق</p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-600/20 focus:border-brand-blue-600"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white rounded-xl font-700 text-sm transition-all hover:shadow-md"
        style={{ fontWeight: 700 }}
      >
        {saved ? (
          <>
            <Check size={16} />
            تم الحفظ
          </>
        ) : (
          <>
            <Save size={16} />
            حفظ التغييرات
          </>
        )}
      </button>
    </div>
  );
}
