CREATE TABLE IF NOT EXISTS topics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  votes INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Seed initial topics for march-ramco session
INSERT INTO topics (session_id, title, description) VALUES
  ('march-ramco', 'Higher studies', ''),
  ('march-ramco', 'Job/Career opportunities', ''),
  ('march-ramco', 'Artificial Intelligence', ''),
  ('march-ramco', 'Career Growth in Engineering', 'Navigating promotions, building influence, and leadership skills'),
  ('march-ramco', 'Open Source Contribution', 'How to start, maintain, and grow open source projects');
