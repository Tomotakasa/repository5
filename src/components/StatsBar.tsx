"use client";

import { Product } from "@/lib/types";

interface StatsBarProps {
  products: Product[];
}

export default function StatsBar({ products }: StatsBarProps) {
  const avgProfit = products.length
    ? Math.round(products.reduce((s, p) => s + p.netProfit, 0) / products.length)
    : 0;
  const avgRate = products.length
    ? (products.reduce((s, p) => s + p.profitRate, 0) / products.length).toFixed(1)
    : "0";
  const hotCount = products.filter((p) => p.trend === "up").length;

  return (
    <div className="grid grid-cols-3 gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="text-center">
        <div className="text-white/70 text-xs">案件数</div>
        <div className="text-white text-xl font-bold">{products.length}</div>
      </div>
      <div className="text-center border-x border-white/20">
        <div className="text-white/70 text-xs">平均利益</div>
        <div className="text-white text-xl font-bold">¥{avgProfit.toLocaleString()}</div>
      </div>
      <div className="text-center">
        <div className="text-white/70 text-xs">上昇中</div>
        <div className="text-white text-xl font-bold">{hotCount}件</div>
      </div>
    </div>
  );
}
