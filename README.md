# Mentoring Platform

A lightweight, anonymous voting platform for mentoring sessions. Participants can suggest topics and vote on what they want the mentor to cover.

**Live**:
- Landing page: https://suryapandian.himalayas.workers.dev
- Voting app (March session): https://march-ramco.himalayas.workers.dev/march-ramco

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

1. **Landing Page** (`suryapandian.himalayas.workers.dev`)
   - Static HTML page with your bio, experience, skills, embedded talks, and links to mentoring sessions
   - Deployed as a separate Worker

2. **Voting App** (`march-ramco.himalayas.workers.dev/march-ramco`)
   - Fetches list of topics from D1 via `/march-ramco/api/topics`
   - Displays topics sorted by votes (descending), then creation time
   - Users can:
     - **Vote/unvote** — Click button to upvote, click again to remove vote (toggle, never locked)
     - **Suggest new topics** — POST to `/march-ramco/api/topics` with title + optional description
   - Vote tracking via browser localStorage (no account needed)
   - All data persists in D1 database

3. **Database Schema**
   ```sql
   CREATE TABLE topics (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
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
- `http://localhost:8787/march-ramco` — Voting app
- `http://localhost:8787/march-ramco/api/topics` — API

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
# Query remote DB
wrangler d1 execute mentor-topics-db --remote --command "SELECT * FROM topics;"

# Delete a topic by id
wrangler d1 execute mentor-topics-db --remote --command "DELETE FROM topics WHERE id = 4;"

# Insert a topic
wrangler d1 execute mentor-topics-db --remote --command "INSERT INTO topics (title, description) VALUES ('Topic', 'Description');"
```

---

## Project Structure

```
.
├── src/
│   ├── index.ts              # March Ramco voting app (with D1 binding)
│   └── landing/
│       └── index.ts          # Landing page (no DB needed)
├── migrations/
│   └── 0001_init.sql         # D1 schema + seed data
├── wrangler.jsonc            # Config for march-ramco worker
├── wrangler.landing.jsonc    # Config for suryapandian landing page
├── package.json
└── README.md
```

---

## Deployment

### Deploy Both Workers

**Landing page** (suryapandian):
```bash
wrangler deploy --config wrangler.landing.jsonc
```

**Voting app** (march-ramco):
```bash
wrangler deploy  # Uses wrangler.jsonc (default)
```

### Create a New Mentoring Session

1. **Create new D1 database:**
   ```bash
   wrangler d1 create my-session-db
   ```

2. **Copy `wrangler.jsonc`** and update:
   ```jsonc
   {
     "name": "my-session",
     "d1_databases": [
       {
         "binding": "DB",
         "database_name": "my-session-db",
         "database_id": "YOUR_NEW_ID"
       }
     ]
   }
   ```

3. **Update route prefix in `src/index.ts`:**
   - Replace all `/march-ramco/` with `/my-session/`
   - Update redirect: `url.origin + '/my-session'`

4. **Deploy:**
   ```bash
   wrangler deploy
   ```

5. **Run migrations:**
   ```bash
   wrangler d1 execute my-session-db --remote --file ./migrations/0001_init.sql
   ```

6. **Add to landing page** (`src/landing/index.ts`):
   ```html
   <a class="session-card" href="https://my-session.himalayas.workers.dev/my-session">
     <h3>My Session</h3>
     <p>Vote on topics</p>
     <span class="arrow">Vote &rarr;</span>
   </a>
   ```

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

- Landing page is a separate Worker (`suryapandian`) — can be updated independently
- Each mentoring session gets its own Worker and D1 database for isolation
- All Workers deployed to `himalayas.workers.dev` subdomain
