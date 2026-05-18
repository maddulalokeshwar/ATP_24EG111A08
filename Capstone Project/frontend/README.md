# Capstone Project Frontend

This folder hosts the frontend portion of the Capstone blog application.

The real app is in the `blog/` directory.

Key frontend files
- `blog/src/main.jsx` — application bootstrap file
- `blog/src/App.jsx` — root component and route definitions
- `blog/src/components/` — blog pages and reusable components
- `blog/src/store/authStore.js` — authentication store for login state
- `blog/src/styles/common.js` — shared style utilities
- `blog/index.html` — app HTML template

How to run
1. `cd "Capstone Project/frontend/blog"`
2. `npm install`
3. `npm run dev`

This frontend communicates with the backend API in `Capstone Project/backend` for authentication, article management, and role-based access.
