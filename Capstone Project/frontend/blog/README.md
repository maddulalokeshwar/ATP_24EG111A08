# Capstone Blog Frontend

This folder contains the React/Tailwind frontend for the Capstone blog application.

What the app includes
- `src/main.jsx` — entry point for the React application
- `src/App.jsx` — root component and client-side routing setup
- `src/components/` — page components such as `Home`, `Login`, `Register`, `UserProfile`, `AuthorArticles`, `WriteArticles`, `EditArticle`, `AdminProfile`, and `ProtectedRoute`
- `src/store/authStore.js` — authentication state management and login logic
- `src/styles/common.js` — shared style utilities and color tokens
- `src/index.css` — global CSS styles
- `tailwind.config.js` — Tailwind CSS configuration
- `vercel.json` — deployment settings

What the app does
- displays a list of blog articles on the home page
- supports user registration and login
- protects routes with role-based access
- allows authors to create and edit articles
- provides admin pages for managing users and articles

How to run
1. `cd "Capstone Project/frontend/blog"`
2. `npm install`
3. `npm run dev`

This frontend connects to the backend API in `Capstone Project/backend` for authentication, article management, and authorization.
