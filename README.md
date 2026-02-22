# Mentoring Platform

A lightweight, anonymous voting platform for mentoring sessions. Participants can suggest topics and vote on what they want the mentor to cover.

**Live**: https://suryapandian.himalayas.workers.dev
- `/` — Landing page with bio, experience, skills, talks
- `/march-ramco` — Voting app for March Ramco mentoring session
- `/april-xyz` (example) — Voting app for any future session

---

## Architecture

### Backend
- **Cloudflare Workers** (TypeScript) — Serverless HTTP handler
- **Cloudflare D1** — SQLite database for topics and votes

### Frontend
- **Vanilla HTML/CSS/JavaScript** — Embedded in Worker, served as single-page app
- **localStorage** — Client-side vote tracking (prevents duplicate votes)
- No build step, no external dependencies

### How It Works

**Unified Single Worker** (`src/unified.ts`) handles everything:

1. **Landing Page** (`/`)
   - Bio, resume, skills, experience, embedded talks
   - Lists all active mentoring sessions from `src/sessions.ts`
   - Links to each session's voting page

2. **Per-Session Voting App** (`/:sessionId`)
   - Dynamic voting interface for each mentoring session
   - Session ID determined from URL path
   - Fetches topics from D1 filtered by session
   - Features:
     - **Vote/unvote** — Click to upvote, click again to remove (toggle, never locked)
     - **Suggest topics** — POST with title + optional description
     - Vote tracking via browser localStorage (no account needed)

3. **Database Schema** (Multi-tenant via `session_id`)
   ```sql
   CREATE TABLE topics (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     session_id TEXT NOT NULL,           -- Partitions data by session
     title TEXT NOT NULL,
     description TEXT DEFAULT '',
     votes INTEGER DEFAULT 0,
     created_at TEXT DEFAULT (datetime('now'))
   );
   ```

## Running Locally

### Prerequisites
- Node.js 18+
- `wrangler` CLI v4.x+

### Setup

1. **Clone/navigate to the repo**
   ```bash
   cd /Users/suryapandian/repo/pl/mentoring
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Generate TypeScript types** (after config changes)
   ```bash
   wrangler types
   ```

### Local Development

**Start dev server:**
```bash
wrangler dev
```

This will:
- Start a local dev server at `http://localhost:8787`
- Use **local SQLite** (`/.wrangler/state/d1`) instead of remote D1
- Auto-reload on file changes

**Available routes locally:**
- `http://localhost:8787/` — Landing page
- `http://localhost:8787/march-ramco` — Voting app for March session
- `http://localhost:8787/april-xyz` — Voting app for April session (if added)
- `http://localhost:8787/:sessionId/api/topics` — API for any session

### Database

**Local D1 (for testing):**
```bash
# Apply migrations locally
wrangler d1 migrations apply mentor-topics-db --local

# Query local DB
wrangler d1 execute mentor-topics-db --command "SELECT * FROM topics;"

# Reset local DB
rm .wrangler/state/d1/db.sqlite
wrangler d1 migrations apply mentor-topics-db --local
```

**Remote D1 (production):**
```bash
# Query all topics
wrangler d1 execute mentor-topics-db --remote --command "SELECT * FROM topics;"

# Query topics for a specific session
wrangler d1 execute mentor-topics-db --remote --command "SELECT * FROM topics WHERE session_id = 'march-ramco';"

# Delete a topic by id
wrangler d1 execute mentor-topics-db --remote --command "DELETE FROM topics WHERE id = 4;"

# Insert a topic for a session
wrangler d1 execute mentor-topics-db --remote --command "
  INSERT INTO topics (session_id, title, description) VALUES
    ('march-ramco', 'New Topic', 'Description');
"

# Add multiple topics for a new session
wrangler d1 execute mentor-topics-db --remote --command "
  INSERT INTO topics (session_id, title, description) VALUES
    ('april-xyz', 'Topic 1', 'Description 1'),
    ('april-xyz', 'Topic 2', 'Description 2');
"
```

---

## Project Structure

```
.
├── src/
│   ├── unified.ts            # Single worker (landing + all sessions)
│   └── sessions.ts           # Session configuration
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions auto-deploy
├── migrations/
│   └── 0001_init.sql         # D1 schema + seed data
├── wrangler.jsonc            # Main config (uses unified.ts)
├── package.json
└── README.md
```

