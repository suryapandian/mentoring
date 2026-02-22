interface Env {
  DB: D1Database;
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mentoring Topics — Vote for What Matters</title>
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
      padding: 48px 24px;
    }

    .hero-inner {
      max-width: 720px;
      margin: 0 auto;
      display: flex;
      gap: 28px;
      align-items: center;
    }

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      font-weight: 700;
      color: white;
      flex-shrink: 0;
      letter-spacing: -1px;
    }

    .bio h1 {
      font-size: 26px;
      font-weight: 700;
      color: #f4f4f5;
      margin-bottom: 4px;
    }

    .bio .title {
      font-size: 15px;
      color: #a1a1aa;
      margin-bottom: 10px;
    }

    .bio p {
      font-size: 14px;
      line-height: 1.6;
      color: #a1a1aa;
    }

    .bio .linkedin-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 10px;
      color: #818cf8;
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      transition: color 0.2s;
    }

    .bio .linkedin-link:hover { color: #a5b4fc; }

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
    }

    .section-header h2 {
      font-size: 20px;
      font-weight: 600;
      color: #f4f4f5;
    }

    .section-header p {
      font-size: 13px;
      color: #71717a;
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
      .hero-inner { flex-direction: column; text-align: center; }
      .avatar { width: 80px; height: 80px; font-size: 32px; }
      .form-row { flex-direction: column; }
    }
  </style>
</head>
<body>
  <div class="hero">
    <div class="hero-inner">
      <div class="avatar">SP</div>
      <div class="bio">
        <h1>Surya Pandian</h1>
        <div class="title">Senior Software Developer at TrueLayer, London</div>
        <p>
          Software developer with expertise in Rust, Go, SQL, Kubernetes, and AWS.
          10+ years building scalable systems — from zero-downtime database migrations and
          Kubernetes cluster upgrades to event-driven microservices and developer productivity tooling.
          Previously at Qube Cinema and Voonik. CKAD &amp; CCNA certified.
        </p>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">
          <span style="padding:3px 10px;background:#27272a;border-radius:6px;font-size:12px;color:#a1a1aa;">Go</span>
          <span style="padding:3px 10px;background:#27272a;border-radius:6px;font-size:12px;color:#a1a1aa;">Rust</span>
          <span style="padding:3px 10px;background:#27272a;border-radius:6px;font-size:12px;color:#a1a1aa;">Kubernetes</span>
          <span style="padding:3px 10px;background:#27272a;border-radius:6px;font-size:12px;color:#a1a1aa;">AWS</span>
          <span style="padding:3px 10px;background:#27272a;border-radius:6px;font-size:12px;color:#a1a1aa;">PostgreSQL</span>
          <span style="padding:3px 10px;background:#27272a;border-radius:6px;font-size:12px;color:#a1a1aa;">Terraform</span>
        </div>
        <a class="linkedin-link" href="https://www.linkedin.com/in/surya-pandian-b7153233/" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          View LinkedIn Profile
        </a>
      </div>
    </div>
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
      <h2>Vote on Topics</h2>
      <p>Click to upvote anonymously</p>
    </div>

    <div class="topics-list" id="topicsList">
      <div class="empty-state">Loading topics...</div>
    </div>
  </div>

  <div class="toast" id="toast"></div>

  <script>
    const voted = JSON.parse(localStorage.getItem('voted') || '{}');

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
      const res = await fetch('/march-ramco/api/topics');
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
      const endpoint = isVoted ? '/march-ramco/api/topics/' + id + '/unvote' : '/march-ramco/api/topics/' + id + '/vote';
      const res = await fetch(endpoint, { method: 'POST' });
      if (res.ok) {
        if (isVoted) {
          delete voted[id];
          showToast('Vote removed');
        } else {
          voted[id] = true;
          showToast('Vote recorded!');
        }
        localStorage.setItem('voted', JSON.stringify(voted));
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

      const res = await fetch('/march-ramco/api/topics', {
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

    // API routes
    if (url.pathname === '/march-ramco/api/topics' && request.method === 'GET') {
      const { results } = await env.DB.prepare(
        'SELECT id, title, description, votes, created_at FROM topics ORDER BY votes DESC, created_at DESC'
      ).all();
      return Response.json(results);
    }

    if (url.pathname === '/march-ramco/api/topics' && request.method === 'POST') {
      const body = await request.json<{ title: string; description?: string }>();
      const title = body.title?.trim();
      if (!title || title.length > 120) {
        return Response.json({ error: 'Title is required (max 120 chars)' }, { status: 400 });
      }
      const description = (body.description || '').trim().slice(0, 200);
      await env.DB.prepare(
        'INSERT INTO topics (title, description) VALUES (?, ?)'
      ).bind(title, description).run();
      return Response.json({ ok: true }, { status: 201 });
    }

    const voteMatch = url.pathname.match(/^\/march-ramco\/api\/topics\/(\d+)\/vote$/);
    if (voteMatch && request.method === 'POST') {
      const id = parseInt(voteMatch[1]);
      const result = await env.DB.prepare(
        'UPDATE topics SET votes = votes + 1 WHERE id = ?'
      ).bind(id).run();
      if (result.meta.changes === 0) {
        return Response.json({ error: 'Topic not found' }, { status: 404 });
      }
      return Response.json({ ok: true });
    }

    const unvoteMatch = url.pathname.match(/^\/march-ramco\/api\/topics\/(\d+)\/unvote$/);
    if (unvoteMatch && request.method === 'POST') {
      const id = parseInt(unvoteMatch[1]);
      const result = await env.DB.prepare(
        'UPDATE topics SET votes = MAX(0, votes - 1) WHERE id = ?'
      ).bind(id).run();
      if (result.meta.changes === 0) {
        return Response.json({ error: 'Topic not found' }, { status: 404 });
      }
      return Response.json({ ok: true });
    }

    // Serve HTML at /march-ramco
    if (url.pathname === '/march-ramco' || url.pathname === '/march-ramco/') {
      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // Redirect root to /march-ramco
    return Response.redirect(url.origin + '/march-ramco', 302);
  },
};
