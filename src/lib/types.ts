export type Platform = "Amazon" | "Rakuten" | "Yahoo" | "Mercari" | "PayPay";

export interface PlatformPrice {
  platform: Platform;
  price: number;
  url: string;
  condition: "新品" | "中古";
  feeRate: number; // 手数料率 (%)
  shippingCost: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  jan: string;
  buyPlatform: Platform;
  buyPrice: number;
  sellPlatform: Platform;
  sellPrice: number;
  fees: number;
  shippingCost: number;
  netProfit: number;
  profitRate: number; // %
  roi: number; // %
  trend: "up" | "down" | "stable";
  salesVolume: number; // 月間販売数
  rank: number; // カテゴリランキング
  lastUpdated: string;
  platformPrices: PlatformPrice[];
  tags: string[];
}

export interface SearchFilters {
  category: string;
  minProfit: number;
  minProfitRate: number;
  buyPlatform: string;
  sellPlatform: string;
  sortBy: "profit" | "profitRate" | "roi" | "salesVolume";
}

export interface DashboardStats {
  totalProducts: number;
  avgProfit: number;
  avgProfitRate: number;
  topCategory: string;
}
