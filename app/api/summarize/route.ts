import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const urduDict: { [key: string]: string } = {
  summary: "خلاصہ",
  blog: "بلاگ",
  content: "مواد",
  article: "مضمون",
  information: "معلومات",
  "is": "ہے",
  "was": "تھا",
  "and": "اور",
  "the": "ال",
  "of": "کا",
  "to": "کو",
  "in": "میں",
};

function translateToUrdu(text: string): string {
  let urduText = text;
  for (const [en, ur] of Object.entries(urduDict)) {
    urduText = urduText.replace(new RegExp(`\\b${en}\\b`, "gi"), ur);
  }
  const words = urduText.split(" ").filter(w => w);
  return words.map((word, i) => (i > 0 && i % 6 === 0 ? word + "، " : word + " ")).join("").trim();
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const fullText = $("p, div.content").text().replace(/\s+/g, " ").trim();
    const words = fullText.split(" ").slice(0, 100).join(" ");
    const summary = words.length < fullText.length ? `${words}...` : words;
    const wordCount = words.split(" ").length;
    const urduSummary = translateToUrdu(summary);

    await supabase.from("summaries").insert({
      url, summary, urdu_summary: urduSummary, word_count: wordCount, saved_at: new Date().toISOString(),
    });
    await supabase.from("blog_texts").insert({ url, full_text: fullText, saved_at: new Date().toISOString() });

    return NextResponse.json({ summary, urduSummary, wordCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process request. Check URL or try again." }, { status: 500 });
  }
}
