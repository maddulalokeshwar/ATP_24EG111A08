# Week 2 — Higher-Order Functions, ES6 Classes, Async JS & Express REST API

**Dates:** 25 Feb 2026 – 28 Feb 2026 | **Roll No:** 24EG110A24

---

## Overview

Week 2 covers four major JavaScript concepts: array Higher-Order Functions (HOFs), ES6 Classes, object copy mechanics (shallow vs deep), and building a REST API with Express.js backed by in-memory storage.

---

## Day 3 — 25 Feb 2026

### Topics Covered
- `filter`, `map`, `reduce`, `find`, `findIndex` on arrays and object arrays
- Modular project structure across multiple files
- HOF chaining for real-world data (marks, temperatures, transactions, employees)

### Project Structure

```
Day-3(25-02-2026)/
├── Link-1/
│   ├── CourseNamesProcessing.js    # filter by length, map to uppercase, findIndex
│   ├── StudentMarksAnalysis.js     # filter pass/fail, map grace marks, reduce max
│   └── TemperatureOperations.js    # filter >35°C, map to Fahrenheit, reduce average
├── Link-2/
│   ├── EmployeeProcessingByHof.js  # Filter by dept, map bonus salary, reduce total payout
│   ├── StudentManagementByHof.js   # Grade allocation (A/B/C/D), average marks, find topper
│   ├── TransactionProcessingByHof.js # Filter credits, map amounts, reduce final balance
│   ├── MovieManagementByHof.js     # Movie data operations using HOFs
│   └── ShoppingCartProcessingByHof.js # Cart totals, discounts, item filtering
└── Link-3/
    ├── Shopping Cart/
    │   ├── product.js              # Product data + stock checker
    │   ├── cart.js                 # addToCart, getCartItems, getCartTotal, clearCart
    │   ├── payment.js              # Payment processing logic
    │   └── app.js                  # Entry point — wires all modules together
    └── Task Management/
        ├── task.js                 # addTask, getAllTask, completeTask
        ├── validator.js            # validateTitle, validatePriority, validateDueDate
        └── app.js                  # Entry point
```

### Sample HOF Patterns

```js
// Filter + Map + Reduce on employee data
const itEmployees  = employees.filter(e => e.department === 'IT')
const bonusSalary  = employees.map(e => e.salary * 1.10)
const totalPayout  = employees.reduce((acc, e) => acc + e.salary * 1.10, 0)

// Grade allocation with map
const grades = students.map(s => s.marks >= 90 ? 'A' : s.marks >= 75 ? 'B' : 'C')
```

---

## Day 4 — 26 Feb 2026

### Topics Covered
- ES6 Classes — constructor, instance properties, methods
- Shallow copy with spread operator (`{...obj}`) — nested objects still share reference
- Deep copy with `structuredClone()` — fully independent clone
- Spread operator on arrays and objects
- Asynchronous JS — `setInterval`, `setTimeout`

### Project Structure

```
Day-4(26-02-2026)/
├── Classes/
│   └── BookClassManagement.js          # Book class: title, author, pages, isAvailable
│                                       # Methods: borrow(), returnBook(), getInfo(), isLongBook()
├── Shallow Copy and Deep copy/
│   ├── ShallowCopy.js                  # {...user} — nested preferences.theme mutates original
│   └── DeepCopy.js                     # structuredClone(order) — original stays unchanged
├── Spread Operator/
│   ├── ArraySpreadExample.js           # Merging and cloning arrays with ...
│   └── ObjectSpreadExample.js          # Merging object properties with ...
└── AsynchronousJS/
    ├── OTPCountdownSimulator.js        # setInterval counts 10s, setTimeout fires "Resend available"
    └── ExamPortalSimulator.js          # Timed exam session using async timers
```

### Key Concepts Illustrated

```js
// Shallow copy — nested object is still shared
const copyUser = { ...user }
copyUser.preferences.theme = 'light'  // ⚠️ also mutates original.preferences.theme

// Deep copy — fully independent
const copyOrder = structuredClone(order)
copyOrder.customer.address.city = 'Chennai'  // ✅ original unchanged
```

---

## Day 5 — 28 Feb 2026

### Topics Covered
- Node.js HTTP server with Express.js
- REST API design: `GET`, `POST`, `PUT`, `DELETE`
- Route parameters (`req.params`) and request body (`req.body`)
- `express.json()` body-parser middleware
- In-memory array as a mock database

### Tech Stack
- Node.js + Express.js v5

### Project Structure

```
Day-5(28-02-2026)/BackEnd-1/
├── server.js       # Express app with full CRUD for /users and /products
├── req.http        # REST Client test file for all routes
└── package.json
```

### API Routes

**Users** (`/users`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/:id` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create a new user |
| PUT | `/users` | Update user by ID (from body) |
| DELETE | `/users/:id` | Delete user by ID |

**Products** (`/products`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:brand` | Filter products by brand |
| POST | `/products` | Create a new product |
| PUT | `/products` | Update product by `productID` |
| DELETE | `/products/:productID` | Delete product by ID |

### How to Run

```bash
cd "Day-5(28-02-2026)/BackEnd-1"
npm install
node server.js
# Server starts on port 2106
```

---

## How to Run (Days 3 & 4)

```bash
node <filename>.js
```

No dependencies required — pure Node.js.