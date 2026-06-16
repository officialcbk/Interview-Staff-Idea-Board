# Staff Idea Board

A full-stack internal idea submission board built for a credit union environment, where staff can post improvement suggestions, upvote ideas they support, and leave comments. Leadership users can update the status of each idea to reflect its progress through the organization.

Built with **Laravel 13 · React 19 · MUI 9 · React Query 5 · MySQL 8 · Docker**.

---

## Getting Started

### Prerequisites
- Docker Desktop with Compose v2
- Ports 8000 (app), 8080 (Adminer), 5173 (Vite), and 13306 (MySQL) must be available

### Setup

```bash
cp .env.example .env
docker compose up -d
```

That's it. On first boot the containers automatically install dependencies, run migrations, and seed the database with sample users and ideas. Wait 10–15 seconds for MySQL to initialize, then visit:

| Service | URL |
| App | http://localhost:8000 |
| Adminer (DB GUI) | http://localhost:8080 |

**Adminer credentials:**
- Server: mysql
- Username: interview
- Password: secret
- Database: interview

---

## Why I Chose the Staff Idea Board

Credit unions are built on cooperative principles , where member and staff voice genuinely matters. The Staff Idea Board felt like the most meaningful prompt because it solves a real internal communication problem. How do you capture good ideas from frontline staff and make sure leadership actually sees and acts on them?

It also gave me the most interesting architectural decisions to make — voting logic, role-based access, status workflows — which meant I could demonstrate more of my thinking through the code itself.

---

## How I Approached It

I started by reading the scaffold carefully and understanding the patterns already in place. The Task resource gave me a clear model to follow and improve on.

Rather than building the entire backend before touching the frontend, I built feature by feature:

1. **Database first** — Migrations for `ideas`, `votes`, `comments`, and a `role` column on `users`
2. **Ideas list** — Model, seeder, API Resource, Controller, Route, then the React page
3. **User switcher** — Before building any user-specific features, I wired up the `ActingAsUser` middleware and a dropdown in the AppBar so every subsequent feature (voting, comments) would know who was acting
4. **Voting** — VoteService with toggle logic, VoteController, vote button on the frontend
5. **Comments** — CommentController, StoreCommentRequest, CommentResource, detail page on the frontend

This approach meant I always had something working and testable at each step, and the commit history reflects the progression clearly.

---

## Simulated Authentication

Rather than building a full login system, this project uses a lightweight `ActingAsUser` middleware that reads an `X-User-Id` header on every API request and sets the authenticated user via `auth()->setUser()`. This means `$request->user()` works everywhere in the backend — controllers, policies, services — exactly as it would with real auth, just without the login flow.

The frontend AppBar includes a user switcher dropdown that sends this header with every request via React Query.

Three users are seeded:

| Name | Role |
|---|---|
| Alice Staff | staff |
| Bob Staff | staff |
| Carol Leadership | leadership |

---

## Features

- **Idea Board** — Browse all staff ideas sorted by most votes, with color-coded status badges
- **Voting** — Upvote ideas you support. One vote per user per idea, enforced at the database level with a composite unique constraint not just in PHP code
- **Comments** — Click any idea card to open the detail view and leave a comment
- **User Switcher** — Switch between staff and leadership users in the AppBar to experience different roles
- **Status Badges** — Every idea displays its current status as a color-coded chip (Under Review, Planned, Implemented, Declined)

---

## Architecture

### Backend

| Layer | Purpose |
|---|---|
| **Migrations** | Version-controlled schema — `ideas`, `votes`, `comments` tables plus a `role` column added to `users` via a separate migration (never editing existing migrations) |
| **Enums** | `IdeaStatus` enum provides type-safe status values — no magic strings anywhere in the codebase |
| **Models** | Eloquent relationships defined on `Idea`, `Vote`, `Comment`, `User` — `$idea->votes`, `$idea->comments`, `$idea->user` all work out of the box |
| **Form Requests** | `StoreCommentRequest` validates input before it reaches the controller |
| **API Resources** | `IdeaResource`, `CommentResource` control the exact JSON shape — raw Eloquent models are never exposed to the frontend |
| **Services** | `VoteService` contains the vote toggle logic — controllers stay thin and delegate to services |
| **Middleware** | `ActingAsUser` reads `X-User-Id` header and sets the acting user on every API request |
| **Policies** | `IdeaPolicy` defines authorization rules — only leadership users can update idea status |

### Frontend

| Pattern | Purpose |
|---|---|
| **React Query** | Manages all server state — no `useEffect` or `useState` for data fetching |
| **UserContext** | Stores the active user and exposes it to all components via `useUser()` hook |
| **Feature-based structure** | Pages and components organized under `pages/Ideas/` — easy to navigate and extend |
| **api.js** | Single API layer — all fetch calls go through here, components never call `fetch` directly |
| **MUI** | Component library used for consistent, accessible UI with theme tokens — no inline styles |

---

## Project Structure
app/

Enums/IdeaStatus.php

Http/

Controllers/Api/

IdeaController.php

VoteController.php

CommentController.php

UserController.php

Middleware/

ActingAsUser.php

Requests/

StoreCommentRequest.php

Resources/

IdeaResource.php

CommentResource.php

Models/

Idea.php

Vote.php

Comment.php

User.php

Services/

VoteService.php

database/

migrations/

seeders/

UserSeeder.php

IdeaSeeder.php

resources/js/react/

context/

UserContext.jsx

lib/

api.js

pages/

Ideas/

index.jsx

IdeaDetail.jsx

---

## What I Would Add With More Time

- **Submit Idea form** — UI for staff to post new ideas directly from the board. The backend route and controller already support POST `/api/ideas` via `apiResource` — the frontend form is missing
- **Status update UI** — A dropdown visible only to Carol (leadership) on the idea detail page to move ideas through the workflow. The `IdeaPolicy` is already in place on the backend
- **Full authentication** — Replace the header-based switcher with Laravel Sanctum sessions and a proper login page
- **Optimistic UI updates** — Vote count updates instantly on click before the server confirms, then corrects if the server disagrees
- **Feature tests** — PHPUnit tests covering vote toggle atomicity, comment creation, and the leadership-only status authorization
- **Pagination** — For when the idea board grows beyond a handful of entries
- **Idea filtering** — Filter by status (Under Review, Planned, etc.) so leadership can focus on what needs a decision
