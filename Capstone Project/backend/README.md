# Capstone Project Backend

This folder contains the backend API server for the Capstone blog application.

## Setup

1. Generate a `package.json` file
2. Create a `.env` file for configuration
3. Create the Express app and assign the port number
4. Connect to the database

## Data model

The backend defines schemas and models, including a `UserType` schema with fields such as:

- `firstName`
- `lastName`
- `email` (unique)
- `password`
- `role`
- `profileImageUrl`
- `isUserActive`

## APIs

- Implement route handlers for articles, authors, admins, and common user operations
- Create common APIs for registration, login, and logout

## Admin login approach

The current design gives only the admin a login option rather than registration plus login. To support this, admin user data must be seeded manually into the database.

## Contents

- `server.js` — Express server entry point
- `APIs/` — route handlers for users, authors, admins, and common operations
- `middleware/` — authentication and token verification
- `models/` — Mongoose schemas and data models
- `.env` — environment configuration file
- `*.http` — HTTP request templates for API testing
