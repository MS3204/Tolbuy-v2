import { Heart, ShoppingCart } from 'lucide-react';

const favoriteItems = [
  { id: 1, nameAr: 'سماعات بلوتوث احترافية', price: 89.99, img: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 2, nameAr: 'ساعة ذكية متطورة', price: 149.99, img: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 3, nameAr: 'لابتوب للمحترفين', price: 999.00, img: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

export default function FavoritesPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-800 text-gray-900 flex items-center gap-2" style={{ fontWeight: 800 }}>
          <Heart size={24} className="text-red-500 fill-red-500" /> المفضلة
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">{favoriteItems.length} منتجات محفوظة</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoriteItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all">
            <div className="relative h-40">
              <img src={item.img} alt={item.nameAr} className="w-full h-full object-cover" />
              <button className="absolute top-2 left-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                <Heart size={13} className="text-red-500 fill-red-500" />
              </button>
            </div>
            <div className="p-3">
              <p className="text-sm font-600 text-gray-800 mb-2 truncate" style={{ fontWeight: 600 }}>{item.nameAr}</p>
              <div className="flex items-center justify-between">
                <span className="font-800 text-brand-blue-600" style={{ fontWeight: 800 }}>${item.price}</span>
                <button className="w-8 h-8 bg-brand-blue-600 text-white rounded-lg flex items-center justify-center">
                  <ShoppingCart size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
