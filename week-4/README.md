# Week 4 — Blog App Backend (Capstone) & HTML Introduction

**Dates:** 12 Mar 2026 – 14 Mar 2026 | **Roll No:** 24EG110A24

---

## Overview

Week 4 has two tracks running in parallel: a multi-role Blog App backend as a capstone project (Days 9 & 10) and an introduction to HTML for building web pages (Day 11).

---

## Days 9 & 10 — 12–13 Mar 2026

### Topics Covered
- Multi-router Express architecture (User, Author, Admin, Common)
- Role-based access control (`USER`, `AUTHOR`, `ADMIN`) enforced in JWT middleware
- Soft delete for articles (`isActive` flag)
- Mongoose schemas with `strict: 'throw'` to reject unknown fields
- Error handling middleware for `ValidationError`, `CastError`, and 404

### Tech Stack
- Node.js + Express.js
- MongoDB + Mongoose
- bcryptjs + jsonwebtoken + cookie-parser
- dotenv

### Project Structure

```
Capstone Project/Blog App/
├── server.js                   # Entry point — mounts 4 routers, global error handler
├── package.json
├── admin-req.http              # REST Client requests for admin routes
├── author-req.http             # REST Client requests for author routes
├── user-req.http               # REST Client requests for user routes
├── middlewares/
│   └── verifyToken.js          # Role-aware JWT middleware: verifyToken('AUTHOR')
├── models/
│   ├── UserModel.js            # User schema: firstName, email, password, role, isUserActive
│   └── ArticleModel.js         # Article schema: title, category, content, comments[], isActive
└── APIs/
    ├── CommonAPI.js            # Register (USER/AUTHOR only), login → JWT cookie
    ├── UserAPI.js              # User-facing routes
    ├── AuthorAPI.js            # Write, read own, edit, soft-delete articles
    └── AdminAPI.js             # Enable/disable users, view all active articles
```

### Data Models

**User Schema** (`UserModel.js`)
```js
{
  firstName:     String (required),
  lastName:      String,
  email:         String (required, unique),
  password:      String (required, hashed),
  role:          String (enum: ['USER', 'AUTHOR', 'ADMIN']),
  profileImageUrl: String,
  isUserActive:  Boolean (default: true)
}
```

**Article Schema** (`ArticleModel.js`)
```js
{
  author:   ObjectId (ref: 'user', required),
  title:    String   (required),
  category: String   (required),
  content:  String   (required),
  comments: [{ user: ObjectId, comment: String }],
  isActive: Boolean  (default: true)   // soft delete flag
}
```

### Router Mounting in `server.js`
| Path | Router | Role Required |
|------|--------|---------------|
| `/auth` | CommonAPI | Public |
| `/user-api` | UserAPI | Authenticated |
| `/author-api` | AuthorAPI | `AUTHOR` |
| `/admin-api` | AdminAPI | `ADMIN` |

### API Routes

**CommonAPI** (`/auth`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/users` | Register (USER or AUTHOR only) | Public |
| POST | `/auth/login` | Login → JWT cookie | Public |

**AuthorAPI** (`/author-api`) — AUTHOR role required
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/author-api/articles` | Create a new article |
| GET | `/author-api/articles` | Get own articles |
| PUT | `/author-api/articles` | Edit own article by ID |
| PATCH | `/author-api/articles` | Soft-delete (toggle `isActive`) |

**AdminAPI** (`/admin-api`) — ADMIN role required
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/admin-api/users` | Enable or disable a user |
| GET | `/admin-api/articles` | Get all active articles |

### How to Run

```bash
cd "Day-9(12-03-2026)/Capstone Project/Blog App"
npm install
node server.js
```

Create a `.env` file:
```env
DB_URL=<MongoDB URI>
PORT=3000
SECRET_KEY=<JWT secret>
```

---

## Day 11 — 14 Mar 2026

### Topics Covered
- HTML document structure (`<!doctype>`, `<html>`, `<head>`, `<body>`)
- Headings, paragraphs, images with `float`
- Hyperlinks (`<a href="">`)
- Ordered (`<ol>`) and unordered (`<ul>`) lists
- Horizontal rules (`<hr>`)

### Project Structure

```
Day-11(14-03-2026)/Frontend/
├── Assignment1.html    # Page with headings, paragraphs, a Google link, and a fruit list
└── Assignment2.html    # "Pochi the Cat" page — image with float, ol/ul, external links
```

Open either `.html` file directly in a browser — no server needed.