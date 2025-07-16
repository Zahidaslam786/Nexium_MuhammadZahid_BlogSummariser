"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} animate-fade-in-slow`}>
      <body suppressHydrationWarning className="bg-purple-50 text-purple-900 antialiased">
        {children}
        <div className="container mx-auto p-6 py-12">
          <Card className="bg-white/90 backdrop-blur-md border-teal-200 shadow-lg rounded-3xl overflow-hidden transform hover:scale-102 transition-all duration-500">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-purple-500 text-white p-6">
              <CardTitle className="text-2xl font-bold text-center">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-purple-700 space-y-4">
              <p><strong>Step 1:</strong> Enter a blog URL in the input field.</p>
              <p><strong>Step 2:</strong> Click "Summarize Now" to process the content.</p>
              <p><strong>Step 3:</strong> View and download your summary in English or Urdu.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-teal-200 text-teal-800 text-sm font-medium px-3 py-1.5 rounded-full animate-bounce">Easy</span>
                <span className="bg-purple-200 text-purple-800 text-sm font-medium px-3 py-1.5 rounded-full animate-bounce">Step-by-Step</span>
                <span className="bg-teal-200 text-teal-800 text-sm font-medium px-3 py-1.5 rounded-full animate-bounce">User-Friendly</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  );
}
