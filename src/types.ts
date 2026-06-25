export type Section =
  | 'home'
  | 'tolmarket'
  | 'toldigital'
  | 'tolfood'
  | 'toltrading'
  | 'crypto-tol'
  | 'tolsentinel'
  | 'toltoken'
  | 'favorites'
  | 'orders'
  | 'wallet'
  | 'settings'
  | 'support';

export interface NavItem {
  id: Section;
  labelAr: string;
  labelEn: string;
  subAr: string;
  icon: string;
}

export interface Product {
  id: number;
  nameAr: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  badge?: string;
}

export interface Order {
  id: string;
  productAr: string;
  price: number;
  status: 'delivered' | 'shipping' | 'completed' | 'cancelled';
  image: string;
}

export interface CryptoAsset {
  symbol: string;
  nameAr: string;
  price: number;
  change: number;
  volume: string;
  marketCap: string;
}
