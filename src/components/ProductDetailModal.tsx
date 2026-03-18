"use client";

import { Product } from "@/lib/types";
import TrendIcon from "./TrendIcon";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

const PLATFORM_COLORS: Record<string, string> = {
  Amazon: "bg-yellow-400 text-gray-900",
  Rakuten: "bg-red-500 text-white",
  Yahoo: "bg-red-600 text-white",
  Mercari: "bg-red-400 text-white",
  PayPay: "bg-red-500 text-white",
};

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Handle bar (mobile) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">商品詳細</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Product Info */}
          <div className="flex gap-3">
            <img src={product.imageUrl} alt={product.name} className="w-20 h-20 rounded-lg object-cover" />
            <div>
              <h3 className="text-sm font-bold text-gray-800 leading-snug">{product.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{product.category}</span>
                <TrendIcon trend={product.trend} />
              </div>
              <div className="text-xs text-gray-400 mt-1">JAN: {product.jan}</div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
              <div className="text-xs text-green-600 font-medium">純利益</div>
              <div className="text-lg font-bold text-green-700">¥{product.netProfit.toLocaleString()}</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
              <div className="text-xs text-blue-600 font-medium">利益率</div>
              <div className="text-lg font-bold text-blue-700">{product.profitRate.toFixed(1)}%</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
              <div className="text-xs text-purple-600 font-medium">月販売数</div>
              <div className="text-lg font-bold text-purple-700">{product.salesVolume}</div>
            </div>
          </div>

          {/* Profit Breakdown */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-bold text-gray-700 mb-3">利益計算内訳</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">販売価格</span>
                <span className="text-sm font-semibold text-gray-800">¥{product.sellPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">仕入れ値</span>
                <span className="text-sm font-semibold text-red-500">-¥{product.buyPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">販売手数料</span>
                <span className="text-sm font-semibold text-red-500">-¥{product.fees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">送料</span>
                <span className="text-sm font-semibold text-red-500">-¥{product.shippingCost.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-700">純利益</span>
                <span className="text-base font-bold text-green-600">+¥{product.netProfit.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Platform Price Comparison */}
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3">プラットフォーム別価格比較</h4>
            <div className="space-y-2">
              {product.platformPrices.map((p) => (
                <div
                  key={p.platform}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    p.platform === product.buyPlatform
                      ? "border-blue-300 bg-blue-50"
                      : p.platform === product.sellPlatform
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${PLATFORM_COLORS[p.platform]}`}>
                      {p.platform}
                    </span>
                    <span className="text-xs text-gray-500">{p.condition}</span>
                    {p.platform === product.buyPlatform && (
                      <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded font-medium">仕入</span>
                    )}
                    {p.platform === product.sellPlatform && (
                      <span className="text-xs bg-green-600 text-white px-1.5 py-0.5 rounded font-medium">販売</span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-800">¥{p.price.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">手数料{p.feeRate}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href="#"
              className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              仕入れる ({product.buyPlatform})
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-2 py-3 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              出品する ({product.sellPlatform})
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
