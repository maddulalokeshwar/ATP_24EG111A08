# Week 6 — React Hooks, State Management & Full-Stack Employee App

**Dates:** 28 Mar 2026 – 31 Mar 2026 | **Roll No:** 24EG110A24

---

## Overview

Week 6 goes deep into React — covering event handling, `useState`, `useEffect`, `react-hook-form`, the Context API, and Zustand for global state. The week culminates in a full-stack Employee CRUD application connecting a React + React Router frontend to an Express + MongoDB backend via Axios.

---

## Day 15 — 28 Mar 2026

### Topics Covered
- Event handling — parameterised and non-parameterised handlers
- `useState` — reactive state and component re-rendering
- `useEffect` — side effects, dependency array, data fetching
- `react-hook-form` — form registration, `handleSubmit`, field-level validation with error messages
- Callback props — child-to-parent state communication

### Tech Stack
- React 19 + Vite + Tailwind CSS v4
- react-hook-form, Axios

### Assignment 1 — React Hooks Demo App

```
Assignment-1/src/
├── App.jsx                     # Renders all demo components
└── components/
    ├── Counter.jsx             # useState: increment, decrement, reset
    ├── APIDemo.jsx             # useEffect + fetch: loads posts, shows loading/error states
    ├── FormDemo.jsx            # react-hook-form: username + email with validation messages
    ├── CreateUsers.jsx         # react-hook-form: firstName/lastName form, appends to users list
    ├── UserList.jsx            # Renders list of created users
    ├── Users.jsx               # Single user display
    ├── Product.jsx             # Product card component
    ├── Navbar.jsx              # Navigation bar
    ├── Footer.jsx              # Footer
    └── TestRefTypes.jsx        # Demo: reference types in React state
```

**Key Patterns:**
```js
// Counter with useState
const [count, setCount] = useState(0)
const increment = () => setCount(count + 1)

// Data fetching with useEffect
useEffect(() => {
  async function getData() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    setUsers(await res.json())
  }
  getData()
}, [])  // empty array → runs once on mount

// Form validation with react-hook-form
const { register, handleSubmit, formState: { errors } } = useForm()
<input {...register('Username', { required: 'Username required' })} />
```

### Assignment 2 — useEffect + Callback Props

```
Assignment-2/src/
├── App.jsx                 # Renders UserCount + Users, passes onAdd callback
└── components/
    ├── Users.jsx           # Fetches users via Axios + useEffect; calls props.onAdd on click
    └── UserCount.jsx       # Displays count of added users via props.count
```

**Parent-child pattern:**
```js
// App.jsx — owns count state, passes handlers down
<UserCount count={count} />
<Users onAdd={() => setCount(count + 1)} />
```

---

## Day 17 — 31 Mar 2026

### Topics Covered
- React Context API — `createContext`, `useContext`, `Provider`
- Sharing state across unrelated components without prop drilling
- Multiple counters reading from and writing to the same context

### Tech Stack
- React 19 + Vite + Tailwind CSS v4

### Project Structure

```
Day-17(31-03-2026)/Assignment/src/
├── App.jsx                         # Wraps app in ContextProvider, renders 4 counters in a grid
├── contexts/
│   └── ContextProvider.jsx         # createContext + useState; exposes { counter, increment, decrement }
└── components/
    ├── EditCounter1.jsx            # useContext → reads counter, calls increment/decrement
    ├── EditCounter2.jsx            # Same — all 4 share identical logic, same context
    ├── EditCounter3.jsx
    └── EditCounter4.jsx
```

**Context pattern:**
```js
// ContextProvider.jsx
export const counterContextObj = createContext()
// Provides { counter, increment, decrement } to entire subtree

// EditCounter1.jsx
const { counter, increment, decrement } = useContext(counterContextObj)
// Updating from any counter updates all four simultaneously
```

---

## 30 Mar 2026 — Full-Stack Employee CRUD App

### Topics Covered
- Full-stack integration: React frontend ↔ Express + MongoDB backend
- CORS configuration for cross-origin requests
- React Router v7 — `createBrowserRouter`, nested routes, `useNavigate`, `useLocation`
- Axios for all HTTP operations from the frontend
- Zustand store for global state management
- Context API alongside Zustand (both demonstrated)

### Tech Stack

**Backend:** Node.js, Express.js, MongoDB + Mongoose, dotenv, cors  
**Frontend:** React 19, Vite, React Router v7, Axios, Zustand, react-hook-form, Tailwind CSS v4

### Backend

```
Assignment/Backend/
├── server.js                   # Express app with CORS (*), mounts /employee-api
├── package.json
├── req.http                    # REST Client test requests
├── APIs/
│   └── EmployeeAPI.js          # CRUD routes for employees
└── models/
    └── EmployeeModel.js        # Employee schema: name, email, mobile, designation, companyName, isUserActive
```

**Employee Schema:**
```js
{
  name:        String (required),
  email:       String (required, unique),
  mobile:      Number (required),
  designation: String (required),
  companyName: String,
  isUserActive: Boolean (default: true)
}
```

**Employee API Routes** (`/employee-api`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employee-api/employees` | Get all employees |
| POST | `/employee-api/employees` | Create a new employee |
| PUT | `/employee-api/employees/:id` | Update employee by ID |
| DELETE | `/employee-api/employees/:id` | Delete employee by ID |

### Frontend

```
Assignment/Frontend/src/
├── App.jsx                         # React Router setup — nested under RootLayout
├── config.js                       # Backend base URL
├── main.jsx
├── store/
│   └── CounterStore.js             # Zustand store: counters + user object with actions
├── contexts/
│   └── ContextProvider.jsx         # Context API: two counters shared via Provider
└── components/
    ├── RootLayout.jsx              # Persistent layout wrapper with Header
    ├── Header.jsx                  # Navbar with route links
    ├── Home.jsx                    # Home page
    ├── ListOfEmps.jsx              # Fetches + displays all employees; edit/delete actions
    ├── Employee.jsx                # Single employee detail view (via router state)
    ├── CreateEmp.jsx               # Form to add a new employee
    ├── EditEmployee.jsx            # Form to edit an existing employee
    └── Test.jsx                    # Component sandbox
```

**Routing Overview:**
| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Home` | Landing page |
| `/create-emp` | `CreateEmp` | Add employee form |
| `/list` | `ListOfEmps` | All employees with edit/delete |
| `/employee` | `Employee` | Single employee detail |
| `/edit-employee` | `EditEmployee` | Edit employee form |

### How to Run

**Backend:**
```bash
cd Assignment/Backend
npm install
node server.js
```

Create `.env`:
```env
DB_URL=<MongoDB URI>
PORT=4000
```

**Frontend:**
```bash
cd Assignment/Frontend
npm install
npm run dev
```

Open `http://localhost:5173`