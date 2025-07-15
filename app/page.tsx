<<<<<<< HEAD
=======
{/* eslint-disable-next-line react/no-unescaped-entities */}
>>>>>>> 00ceac7c6cb649bc6275720b0b74463a83be9dff

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download, Tag, Share2 } from "lucide-react";
=======
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Removed CardFooter
import { Copy, Download } from "lucide-react";
>>>>>>> 00ceac7c6cb649bc6275720b0b74463a83be9dff
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [urduSummary, setUrduSummary] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSummary("");
    setUrduSummary("");
    setWordCount(0);
    setSaved(false);

    try {
      const response = await axios.post("/api/summarize", { url });
      setSummary(response.data.summary);
      setUrduSummary(response.data.urduSummary);
      setWordCount(response.data.wordCount || 0);
      setSaved(true);
    } catch {
<<<<<<< HEAD
      setError("Failed to summarize. Please check the URL.");
=======
      setError("Failed to summarize. Please check the URL."); // No unescaped quotes
>>>>>>> 00ceac7c6cb649bc6275720b0b74463a83be9dff
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
  };

  const downloadText = (text: string, filename: string) => {
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${filename}.txt`;
    a.click();
  };

  const shareSummary = () => {
    if (navigator.share) {
      navigator.share({
        title: "Blog Summary",
        text: summary || urduSummary,
        url: window.location.href,
      }).catch(() => alert("Sharing not supported on this device."));
    } else {
      alert("Sharing not available.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-orange-100 animate-gradient">
      <header className="bg-teal-700 text-white p-6 shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-wide">Abdulwahab's Blog Master</h1>
          <p className="text-orange-200 mt-2">Summarize blogs in English and Urdu with style!</p>
        </div>
      </header>

      <main className="container mx-auto p-6 py-10 max-w-5xl">
        <Card className="bg-white/90 backdrop-blur-sm border-teal-200 shadow-xl rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
          <CardHeader className="bg-gradient-to-r from-teal-500 to-orange-500 text-white p-6">
            <CardTitle className="text-3xl font-bold text-center">Summarize Your Content</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="url"
                  placeholder="Enter blog URL (e.g., https://example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full border-2 border-teal-300 focus:border-orange-500 focus:ring-orange-500 placeholder-teal-400 p-4 rounded-xl transition-all duration-300"
                  required
                />
                <Tag className="absolute right-3 top-3 text-teal-500" />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                {loading ? "Processing..." : "Summarize Now"}
              </Button>
            </form>
            {error && <p className="text-red-500 text-center font-medium mt-4 animate-pulse">{error}</p>}
            {summary && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-teal-50 border-teal-200 shadow-md rounded-xl hover:bg-teal-100 hover:shadow-xl transition-all duration-300">
                  <CardHeader className="flex justify-between items-center p-4 bg-teal-200">
                    <CardTitle className="text-xl font-semibold text-teal-800">English Summary</CardTitle>
                    <div className="space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(summary)}
                        className="hover:bg-teal-300 text-teal-600 hover:text-white transition-colors"
                      >
                        <Copy className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadText(summary, "english_summary")}
                        className="hover:bg-teal-300 text-teal-600 hover:text-white transition-colors"
                      >
                        <Download className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={shareSummary}
                        className="hover:bg-teal-300 text-teal-600 hover:text-white transition-colors"
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-teal-700 break-words">{summary}</p>
                    <p className="text-sm text-teal-500 mt-2">Word Count: {wordCount}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-teal-200 text-teal-800 text-xs font-medium px-2 py-1 rounded-full">Tech</span>
                      <span className="bg-teal-200 text-teal-800 text-xs font-medium px-2 py-1 rounded-full">Summary</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 border-orange-200 shadow-md rounded-xl hover:bg-orange-100 hover:shadow-xl transition-all duration-300" dir="rtl">
                  <CardHeader className="flex justify-between items-center p-4 bg-orange-200">
                    <CardTitle className="text-xl font-semibold text-orange-800">اردو خلاصہ</CardTitle>
                    <div className="space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(urduSummary)}
                        className="hover:bg-orange-300 text-orange-600 hover:text-white transition-colors"
                      >
                        <Copy className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadText(urduSummary, "urdu_summary")}
                        className="hover:bg-orange-300 text-orange-600 hover:text-white transition-colors"
                      >
                        <Download className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={shareSummary}
                        className="hover:bg-orange-300 text-orange-600 hover:text-white transition-colors"
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-orange-700 break-words">{urduSummary}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-orange-200 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">اردو</span>
                      <span className="bg-orange-200 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">خلاصہ</span>
                    </div>
                  </CardContent>
                </Card>
                {saved && (
                  <p className="text-green-600 text-center font-medium col-span-full animate-bounce">Summary saved to Supabase!</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="bg-teal-800 text-white p-6 mt-10">
        <div className="container mx-auto text-center">
          <p>© 2025 Abdulwahab's Blog Master. All rights reserved.</p>
          <p className="text-orange-200 mt-2">Powered by Next.js, Supabase, and Creative Design</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="https://facebook.com" className="text-orange-300 hover:text-white transition-colors">Facebook</a>
            <a href="https://twitter.com" className="text-orange-300 hover:text-white transition-colors">Twitter</a>
            <a href="https://linkedin.com" className="text-orange-300 hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 00ceac7c6cb649bc6275720b0b74463a83be9dff
