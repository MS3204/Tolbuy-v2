import { ClipboardList, Package, Truck, CheckCircle, XCircle } from 'lucide-react';

const orders = [
  { id: 'TLB-001', nameAr: 'سماعات بلوتوث احترافية', price: 89.99, status: 'delivered', date: '2024-06-20', img: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'TLB-002', nameAr: 'وجبة برجر ديلوكس', price: 12.50, status: 'shipping', date: '2024-06-22', img: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'TLB-003', nameAr: 'دورة تعلم React', price: 49.00, status: 'completed', date: '2024-06-18', img: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'TLB-004', nameAr: 'كتاب تصميم الشعارات', price: 15.00, status: 'delivered', date: '2024-06-17', img: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'TLB-005', nameAr: 'حذاء رياضي خفيف', price: 65.00, status: 'cancelled', date: '2024-06-15', img: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

const statusMap = {
  delivered: { label: 'تم التوصيل', Icon: CheckCircle, cls: 'text-brand-green-500 bg-green-50' },
  shipping: { label: 'قيد التوصيل', Icon: Truck, cls: 'text-brand-blue-600 bg-blue-50' },
  completed: { label: 'مكتمل', Icon: Package, cls: 'text-gray-600 bg-gray-50' },
  cancelled: { label: 'ملغي', Icon: XCircle, cls: 'text-red-500 bg-red-50' },
};

export default function OrdersPage() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-800 text-gray-900 flex items-center gap-2" style={{ fontWeight: 800 }}>
            <ClipboardList size={24} className="text-brand-blue-600" /> طلباتي
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{orders.length} طلبات</p>
        </div>
      </div>
      <div className="space-y-3">
        {orders.map((order) => {
          const { label, Icon, cls } = statusMap[order.status as keyof typeof statusMap];
          return (
            <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
              <img src={order.img} alt={order.nameAr} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-400 font-600" style={{ fontWeight: 600 }}>#{order.id}</span>
                  <span className="text-xs text-gray-400">{order.date}</span>
                </div>
                <p className="font-700 text-gray-800 text-sm truncate" style={{ fontWeight: 700 }}>{order.nameAr}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-600 ${cls}`} style={{ fontWeight: 600 }}>
                  <Icon size={12} />
                  {label}
                </span>
                <span className="font-800 text-gray-900" style={{ fontWeight: 800 }}>${order.price}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