---

## Deployment

### Deploy to Production

```bash
# Push to main branch
git add .
git commit -m "Update mentoring sessions"
git push origin main
```

GitHub Actions automatically deploys via `.github/workflows/deploy.yml`

Or deploy manually:
```bash
wrangler deploy  # Uses wrangler.jsonc (src/unified.ts)
```

---

## Adding a New Mentoring Session

**No new workers or databases needed** — just add to the session configuration!

### 1. Add Session to Configuration

Edit `src/sessions.ts`:

```typescript
export const sessions = [
  {
    id: 'march-ramco',
    name: 'March — Ramco',
    description: 'Engineering mentoring cohort — March 2026',
  },
  {
    id: 'april-xyz',           // ← NEW
    name: 'April — XYZ',       // ← NEW
    description: 'Leadership & growth — April 2026',  // ← NEW
  },
  {
    id: 'may-platform',        // ← Another example
    name: 'May — Platform Team',
    description: 'System design bootcamp — May 2026',
  },
];
```

### 2. Deploy

```bash
git add src/sessions.ts
git commit -m "Add April XYZ mentoring session"
git push origin main
```

**That's it!** The new session is instantly live at:
- Landing page: https://suryapandian.himalayas.workers.dev/ (updated with new session card)
- Voting app: https://suryapandian.himalayas.workers.dev/april-xyz

### 3. (Optional) Pre-populate Topics

Add topics to the database for the new session:

```bash
wrangler d1 execute mentor-topics-db --remote --command "
  INSERT INTO topics (session_id, title, description) VALUES
    ('april-xyz', 'Leadership Skills', 'Management fundamentals'),
    ('april-xyz', 'Team Dynamics', 'Building effective teams'),
    ('april-xyz', 'Career Planning', 'Long-term growth strategy');
"
```

Or edit `migrations/0001_init.sql` to pre-seed new sessions for future fresh deployments.

### How It Works

- **Single database, multi-tenant** — `session_id` column partitions data
- **Automatic landing page updates** — `sessions.ts` drives the session cards
- **No duplicate code** — One unified worker handles all sessions
- **Instant deployment** — Git push triggers automatic deploy via GitHub Actions

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| **Runtime** | Cloudflare Workers |
| **Language** | TypeScript |
| **Database** | Cloudflare D1 (SQLite) |
| **Frontend** | HTML/CSS/JavaScript (vanilla, no build) |
| **Package Manager** | npm |
| **Deployment** | wrangler CLI |

---

## Features

✅ **Anonymous voting** — No login, votes tracked via browser localStorage
✅ **Toggle votes** — Click to vote, click again to remove (no accidental locks)
✅ **Zero-downtime updates** — Workers scale automatically
✅ **Serverless** — No servers to manage, pay-per-request
✅ **Multi-session support** — Create new sessions for each mentoring cohort
✅ **Lightweight** — Single HTML file, no framework bloat
✅ **Real-time** — Instant vote count updates

---

## Limitations

- **Browser-based voting tracking** — Vote state stored in localStorage; clearing it allows revoting (acceptable for mentoring context)
- **No user accounts** — Fully anonymous, no authentication
- **SQLite limitations** — Single-writer concurrency (fine for mentoring sessions, <100 participants)
- **D1 cold starts** — May have slight latency on first query

---

## Troubleshooting

**Votes not saving?**
- Check browser console for errors
- Verify API response: `wrangler d1 execute mentor-topics-db --remote --command "SELECT * FROM topics;"`

**Local DB not working?**
- Reset: `rm .wrangler/state/d1/db.sqlite`
- Re-apply migrations: `wrangler d1 migrations apply mentor-topics-db --local`

**Types not updating?**
- Run: `wrangler types`
- Restart dev server

---

## Notes

- **Single unified worker** at `suryapandian.himalayas.workers.dev` handles all sessions and the landing page
- **Multi-tenant database** — All sessions share one D1 database, partitioned by `session_id`
- **Easy to extend** — Add new sessions by editing `src/sessions.ts` (no code changes needed)
- **Auto-deploy** — Push to `main` branch triggers GitHub Actions deployment
- **Fast iteration** — Deploy new sessions in seconds without infrastructure changes
- **Scalable** — Cloudflare Workers handle unlimited sessions automatically
