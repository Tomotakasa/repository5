"use client";

interface ProfitBadgeProps {
  profit: number;
  profitRate: number;
}

export default function ProfitBadge({ profit, profitRate }: ProfitBadgeProps) {
  const color =
    profitRate >= 30
      ? "bg-red-100 text-red-700 border-red-200"
      : profitRate >= 15
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-yellow-100 text-yellow-700 border-yellow-200";

  return (
    <div className={`inline-flex flex-col items-center px-3 py-1.5 rounded-lg border text-xs font-bold ${color}`}>
      <span>¥{profit.toLocaleString()}</span>
      <span>{profitRate.toFixed(1)}% 利益</span>
    </div>
  );
}
