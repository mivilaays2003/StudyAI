# 📚 StudyAI

Turn any academic paper into AI-generated slides, quizzes, and personalized study notes.

Built with **Next.js 14** + **Claude API** + **Tailwind CSS**.

---

## 🚀 Deploy to Vercel in 5 minutes

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
gh repo create studyai --public --push
```

### Step 2 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. Click **Deploy** (Vercel auto-detects Next.js)

### Step 3 — Add Environment Variables
In your Vercel project → **Settings → Environment Variables**, add:

| Variable | Value |
|----------|-------|
| `ANTHROPIC_API_KEY` | Your key from [console.anthropic.com](https://console.anthropic.com) |

That's it. Your app is live! 🎉

---

## 🔧 Run locally

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# 3. Start dev server
npm run dev

# Open http://localhost:3000
```

---

## 📁 Project Structure

```
studyai/
├── app/
│   ├── page.tsx              # Landing page (marketing)
│   ├── dashboard/page.tsx    # Main app (upload + generate)
│   ├── pricing/page.tsx      # Pricing page
│   ├── login/page.tsx        # Login (connect Supabase here)
│   ├── api/
│   │   └── generate/route.ts # ⭐ Claude API backend route
│   └── globals.css
├── public/
│   └── manifest.json         # PWA config (installable on mobile)
├── .env.example              # Environment variables template
└── package.json
```

---

## 🔑 The Key File: `app/api/generate/route.ts`

This is your backend. It:
- Receives the uploaded file from the frontend
- Calls the Claude API **securely** (API key never exposed to browser)
- Returns slides, quiz, or notes as structured JSON

---

## 🗺️ Roadmap (what to build next)

### Week 2 — Auth + Save history
1. Create a [Supabase](https://supabase.com) project (free)
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel env vars
3. In `app/login/page.tsx`, uncomment the Supabase auth code
4. Save generated results to a `generations` table

### Week 3 — Payments
1. Create a [Stripe](https://stripe.com) account
2. Add a $8/month product → copy the Price ID
3. Add Stripe keys to Vercel env vars
4. Add a `/api/checkout` route to create Stripe sessions
5. Gate the dashboard behind a subscription check

### Month 2 — Mobile App
Two options:
- **React Native**: Use [Expo](https://expo.dev) — wraps your same logic in a native shell
- **PWA** (already set up): Users can "Add to Home Screen" from the browser right now

### Month 2 — PDF Support
```bash
npm install pdf-parse
```
In `generate/route.ts`, detect `file.type === 'application/pdf'` and use `pdf-parse` to extract text before passing to Claude.

---

## 💡 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| AI | Anthropic Claude (`claude-sonnet-4-6`) |
| Styling | Tailwind CSS |
| Auth (add later) | Supabase Auth |
| Database (add later) | Supabase Postgres |
| Payments (add later) | Stripe |
| Hosting | Vercel (free tier) |
| Mobile | PWA (installable now) / React Native (later) |

---

## ⚙️ Environment Variables

See `.env.example` for all variables. Only `ANTHROPIC_API_KEY` is required to run the core app.
