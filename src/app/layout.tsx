import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "せどり案件ツール",
  description: "お得な仕入れ案件を自動で提案するせどりツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
