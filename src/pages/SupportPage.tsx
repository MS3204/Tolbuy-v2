import { useState, type FormEvent } from 'react';
import {
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  Send,
  Check,
} from 'lucide-react';

const faqs = [
  {
    q: 'كيف أتابع طلبي؟',
    a: 'يمكنك متابعة طلبك من قسم "الطلبات" في القائمة الجانبية، حيث ستجد حالة كل طلب وتاريخ التوصيل المتوقع.',
  },
  {
    q: 'ما هي TolToken وكيف أستخدمها؟',
    a: 'TolToken هي نقاط المكافآت التي تكسبها مع كل عملية شراء. يمكنك استبدالها بخصومات ومزايا حصرية من قسم TolToken.',
  },
  {
    q: 'هل التداول في Crypto-Tol آمن؟',
    a: 'نعم، نستخدم بروتوكولات أمان متقدمة وتشفيراً لحماية أصولك. ننصح دائماً بتفعيل المصادقة الثنائية.',
  },
  {
    q: 'كيف أتواصل مع الدعم؟',
    a: 'يمكنك استخدام الدردشة المباشرة، أو إرسال بريد إلكتروني، أو ملء نموذج التذكرة أدناه وسنرد خلال 24 ساعة.',
  },
];

const contactOptions = [
  { Icon: MessageCircle, labelAr: 'دردشة مباشرة', subAr: 'متاح 24/7', color: 'bg-brand-blue-600' },
  { Icon: Mail, labelAr: 'support@tolbuy.com', subAr: 'رد خلال 24 ساعة', color: 'bg-brand-green-500' },
  { Icon: Phone, labelAr: '9200-12345', subAr: 'الأحد - الخميس 9ص - 6م', color: 'bg-orange-500' },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !subject.trim() || !message.trim()) return;
    setSubmitted(true);
    setName('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-800 text-gray-900 flex items-center gap-2" style={{ fontWeight: 800 }}>
          <HelpCircle size={24} className="text-brand-blue-600" /> الدعم والمساعدة
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">نحن هنا لمساعدتك</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {contactOptions.map(({ Icon, labelAr, subAr, color }) => (
          <button
            key={labelAr}
            type="button"
            className="bg-white rounded-xl border border-gray-100 p-4 text-right hover:shadow-md hover:border-brand-blue-600/20 transition-all duration-200 flex items-start gap-3"
          >
            <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <Icon size={20} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-700 text-sm text-gray-800 truncate" style={{ fontWeight: 700 }}>{labelAr}</p>
              <p className="text-xs text-gray-400 mt-0.5">{subAr}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-700 text-gray-800" style={{ fontWeight: 700 }}>الأسئلة الشائعة</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-3 p-4 text-right hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-600 text-sm text-gray-800 flex-1" style={{ fontWeight: 600 }}>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-sm text-gray-500 leading-relaxed">{faq.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-700 text-gray-800" style={{ fontWeight: 700 }}>إرسال تذكرة دعم</h3>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">الاسم</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسمك الكامل"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-600/20 focus:border-brand-blue-600 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">الموضوع</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="موضوع الاستفسار"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-600/20 focus:border-brand-blue-600 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">الرسالة</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-600/20 focus:border-brand-blue-600 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={submitted}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-brand-blue-600 hover:bg-brand-blue-700 disabled:bg-brand-green-500 text-white rounded-xl font-700 text-sm transition-all hover:shadow-md"
              style={{ fontWeight: 700 }}
            >
              {submitted ? (
                <>
                  <Check size={16} />
                  تم إرسال التذكرة
                </>
              ) : (
                <>
                  <Send size={16} />
                  إرسال
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
