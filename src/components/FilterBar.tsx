"use client";

import { SearchFilters } from "@/lib/types";
import { CATEGORIES, PLATFORMS } from "@/lib/mockData";

interface FilterBarProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  const update = (key: keyof SearchFilters, value: string | number) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 space-y-3">
      {/* Category */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => update("category", cat)}
            className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
              filters.category === cat
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filters Row */}
      <div className="flex gap-2">
        <select
          value={filters.sortBy}
          onChange={(e) => update("sortBy", e.target.value)}
          className="flex-1 text-xs border border-gray-300 rounded-lg px-2 py-2 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-400"
        >
          <option value="profit">利益額順</option>
          <option value="profitRate">利益率順</option>
          <option value="roi">ROI順</option>
          <option value="salesVolume">販売数順</option>
        </select>

        <select
          value={filters.buyPlatform}
          onChange={(e) => update("buyPlatform", e.target.value)}
          className="flex-1 text-xs border border-gray-300 rounded-lg px-2 py-2 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-400"
        >
          <option value="すべて">仕入れ: すべて</option>
          {PLATFORMS.slice(1).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select
          value={filters.sellPlatform}
          onChange={(e) => update("sellPlatform", e.target.value)}
          className="flex-1 text-xs border border-gray-300 rounded-lg px-2 py-2 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-400"
        >
          <option value="すべて">販売: すべて</option>
          {PLATFORMS.slice(1).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Min profit filter */}
      <div className="flex items-center gap-3">
        <label className="text-xs text-gray-500 flex-shrink-0 w-20">最低利益率</label>
        <input
          type="range"
          min={0}
          max={50}
          step={5}
          value={filters.minProfitRate}
          onChange={(e) => update("minProfitRate", Number(e.target.value))}
          className="flex-1 accent-indigo-600"
        />
        <span className="text-xs font-bold text-indigo-600 w-10 text-right">
          {filters.minProfitRate}%以上
        </span>
      </div>
    </div>
  );
}
