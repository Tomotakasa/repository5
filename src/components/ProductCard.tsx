"use client";

import { Product } from "@/lib/types";
import ProfitBadge from "./ProfitBadge";
import TrendIcon from "./TrendIcon";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const PLATFORM_COLORS: Record<string, string> = {
  Amazon: "bg-yellow-400 text-gray-900",
  Rakuten: "bg-red-500 text-white",
  Yahoo: "bg-red-600 text-white",
  Mercari: "bg-red-400 text-white",
  PayPay: "bg-red-500 text-white",
};

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const profitColor =
    product.profitRate >= 30
      ? "border-l-red-500"
      : product.profitRate >= 15
      ? "border-l-green-500"
      : "border-l-yellow-400";

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 border-l-4 ${profitColor} hover:shadow-md transition-shadow cursor-pointer`}
      onClick={() => onClick(product)}
    >
      <div className="p-3">
        {/* Header */}
        <div className="flex gap-3">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-16 h-16 rounded-md object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
                {product.name}
              </h3>
              <ProfitBadge profit={product.netProfit} profitRate={product.profitRate} />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">{product.category}</span>
              <TrendIcon trend={product.trend} />
              <span className="text-xs text-gray-400">月{product.salesVolume}件</span>
            </div>
          </div>
        </div>

        {/* Price Flow */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 bg-blue-50 rounded-md p-2 text-center">
            <div className="text-xs text-gray-500 mb-0.5">仕入れ</div>
            <span className={`text-xs font-bold text-white px-2 py-0.5 rounded ${PLATFORM_COLORS[product.buyPlatform]}`}>
              {product.buyPlatform}
            </span>
            <div className="text-sm font-bold text-gray-800 mt-1">
              ¥{product.buyPrice.toLocaleString()}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <div className="flex-1 bg-green-50 rounded-md p-2 text-center">
            <div className="text-xs text-gray-500 mb-0.5">販売</div>
            <span className={`text-xs font-bold text-white px-2 py-0.5 rounded ${PLATFORM_COLORS[product.sellPlatform]}`}>
              {product.sellPlatform}
            </span>
            <div className="text-sm font-bold text-gray-800 mt-1">
              ¥{product.sellPrice.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Profit Details */}
        <div className="mt-2 grid grid-cols-3 gap-1 text-center bg-gray-50 rounded-md p-2">
          <div>
            <div className="text-xs text-gray-500">手数料</div>
            <div className="text-xs font-semibold text-red-500">-¥{product.fees.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">送料</div>
            <div className="text-xs font-semibold text-red-500">-¥{product.shippingCost.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">純利益</div>
            <div className="text-xs font-bold text-green-600">+¥{product.netProfit.toLocaleString()}</div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-2 flex flex-wrap gap-1">
          {product.tags.map((tag) => (
            <span key={tag} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
