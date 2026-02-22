import { sessions } from './sessions';

interface Env {
  DB: D1Database;
}

// Landing page HTML
const landingHtml = (sessionsConfig: typeof sessions) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Surya Pandian — Software Developer</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0a0f;
      color: #e4e4e7;
      min-height: 100vh;
    }

    .hero {
      background: linear-gradient(135deg, #0f0f1a 0%, #131328 40%, #0f2847 100%);
      padding: 72px 24px 56px;
      text-align: center;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }

    .avatar {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 44px;
      font-weight: 700;
      color: white;
      letter-spacing: -1px;
      margin-bottom: 20px;
    }

    .hero h1 {
      font-size: 32px;
      font-weight: 700;
      color: #f4f4f5;
      margin-bottom: 6px;
    }

    .hero .subtitle {
      font-size: 16px;
      color: #a1a1aa;
      margin-bottom: 16px;
    }

    .hero .summary {
      max-width: 600px;
      margin: 0 auto 24px;
      font-size: 15px;
      line-height: 1.7;
      color: #8c8c96;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .social-links a {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 8px 16px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 8px;
      color: #a1a1aa;
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.2s;
    }

    .social-links a:hover {
      background: rgba(99,102,241,0.15);
      border-color: rgba(99,102,241,0.3);
      color: #c7d2fe;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 24px;
    }

    section {
      padding: 40px 0;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }

    section:last-of-type {
      border-bottom: none;
    }

    section h2 {
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #52525b;
      margin-bottom: 16px;
    }

    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .skill-tags span {
      padding: 6px 14px;
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 8px;
      font-size: 13px;
      color: #a1a1aa;
    }

    .job {
      margin-bottom: 28px;
    }

    .job:last-child { margin-bottom: 0; }

    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 4px;
      flex-wrap: wrap;
      gap: 8px;
    }

    .job-header h3 {
      font-size: 16px;
      font-weight: 600;
      color: #e4e4e7;
    }

    .job-header .period {
      font-size: 13px;
      color: #52525b;
      white-space: nowrap;
    }

    .job-role {
      font-size: 13px;
      color: #6366f1;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .job ul {
      list-style: none;
      padding: 0;
    }

    .job li {
      position: relative;
      padding-left: 16px;
      font-size: 14px;
      color: #71717a;
      line-height: 1.6;
      margin-bottom: 4px;
    }

    .job li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 9px;
      width: 4px;
      height: 4px;
      background: #3f3f46;
      border-radius: 50%;
    }

    .video-wrap {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      border-radius: 12px;
      overflow: hidden;
      background: #18181b;
      border: 1px solid #27272a;
      margin-bottom: 16px;
    }

    .video-wrap iframe {
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }

    .session-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 16px;
    }

    .session-card {
      display: block;
      padding: 24px;
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.2s;
    }

    .session-card:hover {
      border-color: #6366f1;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
    }

    .session-card h3 {
      font-size: 16px;
      font-weight: 600;
      color: #e4e4e7;
      margin-bottom: 8px;
    }

    .session-card p {
      font-size: 13px;
      color: #71717a;
      line-height: 1.5;
      margin-bottom: 12px;
    }

    .session-card .cta {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: #6366f1;
      font-weight: 500;
      margin-top: 12px;
    }

    footer {
      padding: 32px 24px;
      text-align: center;
      font-size: 13px;
      color: #3f3f46;
      border-top: 1px solid rgba(255,255,255,0.04);
    }

    @media (max-width: 600px) {
      .hero { padding: 48px 20px 40px; }
      .hero h1 { font-size: 26px; }
      .session-cards { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="hero">
    <div class="avatar">SP</div>
    <h1>Surya Pandian</h1>
    <div class="subtitle">Senior Software Developer at TrueLayer, London</div>
    <p class="summary">
      Software developer with expertise in Rust, Go, SQL, Kubernetes, and AWS.
      10+ years building scalable systems — from zero-downtime database migrations and
      Kubernetes cluster upgrades to event-driven microservices and developer productivity tooling.
    </p>
    <div class="social-links">
      <a href="https://github.com/suryapandian" target="_blank" rel="noopener">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        GitHub
      </a>
      <a href="https://www.linkedin.com/in/surya-pandian-b7153233/" target="_blank" rel="noopener">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        LinkedIn
      </a>
      <a href="https://stackoverflow.com/users/4234288/surya" target="_blank" rel="noopener">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.725 0l-1.72 1.277 6.39 8.588 1.72-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.905-1.94-9.702-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154z"/></svg>
        StackOverflow
      </a>
    </div>
  </div>

  <div class="container">
    <section>
      <h2>Skills</h2>
      <div class="skill-tags">
        <span>Go</span>
        <span>Rust</span>
        <span>Ruby on Rails</span>
        <span>PostgreSQL</span>
        <span>MySQL</span>
        <span>Redis</span>
        <span>ElasticSearch</span>
        <span>RabbitMQ</span>
        <span>SQS</span>
        <span>Kubernetes</span>
        <span>AWS</span>
        <span>Docker</span>
        <span>Terraform</span>
        <span>GitHub Actions</span>
        <span>CircleCI</span>
      </div>
    </section>

    <section>
      <h2>Experience</h2>

      <div class="job">
        <div class="job-header">
          <h3>TrueLayer</h3>
          <span class="period">London · Jul 2021 — Present</span>
        </div>
        <div class="job-role">Senior Software Developer — Developer Productivity</div>
        <ul>
          <li>Migrated RabbitMQ single classic cluster to Quorum multi cluster</li>
          <li>Migrated Kubernetes cluster from Rancher to EKS with zero downtime</li>
          <li>Enabled continuous delivery of all applications via Flux GitOps</li>
          <li>Built in-house binaries and tools to improve developer productivity</li>
        </ul>
        <div class="job-role" style="margin-top:12px;">Software Developer — CoreBanking</div>
        <ul>
          <li>Migrated transaction data across multiple ledgers to a unified ledger with zero downtime</li>
          <li>Migrated DB credentials from k8s secrets to Vault with zero downtime</li>
          <li>Optimised SQL queries and migrated from RPC over RMQ to gRPC, improving latency</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <h3>Qube Cinema</h3>
          <span class="period">Chennai · Apr 2018 — Jun 2021</span>
        </div>
        <div class="job-role">Senior Software Developer</div>
        <ul>
          <li>Built Qube Slate and Qube Wire — products delivering advertisement and movie content to theatres worldwide</li>
          <li>Partitioned data with millions of records with zero downtime</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <h3>Voonik</h3>
          <span class="period">Bangalore · Jan 2015 — Mar 2018</span>
        </div>
        <div class="job-role">Software Developer</div>
        <ul>
          <li>Built, deployed, and scaled event-driven microservices from legacy code</li>
          <li>Set up master-slave database replication and redirected read traffic</li>
          <li>Set up and trained ML models powered by Nvidia toolchains</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>Talks</h2>
      <div class="video-wrap">
        <iframe
          src="https://www.youtube.com/embed/tb4OrbrvveM?start=5686"
          title="CloudNative Talk — Surya Pandian"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </section>

    <section>
      <h2>Certifications</h2>
      <div class="skill-tags">
        <span>CKAD — Certified Kubernetes Application Developer</span>
        <span>CCNA — Cisco Certified Network Associate</span>
      </div>
    </section>

    <section>
      <h2>Mentoring Sessions</h2>
      <div class="session-cards">
        ${sessionsConfig.map(s => `
          <a class="session-card" href="/${s.id}">
            <h3>${s.name}</h3>
            <p>${s.description}</p>
            <span class="cta">Vote on topics →</span>
          </a>
        `).join('')}
      </div>
    </section>
  </div>

  <footer>
    &copy; 2026 Surya Pandian
  </footer>
</body>
</html>`;

// Voting app HTML (reused for all sessions)
const votingHtml = (sessionId: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vote on Topics — ${sessionId}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0f0f13;
      color: #e4e4e7;
      min-height: 100vh;
    }

    .hero {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      padding: 32px 24px;
    }

    .hero h1 {
      max-width: 720px;
      margin: 0 auto;
      font-size: 24px;
      font-weight: 700;
      color: #f4f4f5;
    }

    .hero p {
      max-width: 720px;
      margin: 8px auto 0;
      font-size: 14px;
      color: #a1a1aa;
    }

    .container {
      max-width: 720px;
      margin: 0 auto;
      padding: 32px 24px 64px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      gap: 16px;
    }

    .section-header h2 {
      font-size: 20px;
      font-weight: 600;
      color: #f4f4f5;
    }

    .section-header p {
      font-size: 13px;
      color: #71717a;
      white-space: nowrap;
    }

    .suggest-form {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 32px;
    }

    .suggest-form h3 {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 14px;
      color: #d4d4d8;
    }

    .form-row {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }

    .form-row input {
      flex: 1;
      padding: 10px 14px;
      background: #0f0f13;
      border: 1px solid #27272a;
      border-radius: 8px;
      color: #e4e4e7;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }

    .form-row input:focus { border-color: #6366f1; }
    .form-row input::placeholder { color: #52525b; }

    .desc-row { margin-bottom: 14px; }

    .desc-row input {
      width: 100%;
      padding: 10px 14px;
      background: #0f0f13;
      border: 1px solid #27272a;
      border-radius: 8px;
      color: #e4e4e7;
      font-size: 13px;
      outline: none;
      transition: border-color 0.2s;
    }

    .desc-row input:focus { border-color: #6366f1; }
    .desc-row input::placeholder { color: #52525b; }

    .btn-suggest {
      padding: 10px 20px;
      background: #6366f1;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-suggest:hover { background: #4f46e5; }
    .btn-suggest:disabled { opacity: 0.5; cursor: not-allowed; }

    .topics-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .topic-card {
      display: flex;
      align-items: center;
      gap: 16px;
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 12px;
      padding: 16px 20px;
      transition: border-color 0.2s, transform 0.15s;
    }

    .topic-card:hover {
      border-color: #3f3f46;
      transform: translateY(-1px);
    }

    .vote-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 8px 12px;
      background: #27272a;
      border: 1px solid #3f3f46;
      border-radius: 10px;
      color: #a1a1aa;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
      min-width: 56px;
    }

    .vote-btn:hover {
      background: #6366f1;
      border-color: #6366f1;
      color: white;
    }

    .vote-btn.voted {
      background: #4f46e5;
      border-color: #6366f1;
      color: white;
      cursor: pointer;
    }

    .vote-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    .vote-btn .arrow {
      font-size: 18px;
      line-height: 1;
    }

    .vote-btn .count {
      font-size: 14px;
      font-weight: 600;
    }

    .topic-info {
      flex: 1;
      min-width: 0;
    }

    .topic-info h3 {
      font-size: 15px;
      font-weight: 600;
      color: #e4e4e7;
      margin-bottom: 3px;
    }

    .topic-info p {
      font-size: 13px;
      color: #71717a;
      line-height: 1.4;
    }

    .topic-info .time {
      font-size: 11px;
      color: #52525b;
      margin-top: 4px;
    }

    .empty-state {
      text-align: center;
      padding: 48px 24px;
      color: #52525b;
    }

    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(80px);
      background: #22c55e;
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      transition: transform 0.3s ease;
      z-index: 100;
    }

    .toast.show { transform: translateX(-50%) translateY(0); }

    @media (max-width: 600px) {
      .section-header { flex-direction: column; align-items: flex-start; }
      .form-row { flex-direction: column; }
    }
  </style>
</head>
<body>
  <div class="hero">
    <h1>Vote on Topics</h1>
    <p>${sessionId} — Click to vote anonymously</p>
  </div>

  <div class="container">
    <div class="suggest-form">
      <h3>Suggest a Topic</h3>
      <div class="form-row">
        <input type="text" id="topicTitle" placeholder="Topic title..." maxlength="120" />
      </div>
      <div class="desc-row">
        <input type="text" id="topicDesc" placeholder="Brief description (optional)" maxlength="200" />
      </div>
      <button class="btn-suggest" id="suggestBtn" onclick="suggestTopic()">Submit Topic</button>
    </div>

    <div class="section-header">
      <h2>Topics</h2>
    </div>

    <div class="topics-list" id="topicsList">
      <div class="empty-state">Loading topics...</div>
    </div>
  </div>

  <div class="toast" id="toast"></div>

  <script>
    const sessionId = '${sessionId}';
    const voted = JSON.parse(localStorage.getItem('voted_' + sessionId) || '{}');

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 2000);
    }

    function timeAgo(dateStr) {
      const diff = Date.now() - new Date(dateStr + 'Z').getTime();
      const mins = Math.floor(diff / 60000);
      if (mins < 1) return 'just now';
      if (mins < 60) return mins + 'm ago';
      const hrs = Math.floor(mins / 60);
      if (hrs < 24) return hrs + 'h ago';
      const days = Math.floor(hrs / 24);
      return days + 'd ago';
    }

    async function loadTopics() {
      const res = await fetch('/' + sessionId + '/api/topics');
      const topics = await res.json();
      const list = document.getElementById('topicsList');

      if (!topics.length) {
        list.innerHTML = '<div class="empty-state">No topics yet. Be the first to suggest one!</div>';
        return;
      }

      list.innerHTML = topics.map(t => {
        const isVoted = voted[t.id];
        return \`
          <div class="topic-card">
            <button class="vote-btn \${isVoted ? 'voted' : ''}" onclick="vote(\${t.id}, this)" title="\${isVoted ? 'Click to remove vote' : 'Click to vote'}">
              <span class="arrow">\${isVoted ? '&#10003;' : '&#9650;'}</span>
              <span class="count">\${t.votes}</span>
            </button>
            <div class="topic-info">
              <h3>\${esc(t.title)}</h3>
              \${t.description ? '<p>' + esc(t.description) + '</p>' : ''}
              <div class="time">\${timeAgo(t.created_at)}</div>
            </div>
          </div>
        \`;
      }).join('');
    }

    function esc(s) {
      const d = document.createElement('div');
      d.textContent = s;
      return d.innerHTML;
    }

    async function vote(id, btn) {
      btn.disabled = true;
      const isVoted = voted[id];
      const endpoint = isVoted ? '/' + sessionId + '/api/topics/' + id + '/unvote' : '/' + sessionId + '/api/topics/' + id + '/vote';
      const res = await fetch(endpoint, { method: 'POST' });
      if (res.ok) {
        if (isVoted) {
          delete voted[id];
          showToast('Vote removed');
        } else {
          voted[id] = true;
          showToast('Vote recorded!');
        }
        localStorage.setItem('voted_' + sessionId, JSON.stringify(voted));
        loadTopics();
      } else {
        btn.disabled = false;
        showToast('Something went wrong');
      }
    }

    async function suggestTopic() {
      const titleEl = document.getElementById('topicTitle');
      const descEl = document.getElementById('topicDesc');
      const btn = document.getElementById('suggestBtn');
      const title = titleEl.value.trim();
      const description = descEl.value.trim();

      if (!title) { titleEl.focus(); return; }

      btn.disabled = true;
      btn.textContent = 'Submitting...';

      const res = await fetch('/' + sessionId + '/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });

      btn.disabled = false;
      btn.textContent = 'Submit Topic';

      if (res.ok) {
        titleEl.value = '';
        descEl.value = '';
        showToast('Topic submitted!');
        loadTopics();
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || 'Something went wrong');
      }
    }

    document.getElementById('topicTitle').addEventListener('keydown', e => {
      if (e.key === 'Enter') suggestTopic();
    });

    loadTopics();
  </script>
</body>
</html>`;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const sessionId = pathParts[0];

    // Root - landing page with all sessions
    if (url.pathname === '/' || url.pathname === '') {
      return new Response(landingHtml(sessions), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // Check if session exists
    const session = sessions.find(s => s.id === sessionId);
    if (!session) {
      return new Response('Session not found', { status: 404 });
    }

    // API routes for sessions
    if (pathParts[1] === 'api' && pathParts[2] === 'topics') {
      // GET /sessionId/api/topics
      if (url.pathname === `/${sessionId}/api/topics` && request.method === 'GET') {
        const { results } = await env.DB.prepare(
          'SELECT id, title, description, votes, created_at FROM topics WHERE session_id = ? ORDER BY votes DESC, created_at DESC'
        ).bind(sessionId).all();
        return Response.json(results);
      }

      // POST /sessionId/api/topics
      if (url.pathname === `/${sessionId}/api/topics` && request.method === 'POST') {
        const body = await request.json<{ title: string; description?: string }>();
        const title = body.title?.trim();
        if (!title || title.length > 120) {
          return Response.json({ error: 'Title is required (max 120 chars)' }, { status: 400 });
        }
        const description = (body.description || '').trim().slice(0, 200);
        await env.DB.prepare(
          'INSERT INTO topics (session_id, title, description) VALUES (?, ?, ?)'
        ).bind(sessionId, title, description).run();
        return Response.json({ ok: true }, { status: 201 });
      }

      // POST/unvote for individual topics
      const voteMatch = url.pathname.match(new RegExp(`^/${sessionId}/api/topics/(\\d+)/vote$`));
      if (voteMatch && request.method === 'POST') {
        const id = parseInt(voteMatch[1]);
        const result = await env.DB.prepare(
          'UPDATE topics SET votes = votes + 1 WHERE id = ? AND session_id = ?'
        ).bind(id, sessionId).run();
        if (result.meta.changes === 0) {
          return Response.json({ error: 'Topic not found' }, { status: 404 });
        }
        return Response.json({ ok: true });
      }

      const unvoteMatch = url.pathname.match(new RegExp(`^/${sessionId}/api/topics/(\\d+)/unvote$`));
      if (unvoteMatch && request.method === 'POST') {
        const id = parseInt(unvoteMatch[1]);
        const result = await env.DB.prepare(
          'UPDATE topics SET votes = MAX(0, votes - 1) WHERE id = ? AND session_id = ?'
        ).bind(id, sessionId).run();
        if (result.meta.changes === 0) {
          return Response.json({ error: 'Topic not found' }, { status: 404 });
        }
        return Response.json({ ok: true });
      }
    }

    // Serve voting page for session
    if (url.pathname === `/${sessionId}` || url.pathname === `/${sessionId}/`) {
      return new Response(votingHtml(sessionId), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // Redirect root to landing
    return Response.redirect(url.origin + '/', 302);
  },
};
