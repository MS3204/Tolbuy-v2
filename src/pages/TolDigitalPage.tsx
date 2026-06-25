import { useMemo, useState } from 'react';
import { BookOpen, Code2, Download, FileArchive, Globe2, GraduationCap, Palette, Search, Star, Video } from 'lucide-react';

const categories = [
  { label: 'All', Icon: Globe2 },
  { label: 'Software', Icon: Code2 },
  { label: 'Courses', Icon: GraduationCap },
  { label: 'Design', Icon: Palette },
  { label: 'Templates', Icon: FileArchive },
  { label: 'Video', Icon: Video },
];

const digitalProducts = [
  { id: 1, name: 'Advanced React course', category: 'Courses', price: 49, rating: 4.9, reviews: 1240, type: 'Course', meta: '24 hours', image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600', badge: 'Best seller' },
  { id: 2, name: 'Premium ecommerce UI kit', category: 'Design', price: 35, rating: 4.7, reviews: 543, type: 'Figma', meta: '128 screens', image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 3, name: 'SVG icon library', category: 'Design', price: 15, rating: 4.8, reviews: 892, type: 'Asset pack', meta: '1000 icons', image: 'https://images.pexels.com/photos/326502/pexels-photo-326502.jpeg?auto=compress&cs=tinysrgb&w=600', badge: 'New' },
  { id: 4, name: 'Python data bootcamp', category: 'Courses', price: 59, rating: 4.8, reviews: 987, type: 'Course', meta: '32 hours', image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 5, name: 'Royalty-free music pack', category: 'Video', price: 25, rating: 4.5, reviews: 312, type: 'Audio', meta: '80 tracks', image: 'https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 6, name: 'Project management script', category: 'Software', price: 79, rating: 4.6, reviews: 234, type: 'Script', meta: 'React + API', image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600', badge: 'Pro' },
  { id: 7, name: 'Resume template bundle', category: 'Templates', price: 8, rating: 4.4, reviews: 1890, type: 'Templates', meta: '32 files', image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 8, name: 'AI product strategy course', category: 'Courses', price: 89, rating: 4.9, reviews: 2100, type: 'Course', meta: '40 hours', image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600', badge: 'Special' },
];

export default function TolDigitalPage() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [library, setLibrary] = useState<number[]>([]);

  const filtered = useMemo(() => {
    return digitalProducts.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) || product.type.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-800 text-gray-900" style={{ fontWeight: 800 }}>TolDigital</h1>
          <p className="text-sm text-gray-500 mt-0.5">Buy, unlock, and download digital products instantly.</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            ['Products', '2,400+'],
            ['Creators', '180+'],
            ['Downloads', '50K+'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-white border border-gray-100 px-4 py-2 text-center">
              <p className="text-lg font-900 text-brand-blue-600" style={{ fontWeight: 900 }}>{value}</p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search courses, templates, scripts..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm outline-none transition focus:border-brand-blue-600 focus:ring-2 focus:ring-brand-blue-600/15"
          />
        </div>
        <div className="rounded-xl bg-brand-blue-600 px-4 py-2.5 text-sm font-800 text-white" style={{ fontWeight: 800 }}>
          Library: {library.length}
        </div>
      </section>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {categories.map(({ label, Icon }) => (
          <button
            key={label}
            onClick={() => setCategory(label)}
            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-700 transition ${category === label ? 'bg-brand-blue-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-blue-600/40'}`}
            style={{ fontWeight: 700 }}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((product) => {
          const owned = library.includes(product.id);

          return (
            <article key={product.id} className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:border-brand-blue-600/25 hover:shadow-md">
              <div className="relative h-40 overflow-hidden">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-300 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                {product.badge && <span className="absolute right-3 top-3 rounded-full bg-brand-green-500 px-2 py-1 text-[11px] font-700 text-white" style={{ fontWeight: 700 }}>{product.badge}</span>}
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <span className="rounded-full bg-white/90 px-2 py-1 text-[11px] font-700 text-gray-700" style={{ fontWeight: 700 }}>{product.type}</span>
                  <span className="rounded-full bg-white/90 px-2 py-1 text-[11px] font-700 text-gray-700" style={{ fontWeight: 700 }}>{product.meta}</span>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-sm font-800 text-gray-900" style={{ fontWeight: 800 }}>{product.name}</h2>
                <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                  <Star size={13} className="fill-yellow-400 text-yellow-400" />
                  <span>{product.rating}</span>
                  <span>({product.reviews})</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-900 text-brand-blue-600" style={{ fontWeight: 900 }}>${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => setLibrary((items) => owned ? items : [...items, product.id])}
                    className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-800 transition ${owned ? 'bg-brand-green-500 text-white' : 'bg-brand-blue-600 text-white hover:bg-brand-blue-700'}`}
                    style={{ fontWeight: 800 }}
                  >
                    {owned ? <BookOpen size={14} /> : <Download size={14} />}
                    {owned ? 'In library' : 'Buy'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
