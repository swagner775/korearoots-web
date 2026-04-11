import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KoreaRoots — Invest in Rural Korea",
  description:
    "FDI advisory platform for Western investors buying abandoned rural Korean properties (빈집) and obtaining a D-8 business investment visa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy">
        <Navbar />
        {children}
        <footer className="border-t border-white/10 bg-navy mt-auto">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-white font-bold text-base">Korea<span className="text-teal">Roots</span></span>
                <span className="text-white/30 text-xs">Korea&apos;s first AI-powered FDI advisory and concierge platform</span>
                <span className="text-white/20 text-xs italic">Find it. Fix it. Own it. Live it.</span>
              </div>
              <div className="flex flex-col gap-1 text-xs text-white/30 sm:text-right">
                <a href="mailto:hello@korearoots.com" className="hover:text-teal transition-colors">hello@korearoots.com</a>
                <span>korearoots.com</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 border-t border-white/10 pt-6">
              <p className="text-white/25 text-xs leading-relaxed">KoreaRoots does not operate as a licensed real estate agent (공인중개사). KoreaRoots is an FDI advisory and concierge platform. All property transactions are facilitated through partner law firms and licensed Korean entities. D-8 visa filing is coordinated through partner immigration law firms — KoreaRoots does not practice law directly. STR income for clients flows through Wehome (government-certified) to remain legally compliant for foreign owners.</p>
              <p className="text-white/20 text-xs">© 2026 KoreaRoots. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
