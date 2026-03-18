"use client";

interface TrendIconProps {
  trend: "up" | "down" | "stable";
}

export default function TrendIcon({ trend }: TrendIconProps) {
  if (trend === "up") {
    return (
      <span className="inline-flex items-center gap-0.5 text-green-600 text-xs font-semibold">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        上昇中
      </span>
    );
  }
  if (trend === "down") {
    return (
      <span className="inline-flex items-center gap-0.5 text-red-500 text-xs font-semibold">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        下降中
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 text-gray-500 text-xs font-semibold">
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      </svg>
      安定
    </span>
  );
}
