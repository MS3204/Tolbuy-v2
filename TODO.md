- [x] Audit الحماية الحالية (Auth/UI + profiles RLS)
- [x] إنشاء migrations جديدة لـ orders + wallet_transactions + حماية role في profiles
- [x] تشغيل migrations في Supabase (Dashboard) وتأكيد إنشاء الجداول وتفعيل RLS

- [ ] refactor AuthProvider: جلب profiles.role من DB + تخزينها في context
- [ ] إضافة standardized auth error handling + توحيد validation في Login/Signup
- [ ] إضافة role-based guards في App/Pages لحماية Settings/Orders/Wallet
- [ ] تحسين Comments بالدارجة المغربية للأجزاء المعقدة
- [ ] تشغيل lint + typecheck + build وتجربة flows الأساسية

