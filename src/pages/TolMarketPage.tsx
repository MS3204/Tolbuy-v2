import { useMemo, useState } from 'react';
import { Heart, ListFilter, Search, ShoppingCart, SlidersHorizontal, Star } from 'lucide-react';

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Beauty'];

const products = [
  { id: 1, name: 'Noise cancelling headphones', price: 89.99, originalPrice: 129, rating: 4.8, reviews: 234, category: 'Electronics', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600', badge: 'Best seller' },
  { id: 2, name: 'Smart fitness watch', price: 149.99, originalPrice: 199, rating: 4.6, reviews: 189, category: 'Electronics', image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600', badge: 'New' },
  { id: 3, name: 'Leather city backpack', price: 75, rating: 4.7, reviews: 156, category: 'Fashion', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 4, name: 'Modern sunglasses', price: 45, originalPrice: 60, rating: 4.5, reviews: 98, category: 'Fashion', image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=600', badge: '25% off' },
  { id: 5, name: 'Ergonomic office chair', price: 210, rating: 4.9, reviews: 312, category: 'Home', image: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 6, name: 'Lightweight running shoes', price: 65, originalPrice: 85, rating: 4.4, reviews: 201, category: 'Sports', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 7, name: 'Professional laptop', price: 999, originalPrice: 1200, rating: 4.8, reviews: 445, category: 'Electronics', image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600', badge: 'Limited' },
  { id: 8, name: 'Design systems handbook', price: 18, rating: 4.6, reviews: 87, category: 'Books', image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 9, name: 'Signature fragrance', price: 95, originalPrice: 130, rating: 4.7, reviews: 178, category: 'Beauty', image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 10, name: 'Cotton classic shirt', price: 35, rating: 4.3, reviews: 122, category: 'Fashion', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 11, name: 'Daily skincare mask', price: 28, rating: 4.5, reviews: 95, category: 'Beauty', image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 12, name: 'Adjustable dumbbell set', price: 42, rating: 4.6, reviews: 143, category: 'Sports', image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

export default function TolMarketPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sort, setSort] = useState<'featured' | 'price' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => activeCategory === 'All' || product.category === activeCategory)
      .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        if (sort === 'price') return a.price - b.price;
        if (sort === 'rating') return b.rating - a.rating;
        return a.id - b.id;
      });
  }, [activeCategory, query, sort]);

  const total = cart.reduce((sum, id) => sum + (products.find((product) => product.id === id)?.price ?? 0), 0);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-800 text-gray-900" style={{ fontWeight: 800 }}>TolMarket</h1>
          <p className="text-sm text-gray-500 mt-0.5">Shop curated physical products with filters, favorites, and a live cart.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:flex">
          <div className="rounded-xl bg-white border border-gray-100 px-4 py-2">
            <p className="text-xs text-gray-400">Cart items</p>
            <p className="text-lg font-800 text-brand-blue-600" style={{ fontWeight: 800 }}>{cart.length}</p>
          </div>
          <div className="rounded-xl bg-white border border-gray-100 px-4 py-2">
            <p className="text-xs text-gray-400">Cart total</p>
            <p className="text-lg font-800 text-gray-900" style={{ fontWeight: 800 }}>${total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <section className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search TolMarket"
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm outline-none transition focus:border-brand-blue-600 focus:ring-2 focus:ring-brand-blue-600/15"
          />
        </div>
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as typeof sort)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-brand-blue-600"
        >
          <option value="featured">Featured</option>
          <option value="price">Lowest price</option>
          <option value="rating">Top rated</option>
        </select>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-700 text-gray-700 hover:bg-gray-50" style={{ fontWeight: 700 }}>
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </section>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-700 transition ${activeCategory === category ? 'bg-brand-blue-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-blue-600/40'}`}
            style={{ fontWeight: 700 }}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white p-10 text-center">
          <ListFilter size={36} className="mx-auto mb-3 text-gray-300" />
          <p className="font-700 text-gray-700" style={{ fontWeight: 700 }}>No products match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filteredProducts.map((product) => {
            const inCart = cart.includes(product.id);
            const isFavorite = favorites.includes(product.id);

            return (
              <article key={product.id} className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:border-brand-blue-600/25 hover:shadow-md">
                <div className="relative h-44 overflow-hidden">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-300 hover:scale-105" />
                  {product.badge && (
                    <span className="absolute right-3 top-3 rounded-full bg-brand-blue-600 px-2 py-1 text-[11px] font-700 text-white" style={{ fontWeight: 700 }}>{product.badge}</span>
                  )}
                  <button
                    onClick={() => setFavorites((items) => isFavorite ? items.filter((id) => id !== product.id) : [...items, product.id])}
                    className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm transition hover:scale-105"
                    aria-label="Toggle favorite"
                  >
                    <Heart size={15} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-sm font-800 text-gray-900" style={{ fontWeight: 800 }}>{product.name}</h2>
                      <p className="text-xs text-gray-400">{product.category}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-900 text-brand-blue-600" style={{ fontWeight: 900 }}>${product.price.toFixed(2)}</p>
                      {product.originalPrice && <p className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</p>}
                    </div>
                  </div>
                  <div className="mb-4 flex items-center gap-1 text-xs text-gray-500">
                    <Star size={13} className="fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                    <span>({product.reviews})</span>
                  </div>
                  <button
                    onClick={() => setCart((items) => inCart ? items.filter((id) => id !== product.id) : [...items, product.id])}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-800 transition ${inCart ? 'bg-brand-green-500 text-white hover:bg-brand-green-600' : 'bg-brand-blue-600 text-white hover:bg-brand-blue-700'}`}
                    style={{ fontWeight: 800 }}
                  >
                    <ShoppingCart size={15} />
                    {inCart ? 'Added to cart' : 'Add to cart'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
