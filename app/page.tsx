"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Copy, Download } from "lucide-react";
import axios from "axios";

export default function Home() 
{
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
    } catch (err) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <header className="bg-indigo-800 text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Blog Summariser Pro</h1>
        <p className="text-center text-indigo-200 mt-1">Advanced summarization in English and Urdu</p>
      </header>

      <main className="container mx-auto p-6 max-w-4xl">
        <Card className="bg-white shadow-xl rounded-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-extrabold text-indigo-900">Summarize Your Blog</CardTitle>
            <CardDescription className="text-gray-600 mt-2">Enter a URL to get a detailed summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="url"
                placeholder="Enter blog URL (e.g., https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full border-indigo-300 focus:border-indigo-600 focus:ring-indigo-600 placeholder-gray-400 p-3 rounded-lg"
                required
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition duration-300 transform hover:scale-105 rounded-lg py-3"
              >
                {loading ? "Summarizing..." : "Summarize Now"}
              </Button>
            </form>
            {error && <p className="text-red-500 text-center font-medium mt-4">{error}</p>}
            {summary && (
              <div className="space-y-6">
                <Card className="bg-gray-50 hover:bg-gray-100 transition-shadow shadow-md rounded-lg hover:shadow-lg">
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-xl font-semibold text-indigo-800">English Summary</CardTitle>
                    <div className="space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(summary)}
                        className="hover:bg-indigo-100 transition-colors"
                      >
                        <Copy className="h-5 w-5 text-indigo-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadText(summary, "english_summary")}
                        className="hover:bg-indigo-100 transition-colors"
                      >
                        <Download className="h-5 w-5 text-indigo-600" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{summary}</p>
                    <p className="text-sm text-gray-500 mt-2">Word Count: {wordCount}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50 hover:bg-gray-100 transition-shadow shadow-md rounded-lg hover:shadow-lg" dir="rtl">
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-xl font-semibold text-indigo-800">اردو خلاصہ</CardTitle>
                    <div className="space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(urduSummary)}
                        className="hover:bg-indigo-100 transition-colors"
                      >
                        <Copy className="h-5 w-5 text-indigo-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadText(urduSummary, "urdu_summary")}
                        className="hover:bg-indigo-100 transition-colors"
                      >
                        <Download className="h-5 w-5 text-indigo-600" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{urduSummary}</p>
                  </CardContent>
                </Card>
                {saved && (
                  <p className="text-green-600 text-center font-medium">Summary saved to Supabase!</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="bg-indigo-800 text-white p-4 mt-6 text-center">
        <p>© 2025 Zahidaslam786's Blog Summariser. All rights reserved.</p>
        <p className="text-indigo-200 mt-1">Powered by Next.js, Supabase, and ShadCN</p>
      </footer>
    </div>
  );
};
