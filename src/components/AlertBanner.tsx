"use client";

import { useState, useEffect } from "react";

const ALERTS = [
  { id: 1, message: "🔥 ポケモンカード 151 BOX が大幅値上がり中！今すぐ確認", type: "hot" },
  { id: 2, message: "⚡ Anker製品がAmazonセール中！仕入れチャンス", type: "sale" },
  { id: 3, message: "📈 遊戯王レアコレクション 利益率70%超えを記録", type: "profit" },
];

export default function AlertBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % ALERTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  const alert = ALERTS[currentIndex];

  return (
    <div className={`relative flex items-center gap-2 px-4 py-2.5 text-xs font-semibold ${
      alert.type === "hot" ? "bg-red-500 text-white" :
      alert.type === "sale" ? "bg-orange-500 text-white" :
      "bg-emerald-600 text-white"
    }`}>
      <span className="flex-1 text-center">{alert.message}</span>
      <button onClick={() => setVisible(false)} className="absolute right-3 opacity-70 hover:opacity-100">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
