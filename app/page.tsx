"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#0F0F1A", color: "#E8E8F0", fontFamily: "Inter, sans-serif" }}>
      {/* Nav */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", borderBottom: "1px solid #ffffff10" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, background: "linear-gradient(135deg,#6C63FF,#FF6584)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>📚</div>
          <span style={{ fontWeight: 800, fontSize: 20, background: "linear-gradient(90deg,#6C63FF,#FF6584)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>StudyAI</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/pricing" style={{ color: "#8888AA", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Pricing</Link>
          <Link href="/login" style={{ color: "#8888AA", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Log in</Link>
          <Link href="/dashboard" style={{ background: "linear-gradient(135deg,#6C63FF,#9C63FF)", color: "#fff", padding: "9px 20px", borderRadius: 9, textDecoration: "none", fontSize: 14, fontWeight: 700 }}>
            Try free →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "100px 24px 80px", maxWidth: 780, margin: "0 auto" }}>
        <div style={{ display: "inline-block", background: "#6C63FF20", border: "1px solid #6C63FF40", borderRadius: 100, padding: "6px 16px", fontSize: 13, color: "#6C63FF", fontWeight: 600, marginBottom: 28 }}>
          🎓 Built for students, by students
        </div>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", marginBottom: 22 }}>
          Turn any paper into<br />
          <span style={{ background: "linear-gradient(90deg,#6C63FF,#FF6584)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>slides, quizzes & notes</span>
        </h1>
        <p style={{ fontSize: 18, color: "#8888AA", lineHeight: 1.7, marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>
          Upload a research paper or lecture notes. Get AI-generated presentation slides, quiz questions, and personalized study notes — in seconds.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/dashboard" style={{ background: "linear-gradient(135deg,#6C63FF,#9C63FF)", color: "#fff", padding: "14px 32px", borderRadius: 12, textDecoration: "none", fontSize: 16, fontWeight: 700, display: "inline-block" }}>
            Start for free →
          </Link>
          <Link href="/pricing" style={{ background: "#1A1A2E", border: "1px solid #ffffff20", color: "#E8E8F0", padding: "14px 32px", borderRadius: 12, textDecoration: "none", fontSize: 16, fontWeight: 600, display: "inline-block" }}>
            View pricing
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {[
            { icon: "🖥️", title: "Presentation Slides", desc: "Structured 6–8 slide decks pulled directly from your document's key points and structure." },
            { icon: "🧠", title: "Smart Quiz", desc: "Multiple choice questions with instant feedback. Study actively, not passively." },
            { icon: "📝", title: "Personalised Notes", desc: "Concise, sectioned study notes that highlight what actually matters in the paper." },
          ].map((f) => (
            <div key={f.title} style={{ background: "#1A1A2E", borderRadius: 16, padding: "28px 24px", border: "1px solid #ffffff10" }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{f.title}</div>
              <div style={{ color: "#8888AA", fontSize: 14, lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: "center", padding: "60px 24px 100px" }}>
        <div style={{ background: "linear-gradient(135deg, #6C63FF15, #FF658415)", border: "1px solid #6C63FF30", borderRadius: 24, padding: "60px 40px", maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Ready to study smarter?</h2>
          <p style={{ color: "#8888AA", marginBottom: 28 }}>Free to start. No credit card needed.</p>
          <Link href="/dashboard" style={{ background: "linear-gradient(135deg,#6C63FF,#9C63FF)", color: "#fff", padding: "14px 36px", borderRadius: 12, textDecoration: "none", fontSize: 16, fontWeight: 700 }}>
            Get started free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "24px", color: "#8888AA", fontSize: 13, borderTop: "1px solid #ffffff10" }}>
        © 2025 StudyAI · Built with Next.js + Claude API
      </footer>
    </div>
  );
}
