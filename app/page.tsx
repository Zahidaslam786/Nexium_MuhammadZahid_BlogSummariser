"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download, Tag, Share2 } from "lucide-react";
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
      setError("Failed to summarize. Please check the URL.");
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
        title: "Blog Summary by Zahidaslam",
        text: summary || urduSummary,
        url: window.location.href,
      }).catch(() => alert("Sharing not supported on this device."));
    } else {
      alert("Sharing not available.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-teal-100 animate-gradient-x">
      <header className="bg-purple-700 text-white p-6 shadow-2xl">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-wide animate-fade-in">Zahidaslam's Blog Genius</h1>
          <p className="text-teal-200 mt-2">Masterful summarization in English and Urdu!</p>
        </div>
      </header>

      <main className="container mx-auto p-6 py-12 max-w-6xl">
        <Card className="bg-white/90 backdrop-blur-md border-teal-200 shadow-lg rounded-3xl overflow-hidden transform hover:scale-103 transition-all duration-700 ease-out">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-teal-500 text-white p-8">
            <CardTitle className="text-3xl font-bold text-center">Summarize Your Insights</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <Input
                  type="url"
                  placeholder="Enter blog URL (e.g., https://example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full border-2 border-purple-300 focus:border-teal-500 focus:ring-teal-500 placeholder-purple-400 p-5 rounded-2xl transition-all duration-400 group-hover:border-teal-600"
                  required
                />
                <Tag className="absolute right-4 top-4 text-purple-500 group-hover:text-teal-500 transition-colors duration-300" />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500"
              >
                {loading ? "Generating..." : "Summarize Now"}
              </Button>
            </form>
            {error && <p className="text-red-500 text-center font-medium mt-6 animate-pulse">{error}</p>}
            {summary && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-purple-50 border-purple-200 shadow-md rounded-2xl hover:bg-purple-100 hover:shadow-2xl transition-all duration-500">
                  <CardHeader className="flex justify-between items-center p-6 bg-purple-200">
                    <CardTitle className="text-xl font-semibold text-purple-800">English Summary</CardTitle>
                    <div className="space-x-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(summary)}
                        className="hover:bg-purple-300 text-purple-600 hover:text-white transition-colors duration-300"
                      >
                        <Copy className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadText(summary, "english_summary")}
                        className="hover:bg-purple-300 text-purple-600 hover:text-white transition-colors duration-300"
                      >
                        <Download className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={shareSummary}
                        className="hover:bg-purple-300 text-purple-600 hover:text-white transition-colors duration-300"
                      >
                        <Share2 className="h-6 w-6" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-purple-700 break-words">{summary}</p>
                    <p className="text-sm text-purple-500 mt-3">Word Count: {wordCount}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="bg-purple-200 text-purple-800 text-sm font-medium px-3 py-1.5 rounded-full">Tech</span>
                      <span className="bg-purple-200 text-purple-800 text-sm font-medium px-3 py-1.5 rounded-full">Insight</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-teal-50 border-teal-200 shadow-md rounded-2xl hover:bg-teal-100 hover:shadow-2xl transition-all duration-500" dir="rtl">
                  <CardHeader className="flex justify-between items-center p-6 bg-teal-200">
                    <CardTitle className="text-xl font-semibold text-teal-800">اردو خلاصہ</CardTitle>
                    <div className="space-x-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(urduSummary)}
                        className="hover:bg-teal-300 text-teal-600 hover:text-white transition-colors duration-300"
                      >
                        <Copy className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadText(urduSummary, "urdu_summary")}
                        className="hover:bg-teal-300 text-teal-600 hover:text-white transition-colors duration-300"
                      >
                        <Download className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={shareSummary}
                        className="hover:bg-teal-300 text-teal-600 hover:text-white transition-colors duration-300"
                      >
                        <Share2 className="h-6 w-6" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-teal-700 break-words">{urduSummary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="bg-teal-200 text-teal-800 text-sm font-medium px-3 py-1.5 rounded-full">اردو</span>
                      <span className="bg-teal-200 text-teal-800 text-sm font-medium px-3 py-1.5 rounded-full">مضمون</span>
                    </div>
                  </CardContent>
                </Card>
                {saved && (
                  <p className="text-green-600 text-center font-medium col-span-full animate-bounce">Summary saved to Supabase!</p>
                )}
                <Card className="bg-gradient-to-br from-teal-100 to-purple-100 border-teal-300 shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 col-span-full">
                  <CardHeader className="p-6 bg-teal-200">
                    <CardTitle className="text-xl font-bold text-teal-800">Key Features</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 text-purple-700 space-y-4">
                    <p>Lightning-fast summarization for any blog.</p>
                    <p>Accurate and concise content extraction.</p>
                    <p>Multilingual support (English & Urdu).</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="bg-teal-200 text-teal-800 text-sm font-medium px-3 py-1.5 rounded-full animate-pulse">Fast</span>
                      <span className="bg-purple-200 text-purple-800 text-sm font-medium px-3 py-1.5 rounded-full animate-pulse">Accurate</span>
                      <span className="bg-teal-200 text-teal-800 text-sm font-medium px-3 py-1.5 rounded-full animate-pulse">Multilingual</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="bg-purple-800 text-white p-6 mt-12">
        <div className="container mx-auto text-center">
          <p>© 2025 Zahidaslam's Blog Genius. All rights reserved.</p>
          <p className="text-teal-200 mt-2">Powered by Next.js, Supabase, and Creative Flair</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="https://facebook.com" className="text-teal-300 hover:text-white transition-colors duration-300">Facebook</a>
            <a href="https://twitter.com" className="text-teal-300 hover:text-white transition-colors duration-300">Twitter</a>
            <a href="https://linkedin.com" className="text-teal-300 hover:text-white transition-colors duration-300">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
