"use client";
import { useState, useCallback, useRef } from "react";
import Link from "next/link";

// ─── Types ──────────────────────────────────────────────────────────

interface Slide { title: string; bullets: string[]; }
interface QuizQuestion { question: string; options: string[]; answer: string; explanation: string; }
interface NoteSection { heading: string; content: string; keyTerms?: string[]; }
interface Results { slides?: Slide[]; quiz?: QuizQuestion[]; notes?: NoteSection[]; }

// ─── Sub-components ─────────────────────────────────────────────────

function SlidesView({ slides }: { slides: Slide[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {slides.map((slide, i) => (
        <div key={i} style={{ background: "#16213E", borderRadius: 14, padding: "24px 28px", borderLeft: "4px solid #6C63FF" }}>
          <div style={{ fontSize: 11, color: "#8888AA", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Slide {i + 1}</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{slide.title}</div>
          <ul style={{ color: "#8888AA", fontSize: 14, lineHeight: 1.85, paddingLeft: 18 }}>
            {(slide.bullets || []).map((b, j) => <li key={j}>{b}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

function QuizView({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const pick = (qi: number, opt: string) => {
    if (answers[qi] !== undefined) return;
    setAnswers((a) => ({ ...a, [qi]: opt }));
  };
  const score = Object.keys(answers).filter((qi) => answers[+qi] === questions[+qi]?.answer).length;

  return (
    <div>
      {Object.keys(answers).length === questions.length && questions.length > 0 && (
        <div style={{ background: "#6C63FF20", border: "1px solid #6C63FF40", borderRadius: 12, padding: "16px 20px", marginBottom: 20, textAlign: "center", fontWeight: 700, fontSize: 16 }}>
          🎉 Score: {score}/{questions.length}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {questions.map((q, qi) => (
          <div key={qi} style={{ background: "#16213E", borderRadius: 14, padding: "22px 24px" }}>
            <div style={{ fontWeight: 600, marginBottom: 14, fontSize: 15 }}>Q{qi + 1}. {q.question}</div>
            {q.options.map((opt, oi) => {
              const chosen = answers[qi] === opt;
              const revealed = answers[qi] !== undefined;
              const isCorrect = opt === q.answer;
              let bg = "transparent", border = "1px solid #ffffff15", color = "#E8E8F0";
              if (revealed && isCorrect) { bg = "#16a34a30"; border = "1px solid #16a34a"; color = "#4ade80"; }
              else if (revealed && chosen) { bg = "#dc262630"; border = "1px solid #dc2626"; color = "#f87171"; }
              return (
                <button key={oi} onClick={() => pick(qi, opt)} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", borderRadius: 8, border, background: bg, color, cursor: "pointer", marginBottom: 8, fontSize: 14, transition: "all 0.15s" }}>
                  {opt}
                </button>
              );
            })}
            {answers[qi] !== undefined && q.explanation && (
              <div style={{ fontSize: 13, color: "#8888AA", marginTop: 8, fontStyle: "italic" }}>💡 {q.explanation}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function NotesView({ notes }: { notes: NoteSection[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {notes.map((n, i) => (
        <div key={i} style={{ background: "#16213E", borderRadius: 14, padding: "20px 24px", borderLeft: "4px solid #FF6584" }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{n.heading}</div>
          <div style={{ color: "#8888AA", fontSize: 14, lineHeight: 1.8, marginBottom: n.keyTerms?.length ? 12 : 0 }}>{n.content}</div>
          {n.keyTerms && n.keyTerms.length > 0 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {n.keyTerms.map((t) => (
                <span key={t} style={{ background: "#FF658420", border: "1px solid #FF658440", borderRadius: 6, padding: "3px 10px", fontSize: 12, color: "#FF6584", fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Dashboard ─────────────────────────────────────────────────

const MODES = [
  { id: "slides", icon: "🖥️", title: "Slides", desc: "Structured presentation deck" },
  { id: "quiz", icon: "🧠", title: "Quiz", desc: "MCQs with instant feedback" },
  { id: "notes", icon: "📝", title: "Notes", desc: "Personalised study notes" },
];

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [modes, setModes] = useState<string[]>(["slides"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [activeTab, setActiveTab] = useState("slides");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const readFile = (f: File) => setFile(f);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) readFile(f);
  }, []);

  const toggleMode = (id: string) =>
    setModes((m) => m.includes(id) ? (m.length > 1 ? m.filter((x) => x !== id) : m) : [...m, id]);

  const generate = async () => {
    if (!file || modes.length === 0) return;
    setLoading(true);
    setError("");
    setResults(null);

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("modes", JSON.stringify(modes));

      const res = await fetch("/api/generate", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Generation failed");
      setResults(data.results);
      setActiveTab(modes[0]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const canGenerate = !!file && modes.length > 0 && !loading;
  const tabLabel = (k: string) => k === "slides" ? "🖥️ Slides" : k === "quiz" ? "🧠 Quiz" : "📝 Notes";

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F1A", color: "#E8E8F0", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        input[type=file] { display: none; }
        button { font-family: inherit; }
      `}</style>

      {/* Nav */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 32px", borderBottom: "1px solid #ffffff10" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#6C63FF,#FF6584)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📚</div>
          <span style={{ fontWeight: 800, fontSize: 18, background: "linear-gradient(90deg,#6C63FF,#FF6584)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>StudyAI</span>
        </Link>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/pricing" style={{ color: "#8888AA", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>Pricing</Link>
          <Link href="/login" style={{ color: "#8888AA", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>Log in</Link>
        </div>
      </nav>

      <main style={{ maxWidth: 780, margin: "0 auto", padding: "48px 24px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h1 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 10 }}>
            Turn any paper into{" "}
            <span style={{ background: "linear-gradient(90deg,#6C63FF,#FF6584)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              study materials
            </span>
          </h1>
          <p style={{ color: "#8888AA", fontSize: 16 }}>Upload a document · Pick what you need · Let AI do the work</p>
        </div>

        {/* Upload zone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          style={{
            border: `2px dashed ${dragging ? "#6C63FF" : "#ffffff20"}`,
            borderRadius: 16,
            padding: "40px 24px",
            textAlign: "center",
            cursor: "pointer",
            background: dragging ? "#6C63FF10" : "#1A1A2E",
            marginBottom: 28,
            transition: "all 0.2s",
          }}
        >
          <input ref={inputRef} type="file" accept=".txt,.md,.pdf" onChange={(e) => e.target.files?.[0] && readFile(e.target.files[0])} />
          <div style={{ fontSize: 40, marginBottom: 10 }}>📄</div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{file ? "Change document" : "Drop your document here"}</div>
          <div style={{ color: "#8888AA", fontSize: 13 }}>Supports .txt, .md files · click to browse</div>
          {file && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#6C63FF20", border: "1px solid #6C63FF40", borderRadius: 8, padding: "6px 14px", fontSize: 13, marginTop: 12, color: "#E8E8F0" }}>
              📎 {file.name}
            </div>
          )}
        </div>

        {/* Mode selection */}
        <div style={{ fontSize: 12, fontWeight: 700, color: "#8888AA", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>Choose what to generate</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
          {MODES.map((m) => (
            <div key={m.id} onClick={() => toggleMode(m.id)} style={{
              border: `2px solid ${modes.includes(m.id) ? "#6C63FF" : "#ffffff15"}`,
              borderRadius: 14,
              padding: "18px 14px",
              cursor: "pointer",
              background: modes.includes(m.id) ? "#6C63FF10" : "#1A1A2E",
              textAlign: "center",
              transition: "all 0.15s",
            }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{m.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{m.title}</div>
              <div style={{ color: "#8888AA", fontSize: 12 }}>{m.desc}</div>
            </div>
          ))}
        </div>

        {/* Generate button */}
        <button onClick={generate} disabled={!canGenerate} style={{
          width: "100%",
          padding: 16,
          background: canGenerate ? "linear-gradient(135deg,#6C63FF,#9C63FF)" : "#1A1A2E",
          border: canGenerate ? "none" : "1px solid #ffffff15",
          borderRadius: 12,
          color: canGenerate ? "#fff" : "#8888AA",
          fontSize: 16,
          fontWeight: 700,
          cursor: canGenerate ? "pointer" : "not-allowed",
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}>
          {loading ? (
            <>
              <span style={{ width: 18, height: 18, border: "3px solid #ffffff30", borderTop: "3px solid #fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
              Generating…
            </>
          ) : (
            `Generate ${modes.map((m) => MODES.find((x) => x.id === m)?.title).join(" + ")}`
          )}
        </button>

        {/* Error */}
        {error && (
          <div style={{ marginTop: 16, background: "#dc262620", border: "1px solid #dc262640", borderRadius: 12, padding: "14px 18px", color: "#f87171", fontSize: 14 }}>
            ⚠️ {error}
          </div>
        )}

        {/* Results */}
        {results && (
          <div style={{ marginTop: 40, animation: "fadeIn 0.4s ease" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>Your Study Materials</h2>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {Object.keys(results).map((k) => (
                <button key={k} onClick={() => setActiveTab(k)} style={{
                  padding: "8px 18px",
                  borderRadius: 8,
                  border: activeTab === k ? "1px solid #6C63FF" : "1px solid #ffffff15",
                  background: activeTab === k ? "#6C63FF" : "transparent",
                  color: activeTab === k ? "#fff" : "#8888AA",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                  transition: "all 0.15s",
                }}>
                  {tabLabel(k)}
                </button>
              ))}
            </div>

            <div style={{ background: "#1A1A2E", borderRadius: 16, padding: 28 }}>
              {activeTab === "slides" && results.slides && <SlidesView slides={results.slides} />}
              {activeTab === "quiz" && results.quiz && <QuizView questions={results.quiz} />}
              {activeTab === "notes" && results.notes && <NotesView notes={results.notes} />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
