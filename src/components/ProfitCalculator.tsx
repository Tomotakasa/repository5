"use client";

import { useState } from "react";

const FEE_RATES: Record<string, number> = {
  Amazon: 10,
  Rakuten: 3.5,
  Yahoo: 8.8,
  Mercari: 10,
  PayPay: 5,
};

export default function ProfitCalculator() {
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [sellPlatform, setSellPlatform] = useState("Amazon");
  const [shipping, setShipping] = useState("600");

  const buy = Number(buyPrice) || 0;
  const sell = Number(sellPrice) || 0;
  const ship = Number(shipping) || 0;
  const feeRate = FEE_RATES[sellPlatform] || 10;
  const fees = Math.round(sell * (feeRate / 100));
  const profit = sell - buy - fees - ship;
  const profitRate = sell > 0 ? ((profit / sell) * 100).toFixed(1) : "0";
  const roi = buy > 0 ? ((profit / buy) * 100).toFixed(1) : "0";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3">
        <h2 className="text-white font-bold text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          利益計算ツール
        </h2>
      </div>

      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">仕入れ値 (円)</label>
            <input
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              placeholder="例: 5000"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">販売価格 (円)</label>
            <input
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              placeholder="例: 8000"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">販売先</label>
            <select
              value={sellPlatform}
              onChange={(e) => setSellPlatform(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {Object.keys(FEE_RATES).map((p) => (
                <option key={p} value={p}>{p} ({FEE_RATES[p]}%)</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">送料 (円)</label>
            <input
              type="number"
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        {/* Result */}
        <div className={`rounded-xl p-4 ${profit > 0 ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-xs text-gray-500">純利益</div>
              <div className={`text-lg font-bold ${profit > 0 ? "text-green-600" : "text-red-500"}`}>
                {profit > 0 ? "+" : ""}¥{profit.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">利益率</div>
              <div className={`text-lg font-bold ${profit > 0 ? "text-green-600" : "text-red-500"}`}>
                {profitRate}%
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">ROI</div>
              <div className={`text-lg font-bold ${profit > 0 ? "text-green-600" : "text-red-500"}`}>
                {roi}%
              </div>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">
            手数料: ¥{fees.toLocaleString()} | 送料: ¥{ship.toLocaleString()}
          </div>
          {profit > 0 && (
            <div className="mt-2 text-center">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                Number(profitRate) >= 20 ? "bg-green-600 text-white" :
                Number(profitRate) >= 10 ? "bg-yellow-500 text-white" :
                "bg-gray-400 text-white"
              }`}>
                {Number(profitRate) >= 20 ? "◎ 優良案件！" : Number(profitRate) >= 10 ? "○ 良案件" : "△ 微益"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
