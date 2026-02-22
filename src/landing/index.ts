const landingHtml = `<!DOCTYPE html>
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

    .social-links svg { flex-shrink: 0; }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* Skills */
    .skills {
      padding: 40px 0;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }

    .skills h2 {
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

    /* Experience */
    .experience {
      padding: 40px 0;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }

    .experience h2 {
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #52525b;
      margin-bottom: 24px;
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

    /* Talk */
    .talk {
      padding: 40px 0;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }

    .talk h2 {
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #52525b;
      margin-bottom: 16px;
    }

    .video-wrap {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      border-radius: 12px;
      overflow: hidden;
      background: #18181b;
      border: 1px solid #27272a;
    }

    .video-wrap iframe {
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }

    /* Mentoring sessions */
    .sessions {
      padding: 40px 0;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }

    .sessions h2 {
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #52525b;
      margin-bottom: 16px;
    }

    .session-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 12px;
    }

    .session-card {
      display: block;
      padding: 20px;
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.2s;
    }

    .session-card:hover {
      border-color: #6366f1;
      transform: translateY(-2px);
    }

    .session-card h3 {
      font-size: 15px;
      font-weight: 600;
      color: #e4e4e7;
      margin-bottom: 4px;
    }

    .session-card p {
      font-size: 13px;
      color: #52525b;
    }

    .session-card .arrow {
      display: inline-block;
      margin-top: 10px;
      font-size: 13px;
      color: #6366f1;
      font-weight: 500;
    }

    /* Certifications */
    .certs {
      padding: 40px 0;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }

    .certs h2 {
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #52525b;
      margin-bottom: 16px;
    }

    .cert-list {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .cert-list span {
      padding: 8px 16px;
      background: rgba(99,102,241,0.08);
      border: 1px solid rgba(99,102,241,0.15);
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      color: #818cf8;
    }

    /* Footer */
    footer {
      padding: 32px 24px;
      text-align: center;
      font-size: 13px;
      color: #3f3f46;
    }

    @media (max-width: 600px) {
      .hero { padding: 48px 20px 40px; }
      .hero h1 { font-size: 26px; }
      .job-header { flex-direction: column; gap: 2px; }
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
    <section class="skills">
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

    <section class="experience">
      <h2>Experience</h2>

      <div class="job">
        <div class="job-header">
          <h3>TrueLayer</h3>
          <span class="period">London &middot; Jul 2021 — Present</span>
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
          <span class="period">Chennai &middot; Apr 2018 — Jun 2021</span>
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
          <span class="period">Bangalore &middot; Jan 2015 — Mar 2018</span>
        </div>
        <div class="job-role">Software Developer</div>
        <ul>
          <li>Built, deployed, and scaled event-driven microservices from legacy code</li>
          <li>Set up master-slave database replication and redirected read traffic</li>
          <li>Set up and trained ML models powered by Nvidia toolchains</li>
        </ul>
      </div>
    </section>

    <section class="talk">
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

    <section class="sessions">
      <h2>Mentoring Sessions</h2>
      <div class="session-cards">
        <a class="session-card" href="https://march-ramco.himalayas.workers.dev/march-ramco">
          <h3>March — Ramco</h3>
          <p>Vote on topics you want me to cover</p>
          <span class="arrow">Vote &rarr;</span>
        </a>
      </div>
    </section>

    <section class="certs">
      <h2>Certifications</h2>
      <div class="cert-list">
        <span>CKAD — Certified Kubernetes Application Developer</span>
        <span>CCNA — Cisco Certified Network Associate</span>
      </div>
    </section>
  </div>

  <footer>
    &copy; 2026 Surya Pandian
  </footer>
</body>
</html>`;

export default {
  async fetch(): Promise<Response> {
    return new Response(landingHtml, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  },
};
