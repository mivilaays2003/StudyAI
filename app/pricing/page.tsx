"use client";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["5 documents/month", "Slides + Notes", "Basic quiz (5 questions)", "TXT & MD files"],
    cta: "Get started",
    href: "/dashboard",
    highlight: false,
  },
  {
    name: "Student Pro",
    price: "$8",
    period: "per month",
    features: ["Unlimited documents", "Slides + Quiz + Notes", "PDF & DOCX support", "Export to PowerPoint", "Save & history", "Priority AI speed"],
    cta: "Start free trial",
    href: "/dashboard",
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <div style={{ minHeight: "100vh", background: "#0F0F1A", color: "#E8E8F0", fontFamily: "Inter, sans-serif" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", borderBottom: "1px solid #ffffff10" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, background: "linear-gradient(135deg,#6C63FF,#FF6584)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>📚</div>
          <span style={{ fontWeight: 800, fontSize: 20, background: "linear-gradient(90deg,#6C63FF,#FF6584)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>StudyAI</span>
        </Link>
        <Link href="/dashboard" style={{ background: "linear-gradient(135deg,#6C63FF,#9C63FF)", color: "#fff", padding: "9px 20px", borderRadius: 9, textDecoration: "none", fontSize: 14, fontWeight: 700 }}>Try free →</Link>
      </nav>

      <section style={{ textAlign: "center", padding: "80px 24px 60px" }}>
        <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 12 }}>Simple pricing</h1>
        <p style={{ color: "#8888AA", fontSize: 17 }}>Start free. Upgrade when you need more.</p>
      </section>

      <section style={{ display: "flex", justifyContent: "center", gap: 20, padding: "0 24px 100px", flexWrap: "wrap" }}>
        {plans.map((p) => (
          <div key={p.name} style={{
            background: p.highlight ? "linear-gradient(135deg, #6C63FF15, #9C63FF15)" : "#1A1A2E",
            border: p.highlight ? "2px solid #6C63FF" : "1px solid #ffffff15",
            borderRadius: 20,
            padding: "36px 32px",
            width: 300,
          }}>
            {p.highlight && (
              <div style={{ background: "#6C63FF", color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 100, display: "inline-block", marginBottom: 20, letterSpacing: "0.5px" }}>MOST POPULAR</div>
            )}
            <div style={{ fontSize: 15, fontWeight: 700, color: "#8888AA", marginBottom: 8 }}>{p.name}</div>
            <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-2px", marginBottom: 4 }}>{p.price}</div>
            <div style={{ color: "#8888AA", fontSize: 14, marginBottom: 28 }}>{p.period}</div>
            <ul style={{ listStyle: "none", marginBottom: 32 }}>
              {p.features.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "#E8E8F0" }}>
                  <span style={{ color: "#6C63FF", fontWeight: 700 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href={p.href} style={{
              display: "block",
              textAlign: "center",
              background: p.highlight ? "linear-gradient(135deg,#6C63FF,#9C63FF)" : "#ffffff10",
              color: "#fff",
              padding: "13px",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 15,
            }}>
              {p.cta}
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
