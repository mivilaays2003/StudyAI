import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudyAI — Turn papers into slides, quizzes & notes",
  description: "Upload any academic paper and instantly get AI-generated presentation slides, quiz questions, and personalized study notes.",
  openGraph: {
    title: "StudyAI",
    description: "Turn any paper into slides, quizzes & notes with AI",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F0F1A" />
      </head>
      <body>{children}</body>
    </html>
  );
}
