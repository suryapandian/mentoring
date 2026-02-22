CREATE TABLE IF NOT EXISTS topics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  votes INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Seed some initial topics
INSERT INTO topics (title, description) VALUES
  ('System Design Fundamentals', 'Distributed systems, scalability patterns, and architecture trade-offs'),
  ('Career Growth in Engineering', 'Navigating promotions, building influence, and leadership skills'),
  ('API Design Best Practices', 'REST vs GraphQL, versioning, error handling, and documentation'),
  ('Production Debugging & Observability', 'Monitoring, logging, tracing, and incident response'),
  ('Open Source Contribution', 'How to start, maintain, and grow open source projects'),
  ('Cloud Architecture Patterns', 'Microservices, serverless, event-driven architectures');
