# Week 5 — HTML/CSS Layouts & Introduction to React

**Dates:** 16 Mar 2026 – 18 Mar 2026 | **Roll No:** 24EG110A24

---

## Overview

Week 5 progresses from static HTML/CSS page layouts to building component-based UIs in React with Vite. It covers HTML tables and forms, responsive CSS layouts, and React fundamentals including JSX, props, and list rendering.

---

## Day 12 — 16 Mar 2026

### Topics Covered
- HTML tables with `colspan` and `rowspan`
- CSS class-based styling for tables
- HTML forms and styled user detail layouts

### Project Structure

```
Day-12(16-03-2026)/
├── Assignment-1/
│   ├── Tables/
│   │   ├── index.html      # Multi-column table using colspan/rowspan
│   │   └── styles.css      # Table border, color, and spacing styles
│   └── UserDetails/
│       ├── index.html      # HTML form with labeled user input fields
│       └── styles.css      # Form layout and field styling
└── Assignment-2/
    ├── index.html          # Blog-style page: navbar + 4 categorised article cards
    └── styles.css          # Card layout, category tag colors (travel/tech/fashion)
```

---

## Day 13 — 17 Mar 2026

### Topics Covered
- CSS hero sections, card grids, and button styles
- Multi-project layout design
- CSS Flexbox and Grid for responsive structure

### Project Structure

```
Day-13(17-03-2026)/
├── Assignment-1/
│   ├── index.html      # Hero section + content cards with "View details" buttons
│   └── styles.css      # Hero background, card layout, button variants
└── Assignment-2/
    ├── Project-1/
    │   ├── index.html  # Topbar + hero banner + grid layout (Libertarians theme)
    │   └── styles.css
    └── Project-2/
        ├── index.html  # Navbar + circular hero + content section (City Guide theme)
        └── styles.css
```

Open any `.html` file directly in a browser — no server needed.

---

## Day 14 — 18 Mar 2026

### Topics Covered
- React + Vite project setup (HMR, ESLint)
- JSX syntax and functional components
- Props — passing data from parent to child
- Rendering lists with `.map()` and `key` props
- Tailwind CSS utility classes for responsive grid layouts

### Tech Stack
- React 19 + Vite
- Tailwind CSS v4

### Assignment 1 — Product Listing

Static product data (20 items, Fake Store API format) is held in `App.jsx` and rendered via a reusable `Product` card component.

```
Assignment-1/
└── src/
    ├── App.jsx             # Holds products array, renders grid of <Product /> components
    └── components/
        └── Product.jsx     # Displays title, price, description for one product
```

**Component Data Flow:**
```
App.jsx
  └── products.map(p => <Product productObj={p} key={p.id} />)
                              └── Product.jsx  (reads props.productObj)
```

**Grid layout:** `sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

### Assignment 2 — User Card Listing

A static user list (10 users with name, email, avatar) is stored in `UserList.jsx` and rendered through a `Users` card component, wrapped in a `Navbar` + `Footer` layout.

```
Assignment-2/
└── src/
    ├── App.jsx             # Root — renders Navbar, UserList, Footer
    └── components/
        ├── Navbar.jsx      # Top navigation bar
        ├── Footer.jsx      # Page footer
        ├── UserList.jsx    # Holds users array, maps to <Users /> cards
        └── Users.jsx       # Displays avatar, name, email for one user
```

### How to Run

```bash
cd "Day-14(18-03-2026)/Assignment-1"   # or Assignment-2
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.