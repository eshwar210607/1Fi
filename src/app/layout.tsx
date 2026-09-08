import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "1Fi - Shop today, Pay later using Mutual Funds",
  description:
    "1Fi Marketplace: Shop smartphones, laptops and electronics on no-cost EMIs backed by your mutual funds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen bg-[#F0F2F5] selection:bg-purple-100 selection:text-purple-900">
        {children}
      </body>
    </html>
  );
}
