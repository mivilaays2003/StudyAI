"use client";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with Supabase auth
    // import { createClient } from '@supabase/supabase-js'
    // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    // await supabase.auth.signInWithOtp({ email })
    setSent(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F1A", color: "#E8E8F0", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 48 }}>
        <div style={{ width: 34, height: 34, background: "linear-gradient(135deg,#6C63FF,#FF6584)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>📚</div>
        <span style={{ fontWeight: 800, fontSize: 20, background: "linear-gradient(90deg,#6C63FF,#FF6584)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>StudyAI</span>
      </Link>

      <div style={{ background: "#1A1A2E", border: "1px solid #ffffff15", borderRadius: 20, padding: "40px 36px", width: "100%", maxWidth: 400 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, textAlign: "center" }}>Welcome back</h1>
        <p style={{ color: "#8888AA", textAlign: "center", marginBottom: 32, fontSize: 14 }}>Sign in with your email to continue</p>

        {sent ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📬</div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Check your inbox</div>
            <div style={{ color: "#8888AA", fontSize: 14 }}>We sent a magic link to <strong style={{ color: "#E8E8F0" }}>{email}</strong></div>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#8888AA" }}>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              required
              style={{ width: "100%", background: "#0F0F1A", border: "1px solid #ffffff20", borderRadius: 10, padding: "12px 14px", color: "#E8E8F0", fontSize: 15, marginBottom: 20, outline: "none" }}
            />
            <button type="submit" style={{ width: "100%", background: "linear-gradient(135deg,#6C63FF,#9C63FF)", border: "none", borderRadius: 10, padding: "13px", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              Send magic link
            </button>
          </form>
        )}

        <div style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: "#8888AA" }}>
          No account? <Link href="/dashboard" style={{ color: "#6C63FF", fontWeight: 600, textDecoration: "none" }}>Try it free →</Link>
        </div>
      </div>

      {/* Supabase setup note */}
      <div style={{ marginTop: 24, background: "#FF658415", border: "1px solid #FF658440", borderRadius: 12, padding: "14px 18px", maxWidth: 400, width: "100%", fontSize: 13, color: "#FF6584" }}>
        <strong>⚙️ Dev note:</strong> Connect Supabase to enable real auth. See <code>.env.example</code> for setup.
      </div>
    </div>
  );
}
