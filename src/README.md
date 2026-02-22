# API Endpoints

### `GET /march-ramco/api/topics`
Returns all topics sorted by votes (DESC) then creation time (DESC).

```json
[
  {
    "id": 1,
    "title": "System Design Fundamentals",
    "description": "Distributed systems, scalability patterns...",
    "votes": 5,
    "created_at": "2026-02-22T10:30:00.000Z"
  }
]
```

### `POST /march-ramco/api/topics`
Create a new topic.

**Request:**
```json
{
  "title": "My Topic",
  "description": "Optional description"
}
```

**Response:** `{ "ok": true }` (201)

### `POST /march-ramco/api/topics/:id/vote`
Increment votes for a topic.

**Response:** `{ "ok": true }` (200)

### `POST /march-ramco/api/topics/:id/unvote`
Decrement votes for a topic (never goes below 0). Used when user wants to remove their vote.

**Response:** `{ "ok": true }` (200)
