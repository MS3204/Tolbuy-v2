import { useMemo, useState } from 'react';
import { Clock, Flame, MapPin, Minus, Plus, Search, ShoppingBag, Star } from 'lucide-react';

const categories = ['All', 'Burger', 'Pizza', 'Grill', 'Salads', 'Drinks', 'Dessert'];

const restaurants = [
  { id: 1, name: 'Royal Burger House', cuisine: 'Burger', rating: 4.8, delivery: '25-35 min', fee: 2.5, image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=700', badge: 'Fastest', open: true },
  { id: 2, name: 'Mama Pizza', cuisine: 'Pizza', rating: 4.6, delivery: '30-45 min', fee: 3, image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=700', open: true },
  { id: 3, name: 'Sultan Grill', cuisine: 'Grill', rating: 4.9, delivery: '40-55 min', fee: 4, image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=700', badge: 'Top rated', open: true },
  { id: 4, name: 'Green Bowl', cuisine: 'Salads', rating: 4.5, delivery: '20-30 min', fee: 2, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=700', open: false },
  { id: 5, name: 'Eastern Sweets', cuisine: 'Dessert', rating: 4.7, delivery: '35-50 min', fee: 3.5, image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=700', badge: 'New', open: true },
  { id: 6, name: 'Cafe Select', cuisine: 'Drinks', rating: 4.4, delivery: '15-25 min', fee: 1.5, image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=700', open: true },
];

const menu = [
  { id: 1, name: 'Double deluxe burger', restaurant: 'Royal Burger House', price: 12.5, category: 'Burger', calories: 680, hot: true, image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, name: 'Margherita pizza', restaurant: 'Mama Pizza', price: 18, category: 'Pizza', calories: 920, image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 3, name: 'Premium mixed grill', restaurant: 'Sultan Grill', price: 22, category: 'Grill', calories: 750, hot: true, image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 4, name: 'Caesar salad', restaurant: 'Green Bowl', price: 9.5, category: 'Salads', calories: 320, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 5, name: 'Iced latte', restaurant: 'Cafe Select', price: 5.5, category: 'Drinks', calories: 130, image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 6, name: 'Pistachio dessert box', restaurant: 'Eastern Sweets', price: 14, category: 'Dessert', calories: 520, image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export default function TolFoodPage() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<Record<number, number>>({});
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0].id);

  const filteredMenu = useMemo(() => {
    return menu.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) || item.restaurant.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const cartItems = Object.entries(cart).reduce((sum, [, quantity]) => sum + quantity, 0);
  const subtotal = Object.entries(cart).reduce((sum, [id, quantity]) => {
    const item = menu.find((menuItem) => menuItem.id === Number(id));
    return sum + (item?.price ?? 0) * quantity;
  }, 0);

  const updateCart = (id: number, delta: number) => {
    setCart((current) => {
      const nextQuantity = Math.max((current[id] ?? 0) + delta, 0);
      const next = { ...current };
      if (nextQuantity === 0) delete next[id];
      else next[id] = nextQuantity;
      return next;
    });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-800 text-gray-900" style={{ fontWeight: 800 }}>TolFood</h1>
          <p className="text-sm text-gray-500 mt-0.5">Order from nearby restaurants with a live basket and category menu.</p>
        </div>
        <div className="rounded-xl bg-brand-green-500 px-4 py-3 text-white">
          <div className="flex items-center gap-2 text-sm font-800" style={{ fontWeight: 800 }}>
            <ShoppingBag size={16} />
            {cartItems} items
          </div>
          <p className="text-xs text-white/75">${subtotal.toFixed(2)} subtotal</p>
        </div>
      </div>

      <section className="rounded-2xl bg-gradient-to-l from-brand-green-500 to-brand-blue-600 p-5 text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-900" style={{ fontWeight: 900 }}>Fast delivery to your door</h2>
            <p className="mt-1 text-sm text-white/80">Average delivery is under 30 minutes in active zones.</p>
            <div className="mt-3 flex items-center gap-2 text-sm text-white/90">
              <MapPin size={15} />
              Casablanca, Morocco
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {['Live tracking', 'Fresh picks', 'Secure pay'].map((item) => (
              <div key={item} className="rounded-xl bg-white/15 px-4 py-3 text-center text-sm font-800" style={{ fontWeight: 800 }}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search meals or restaurants"
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm outline-none transition focus:border-brand-green-500 focus:ring-2 focus:ring-brand-green-500/15"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-700 transition ${category === item ? 'bg-brand-green-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-green-500/40'}`}
              style={{ fontWeight: 700 }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-900 text-gray-900" style={{ fontWeight: 900 }}>Restaurants</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {restaurants.map((restaurant) => (
            <button
              key={restaurant.id}
              onClick={() => restaurant.open && setSelectedRestaurant(restaurant.id)}
              className={`overflow-hidden rounded-xl border bg-white text-right shadow-sm transition ${selectedRestaurant === restaurant.id ? 'border-brand-green-500 shadow-md' : 'border-gray-100'} ${restaurant.open ? 'hover:border-brand-green-500/35' : 'cursor-not-allowed opacity-60'}`}
            >
              <div className="relative h-32 overflow-hidden">
                <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                {restaurant.badge && <span className="absolute right-3 top-3 rounded-full bg-brand-green-500 px-2 py-1 text-[11px] font-800 text-white" style={{ fontWeight: 800 }}>{restaurant.badge}</span>}
                {!restaurant.open && <span className="absolute left-3 top-3 rounded-full bg-gray-900/80 px-2 py-1 text-[11px] font-800 text-white" style={{ fontWeight: 800 }}>Closed</span>}
                <h3 className="absolute bottom-3 right-3 text-sm font-900 text-white" style={{ fontWeight: 900 }}>{restaurant.name}</h3>
              </div>
              <div className="flex items-center justify-between p-3 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1"><Star size={13} className="fill-yellow-400 text-yellow-400" />{restaurant.rating}</span>
                <span className="inline-flex items-center gap-1"><Clock size={13} />{restaurant.delivery}</span>
                <span>${restaurant.fee.toFixed(2)} fee</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-900 text-gray-900" style={{ fontWeight: 900 }}>Popular menu</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredMenu.map((item) => (
            <article key={item.id} className="flex overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
              <img src={item.image} alt={item.name} className="h-32 w-32 flex-shrink-0 object-cover" />
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-900 text-gray-900" style={{ fontWeight: 900 }}>{item.name}</h3>
                    {item.hot && <Flame size={16} className="text-orange-500" />}
                  </div>
                  <p className="mt-1 text-xs text-gray-400">{item.restaurant} · {item.calories} cal</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-900 text-brand-green-500" style={{ fontWeight: 900 }}>${item.price.toFixed(2)}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateCart(item.id, -1)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                      <Minus size={14} />
                    </button>
                    <span className="w-5 text-center text-sm font-800 text-gray-800" style={{ fontWeight: 800 }}>{cart[item.id] ?? 0}</span>
                    <button onClick={() => updateCart(item.id, 1)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green-500 text-white hover:bg-brand-green-600">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
