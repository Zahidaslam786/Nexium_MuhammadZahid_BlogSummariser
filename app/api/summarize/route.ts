// import { NextResponse } from "next/server";
// import axios from "axios";
// import * as cheerio from "cheerio";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// // Enhanced Urdu translation dictionary and basic sentence structure
// const urduDict: { [key: string]: string } = {
//   summary: "خلاصہ",
//   blog: "بلاگ",
//   content: "مواد",
//   article: "مضمون",
//   information: "معلومات",
//   "is": "ہے",
//   "was": "تھا",
//   "and": "اور",
//   "the": "ال",
//   "of": "کا",
//   "to": "کو",
// };

// function translateToUrdu(text: string): string {
//   let urduText = text;
//   // Replace key words
//   for (const [en, ur] of Object.entries(urduDict)) {
//     urduText = urduText.replace(new RegExp(`\\b${en}\\b`, "gi"), ur);
//   }
//   // Basic Urdu sentence reordering (simplified)
//   const words = urduText.split(" ").filter(w => w);
//   return words.map((word, i) => (i > 0 && i % 5 === 0 ? word + "، " : word + " ")).join("").trim();
// }

// export async function POST(request: Request) {
//   try {
//     const { url } = await request.json();

//     // Scrape blog content
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);
//     const fullText = $("p").text().replace(/\s+/g, " ").trim();

//     // Static summary (first 100 words)
//     const words = fullText.split(" ").slice(0, 100).join(" ");
//     const summary = words + (words.length < fullText.length ? "..." : "");
//     const wordCount = words.split(" ").length;

//     // Translate to Urdu
//     const urduSummary = translateToUrdu(summary);

//     // Save to Supabase
//     await supabase.from("summaries").insert({ url, summary, urdu_summary: urduSummary, word_count: wordCount });
//     await supabase.from("blog_texts").insert({ url, full_text: fullText });

//     return NextResponse.json({ summary, urduSummary, wordCount });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to process request" },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import axios from "axios";
// import * as cheerio from "cheerio";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// // Enhanced Urdu translation dictionary
// const urduDict: { [key: string]: string } = {
//   summary: "خلاصہ",
//   blog: "بلاگ",
//   content: "مواد",
//   article: "مضمون",
//   information: "معلومات",
//   "is": "ہے",
//   "was": "تھا",
//   "and": "اور",
//   "the": "ال",
//   "of": "کا",
//   "to": "کو",
//   "in": "میں",
// };

// function translateToUrdu(text: string): string {
//   let urduText = text;
//   for (const [en, ur] of Object.entries(urduDict)) {
//     urduText = urduText.replace(new RegExp(`\\b${en}\\b`, "gi"), ur);
//   }
//   // Basic Urdu sentence flow (simplified)
//   const words = urduText.split(" ").filter(w => w);
//   return words.map((word, i) => (i > 0 && i % 6 === 0 ? word + "، " : word + " ")).join("").trim();
// }

// export async function POST(request: Request) {
//   try {
//     const { url } = await request.json();

//     // Scrape blog content
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);
//     const fullText = $("p, div.content").text().replace(/\s+/g, " ").trim();

//     // Summary (first 100 words with refinement)
//     const words = fullText.split(" ").slice(0, 100).join(" ");
//     const summary = words.length < fullText.length ? `${words}...` : words;
//     const wordCount = words.split(" ").length;

//     // Translate to Urdu
//     const urduSummary = translateToUrdu(summary);

//     // Save to Supabase with timestamp
//     const { error: summaryError } = await supabase.from("summaries").insert({
//       url,
//       summary,
//       urdu_summary: urduSummary,
//       word_count: wordCount,
//       saved_at: new Date().toISOString(),
//     });
//     const { error: textError } = await supabase.from("blog_texts").insert({
//       url,
//       full_text: fullText,
//       saved_at: new Date().toISOString(),
//     });

//     if (summaryError || textError) throw new Error("Database save failed");

//     return NextResponse.json({ summary, urduSummary, wordCount });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to process request. Check URL or try again." },
//       { status: 500 }
//     );
//   }
// }



//...........................................
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