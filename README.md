# ContentAI — AI Content Growth Agent SaaS

A full-stack Agentic AI platform that helps businesses grow their online presence by generating viral, platform-optimized content using Claude AI.

## Architecture

```
AI-Agent/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── agents/
│   │   │   └── contentAgent.js    # Multi-agent AI orchestration
│   │   ├── middleware/
│   │   │   └── auth.js            # JWT authentication
│   │   ├── routes/
│   │   │   ├── auth.js            # Register, login, logout
│   │   │   ├── business.js        # Business CRUD + analysis
│   │   │   ├── content.js         # Content generation endpoints
│   │   │   └── campaigns.js       # Multi-platform campaigns
│   │   └── index.js               # Express server entry
│   ├── prisma/
│   │   └── schema.prisma          # SQLite database schema
│   └── .env                       # Backend env vars
├── frontend/                # Next.js 14 App Router
│   ├── app/
│   │   ├── page.tsx               # Landing page
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── dashboard/
│   │       ├── page.tsx           # Dashboard home
│   │       ├── businesses/        # Business management
│   │       ├── generate/          # AI content generator
│   │       ├── calendar/          # Content calendar
│   │       ├── hooks/             # Viral hook generator
│   │       ├── campaigns/         # Campaign management
│   │       └── history/           # Content history
│   ├── components/
│   │   ├── layout/Sidebar.tsx
│   │   ├── content/ContentDisplay.tsx
│   │   └── ui/                    # shadcn-style UI components
│   └── lib/
│       ├── api.ts                 # Axios API client
│       ├── store.ts               # Zustand state management
│       └── utils.ts               # Utilities + constants
├── start.js                 # One-command startup script
└── README.md
```

## Quick Start

### 1. Set your API key

Edit `backend/.env`:
```env
ANTHROPIC_API_KEY=your_actual_key_here
```

Get your key at: https://console.anthropic.com

### 2. Start everything

```bash
node start.js
```

This launches both backend (port 3001) and frontend (port 3000).

### 3. Open the app

- **App**: http://localhost:3000
- **API**: http://localhost:3001/api/health

---

## Features

### AI Content Generation
Each platform has its own specialized AI agent:

| Platform | Output |
|----------|--------|
| **Instagram** | Reel ideas + scripts, carousel concepts, captions, hashtags |
| **Twitter/X** | Viral tweets, authority threads, engagement posts |
| **LinkedIn** | Authority posts, case studies, carousel documents |
| **YouTube Shorts** | Full scripts with visual cues, thumbnail ideas |
| **Blog/Newsletter** | SEO articles with outlines, newsletter campaigns |
| **All Platforms** | Simultaneous multi-agent generation |

### Viral Frameworks Used
- AIDA (Attention, Interest, Desire, Action)
- PAS (Problem, Agitate, Solution)
- Before/After/Bridge
- Curiosity Gap
- Social Proof + Authority
- Controversy + Bold Takes
- Storytelling Arc
- Pattern Interrupts

### Core Features
- **Business Analysis** — AI analyzes your business and suggests growth strategies
- **Content Calendar** — 7-90 day strategic multi-platform calendars
- **Viral Hook Generator** — 10 proven frameworks, A/B test pairs
- **Campaign Manager** — Multi-platform content campaigns
- **Content History** — All generated content stored and searchable

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET  /api/auth/me`

### Businesses
- `GET    /api/businesses`
- `POST   /api/businesses`
- `PUT    /api/businesses/:id`
- `DELETE /api/businesses/:id`
- `POST   /api/businesses/:id/analyze`

### Content Generation
- `POST /api/content/generate` — Single platform
- `POST /api/content/calendar` — Full content calendar
- `POST /api/content/hooks`    — Viral hooks
- `GET  /api/content/:businessId/history`

### Campaigns
- `GET    /api/campaigns`
- `POST   /api/campaigns`
- `POST   /api/campaigns/:id/generate`
- `PATCH  /api/campaigns/:id/status`
- `DELETE /api/campaigns/:id`

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **AI** | Anthropic Claude (claude-opus-4-5) |
| **Backend** | Node.js, Express, Prisma, SQLite |
| **Frontend** | Next.js 14, TypeScript, TailwindCSS |
| **State** | Zustand |
| **Auth** | JWT + bcrypt |
| **Security** | Helmet, CORS, Rate limiting |

## Environment Variables

### Backend (`backend/.env`)
```env
ANTHROPIC_API_KEY=     # Required: Your Claude API key
PORT=3001
NODE_ENV=development
JWT_SECRET=            # Change in production
DATABASE_URL="file:./dev.db"
```
