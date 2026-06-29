"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else router.push("/dashboard");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F1A", color: "#E8E8F0", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 48 }}>
        <div style={{ width: 34, height: 34, background: "linear-gradient(135deg,#6C63FF,#FF6584)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>📚</div>
        <span style={{ fontWeight: 800, fontSize: 20, background: "linear-gradient(90deg,#6C63FF,#FF6584)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>StudyAI</span>
      </Link>

      <div style={{ background: "#1A1A2E", border: "1px solid #ffffff15", borderRadius: 20, padding: "40px 36px", width: "100%", maxWidth: 400 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, textAlign: "center" }}>
          {isSignUp ? "Create account" : "Welcome back"}
        </h1>
        <p style={{ color: "#8888AA", textAlign: "center", marginBottom: 32, fontSize: 14 }}>
          {isSignUp ? "Start your 3-day free trial" : "Sign in to continue"}
        </p>

        <form onSubmit={handleAuth}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#8888AA" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@university.edu"
            required
            style={{ width: "100%", background: "#0F0F1A", border: "1px solid #ffffff20", borderRadius: 10, padding: "12px 14px", color: "#E8E8F0", fontSize: 15, marginBottom: 16, outline: "none", boxSizing: "border-box" }}
          />
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#8888AA" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={{ width: "100%", background: "#0F0F1A", border: "1px solid #ffffff20", borderRadius: 10, padding: "12px 14px", color: "#E8E8F0", fontSize: 15, marginBottom: 20, outline: "none", boxSizing: "border-box" }}
          />

          {error && (
            <div style={{ background: "#dc262620", border: "1px solid #dc262640", borderRadius: 8, padding: "10px 14px", color: "#f87171", fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{ width: "100%", background: "linear-gradient(135deg,#6C63FF,#9C63FF)", border: "none", borderRadius: 10, padding: "13px", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            {loading ? "Please wait..." : isSignUp ? "Start free trial" : "Sign in"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#8888AA" }}>
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button onClick={() => setIsSignUp(!isSignUp)} style={{ color: "#6C63FF", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>
            {isSignUp ? "Sign in" : "Sign up free"}
          </button>
        </div>

        {isSignUp && (
          <div style={{ marginTop: 20, background: "#6C63FF15", border: "1px solid #6C63FF30", borderRadius: 10, padding: "12px 16px", fontSize: 12, color: "#8888AA", textAlign: "center" }}>
            🎉 3-day free trial · No charge until day 4 · Cancel anytime
          </div>
        )}
      </div>
    </div>
  );
}