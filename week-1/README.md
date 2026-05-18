# Week 1 — JavaScript Fundamentals & Array Manipulation

**Dates:** 18 Feb 2026 – 19 Feb 2026 | **Roll No:** 24EG110A24

---

## Overview

Week 1 covers the fundamentals of JavaScript: writing reusable functions, conditional logic, array traversal, and mutating arrays of objects. All assignments run in Node.js — no dependencies required.

---

## Day 1 — 18 Feb 2026

### Topics Covered
- Functions with parameters and return values
- Conditional logic (`if / else if / else`)
- Array traversal with `for` loops
- Finding max, min, sum, and searching in arrays

### Project Structure

```
Day-1(18-02-2026)/
├── BigNumberOfTwo.js           # Compare two numbers inline, log the larger
├── BigNumberOfThree.js         # Compare three numbers using if-else chain
├── FindBigNumberFunction.js    # Reusable function: returns largest of three args
├── SumOfMarksInArray.js        # Iterates marks array and sums all values
├── SmallestMarkInArray.js      # Finds the minimum value in a marks array
├── ArraySumFunction.js         # Reusable function: receives any array, returns sum
└── SearchElementInArray.js     # Searches array for a key, returns index or "Not found"
```

### Key Functions

```js
// Find the largest of three numbers
function findBigNumber(a, b, c) {
  if (a > b && a > c) return a
  else if (b > c)     return b
  else                return c
}

// Search for an element, return its index or "Not found"
function searchElement(arr, key) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === key) return i
  }
  return "Not found"
}
```

---

## Day 2 — 19 Feb 2026

### Topics Covered
- Arrays of objects (employee records)
- `splice()` for inserting, removing, and updating elements
- Iterating over objects with `for...in`

### Project Structure

```
Day-2(19-02-2026)/
└── EmployeeArrayOperations.js  # Three splice operations on an employee array
```

### Data Structure & Operations

```js
const employees = [
  { eno: 101, name: "Ravi",  marks: [78, 82, 91] },
  { eno: 102, name: "Bhanu", marks: [65, 70, 68] },
  { eno: 103, name: "Sneha", marks: [88, 92, 95] },
  { eno: 104, name: "Kiran", marks: [55, 60, 58] },
  { eno: 105, name: "Anitha",marks: [90, 85, 87] }
]

// 1. Insert new employee at index 1
employees.splice(1, 0, { eno: 106, name: 'Sandeep', marks: [90, 83, 78] })

// 2. Remove the employee named "Kiran"
// 3. Update Sneha's last mark: 95 → 78
```

---

## How to Run

```bash
node <filename>.js
```

No `npm install` required — pure Node.js.