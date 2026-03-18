"use client";

import { useState, useMemo } from "react";
import { Product, SearchFilters } from "@/lib/types";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import FilterBar from "@/components/FilterBar";
import StatsBar from "@/components/StatsBar";
import AlertBanner from "@/components/AlertBanner";
import ProfitCalculator from "@/components/ProfitCalculator";

type Tab = "deals" | "calculator";

export default function Home() {
  const [tab, setTab] = useState<Tab>("deals");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    category: "すべて",
    minProfit: 0,
    minProfitRate: 0,
    buyPlatform: "すべて",
    sellPlatform: "すべて",
    sortBy: "profitRate",
  });

  const filteredProducts = useMemo(() => {
    let products = MOCK_PRODUCTS.filter((p) => {
      if (filters.category !== "すべて" && p.category !== filters.category) return false;
      if (p.profitRate < filters.minProfitRate) return false;
      if (filters.buyPlatform !== "すべて" && p.buyPlatform !== filters.buyPlatform) return false;
      if (filters.sellPlatform !== "すべて" && p.sellPlatform !== filters.sellPlatform) return false;
      return true;
    });

    products = [...products].sort((a, b) => {
      switch (filters.sortBy) {
        case "profit": return b.netProfit - a.netProfit;
        case "profitRate": return b.profitRate - a.profitRate;
        case "roi": return b.roi - a.roi;
        case "salesVolume": return b.salesVolume - a.salesVolume;
        default: return 0;
      }
    });

    return products;
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* App Header */}
      <header className="bg-indigo-700 text-white px-4 pt-12 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            せどり案件ツール
          </h1>
          <p className="text-indigo-200 text-xs mt-0.5">お得な仕入れ案件を自動で提案</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-indigo-200">最終更新</div>
          <div className="text-xs font-semibold">
            {new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </header>

      {/* Alert Banner */}
      <AlertBanner />

      {/* Tab Navigation */}
      <div className="flex bg-white border-b border-gray-200">
        <button
          onClick={() => setTab("deals")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
            tab === "deals"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          お得案件一覧
        </button>
        <button
          onClick={() => setTab("calculator")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
            tab === "calculator"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          利益計算
        </button>
      </div>

      {tab === "deals" && (
        <>
          {/* Stats */}
          <StatsBar products={filteredProducts} />

          {/* Filters */}
          <FilterBar filters={filters} onChange={setFilters} />

          {/* Product List */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 pb-8">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <svg className="w-12 h-12 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium">条件に合う案件が見つかりません</p>
                <p className="text-xs mt-1">フィルターを変更してお試しください</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onClick={setSelectedProduct} />
              ))
            )}
          </div>
        </>
      )}

      {tab === "calculator" && (
        <div className="flex-1 px-4 py-4 pb-8">
          <ProfitCalculator />

          {/* Quick tip */}
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-amber-700 flex items-center gap-1.5 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              利益率の目安
            </h3>
            <div className="space-y-1.5 text-xs text-amber-700">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0 inline-block" />
                <span><strong>20%以上</strong> → 優良案件（積極的に仕入れOK）</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-yellow-500 flex-shrink-0 inline-block" />
                <span><strong>10〜20%</strong> → 良案件（在庫リスクに注意）</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-gray-400 flex-shrink-0 inline-block" />
                <span><strong>10%未満</strong> → 微益（リスクあり、慎重に）</span>
              </div>
            </div>
          </div>

          {/* Platform fee table */}
          <div className="mt-4 bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-700">各プラットフォーム手数料一覧</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { name: "Amazon", fee: "10%", note: "FBA利用時は別途" },
                { name: "Rakuten", fee: "3.5%〜", note: "ポイント等別途" },
                { name: "Yahoo", fee: "8.8%", note: "PayPayあり" },
                { name: "Mercari", fee: "10%", note: "固定" },
                { name: "PayPay", fee: "5%", note: "販売手数料" },
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-sm font-semibold text-gray-700">{p.name}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-red-500">{p.fee}</span>
                    <span className="text-xs text-gray-400 ml-2">{p.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
