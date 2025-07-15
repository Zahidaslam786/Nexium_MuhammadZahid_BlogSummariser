
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Abdulwahab's Blog Master",
  description: "A Next.js app to summarize blogs in English and Urdu with a modern twist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body suppressHydrationWarning className="bg-teal-50 text-teal-900 antialiased">
        {children}
      </body>
    </html>
  );
}
