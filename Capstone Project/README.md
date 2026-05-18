# Week 7 — Complete Blog App (Capstone — Full Stack)

**Roll No:** 24EG110A24 

---

## Overview

Week 7 is the capstone week — a complete, production-ready full-stack Blog Application with role-based access control, image uploads via Cloudinary, JWT authentication, Zustand for frontend state, and React Router for multi-page navigation. The app is deployed to Vercel.

---

## Project: `Capstone Project / Complete Blog App`

---

## Backend

### Tech Stack
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens) + cookie-parser
- Cloudinary (image upload)
- Multer (file handling middleware)
- CORS (configured for localhost and Vercel deployment)

### Project Structure

```
Backend/
├── server.js               # Entry point — CORS, routers, error handling
├── package.json
├── admin-req.http
├── author-req.http
├── user-req.http
├── config/
│   ├── cloudinary.js       # Cloudinary SDK configuration
│   ├── cloudinaryUpload.js # Upload helper function
│   └── multer.js           # Multer disk/memory storage setup
├── middlewares/
│   └── verifyToken.js      # JWT auth middleware with role-based checks
├── models/
│   ├── UserModel.js        # User schema (username, password, email, role, profilePic)
│   └── ArticleModel.js     # Article schema (title, content, category, image, author ref, status)
└── APIs/
    ├── UserAPI.js          # Register, login
    ├── AuthorAPI.js        # Write, edit, delete own articles; upload cover image
    ├── AdminAPI.js         # Manage users; approve/reject articles
    └── CommonAPI.js        # Public article listing, article by ID, search
```

### CORS Configuration
```js
cors({
  origin: ['http://localhost:5173', 'https://atp-24-eg-110-a17.vercel.app'],
  credentials: true
})
```

### API Routes

**UserAPI** (`/user-api`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/user-api/user` | Register | Public |
| POST | `/user-api/login` | Login → JWT cookie | Public |

**AuthorAPI** (`/author-api`) — Author role required
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/author-api/article` | Create article (with image upload) |
| PUT | `/author-api/article` | Edit own article |
| DELETE | `/author-api/article/:id` | Delete own article |
| GET | `/author-api/articles` | Get own articles |

**AdminAPI** (`/admin-api`) — Admin role required
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin-api/users` | List all users |
| DELETE | `/admin-api/user/:id` | Delete a user |
| PUT | `/admin-api/article/:id` | Approve or reject article |
| GET | `/admin-api/articles` | All articles (all statuses) |

**CommonAPI** (`/auth`) — Authenticated
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/articles` | All published articles |
| GET | `/auth/article/:id` | Article by ID |

---

## Frontend

### Tech Stack
- React 18 + Vite
- React Router v6 (client-side routing)
- Zustand (global auth state)
- Axios (HTTP client)
- Tailwind CSS (utility-first styling)

### Project Structure

```
Frontend/src/
├── App.jsx                         # Route definitions
├── config.js                       # Backend base URL
├── main.jsx
├── store/
│   └── authStore.js                # Zustand store — user, token, login/logout actions
├── styles/
│   └── common.js                   # Shared Tailwind class strings
└── components/
    ├── Root.jsx                    # Root layout with header/footer
    ├── Header.jsx                  # Navbar with role-aware links
    ├── Footer.jsx                  # App footer
    ├── Home.jsx                    # Landing page with featured articles
    ├── Articles.jsx                # All published articles listing
    ├── ArticleById.jsx             # Full article view by ID
    ├── Login.jsx                   # Login form
    ├── Register.jsx                # Registration form (with role selection)
    ├── UserProfile.jsx             # User profile page
    ├── AuthorProfile.jsx           # Author profile + article stats
    ├── AdminProfile.jsx            # Admin dashboard
    ├── AuthorList.jsx              # List of all authors (public)
    ├── AuthorArticles.jsx          # All articles by a specific author
    ├── WriteArticles.jsx           # Article creation form (authors only)
    ├── EditArticle.jsx             # Article edit form (authors only)
    ├── UserList.jsx                # Admin — all users list with manage options
    ├── ProtectedRoute.jsx          # Route guard — checks auth + role
    └── Unauthorized.jsx            # 401 page for unauthorised access
```

### Zustand Auth Store (`authStore.js`)
```js
{
  user: null,        // logged-in user object
  token: null,       // JWT token
  login(user, token),
  logout()
}
```

### Routing Overview
| Path | Component | Access |
|------|-----------|--------|
| `/` | `Home` | Public |
| `/articles` | `Articles` | Public |
| `/article/:id` | `ArticleById` | Public |
| `/login` | `Login` | Public |
| `/register` | `Register` | Public |
| `/authors` | `AuthorList` | Public |
| `/user-profile` | `UserProfile` | User |
| `/author-profile` | `AuthorProfile` | Author |
| `/write-article` | `WriteArticles` | Author |
| `/edit-article` | `EditArticle` | Author |
| `/admin-profile` | `AdminProfile` | Admin |
| `/users` | `UserList` | Admin |
| `/unauthorized` | `Unauthorized` | — |

---

## How to Run

**Backend:**
```bash
cd Backend
npm install
# .env:
# DB_URL=<MongoDB URI>
# PORT=5000
# JWT_SECRET=<secret>
# CLOUDINARY_CLOUD_NAME=<name>
# CLOUDINARY_API_KEY=<key>
# CLOUDINARY_API_SECRET=<secret>
node server.js
```

**Frontend:**
```bash
cd Frontend
npm install
npm run dev
```

Open `http://localhost:5173`

---

## Deployment
- Frontend deployed to **Vercel**: `https://atp-24-eg-110-a17.vercel.app`
- Backend CORS is configured to allow requests from the Vercel domain.