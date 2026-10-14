# EWB Internship - JavaScript & Web Development Track

This repository contains all coursework assignments and the comprehensive Capstone Mini Project developed during the **EWB Internship Program**.

---

## 📁 Repository Structure

```text
EWB internship/
├── assignment1.js       # Assignment 1: Variables, Data Types & Syntax
├── assignment2.js       # Assignment 2: Operators & Expressions
├── assignment3.js       # Assignment 3: Conditional Logic & Switch Statements
├── assignment4.js       # Assignment 4: Loops & Iterations (While, For, Break/Continue)
├── assignment5.js       # Assignment 5: Functions, Parameters & Return Scope
├── assignment6.js       # Assignment 6: Array Manipulation & Object Modeling
└── capstone/            # Capstone Mini Project: Interactive Product Inventory & Analytics Dashboard
    ├── capstone.js      # Console-based interactive application (node capstone.js)
    ├── index.js         # Entry forwarder for CLI execution
    ├── index.html       # Tab-wise SaaS Dashboard (Products, Analytics, Console Verification)
    ├── styles.css       # SaaS Light-Themed CSS Design System
    ├── script.js        # Controller with localStorage persistence & analytics
    └── README.md        # Detailed Capstone documentation & requirements breakdown
```

---

## 🚀 Projects & Assignments Summary

### 1. `assignment1.js` - Variables & Data Types
- Demonstrates declaration and scope difference between `var`, `let`, and `const`.
- Covers primitive data types (`String`, `Number`, `Boolean`, `null`, `undefined`) and `typeof` inspection.

### 2. `assignment2.js` - Operators & Expressions
- Arithmetic, logical (`&&`, `||`, `!`), comparison (`===`, `!==`), and ternary operator implementations.

### 3. `assignment3.js` - Conditional Control Flow
- Decision-making using `if...else if...else` structures and multi-branch `switch...case` blocks.

### 4. `assignment4.js` - Loops & Flow Control
- Iteration patterns (`for`, `while`, `do...while`) with control flow modifiers (`break` and `continue`).

### 5. `assignment5.js` - Functions & Scope
- Regular function declarations, function expressions, and arrow functions with default parameters and return values.

### 6. `assignment6.js` - Arrays & Objects
- Dynamic object creation, array iteration methods (`forEach`), predicate filtering (`filter`), and transformations (`map`).

---

## 🏆 Capstone Mini Project

### **Interactive Product Inventory & Analytics Dashboard**
Combines all core JavaScript concepts into an integrated software program available in two interfaces:

1. **Console Terminal Simulation (`capstone/capstone.js`)**:
   - Interactive user input prompts via explicit conversion.
   - Array of objects inventory management (Laptop $800, Mouse $25, Monitor $150).
   - Control flow categorizations: **Budget** (< $100), **Standard** ($100–$499), **Premium** (≥ $500).
   - Financial calculation functions: `calculateTotalValue()` and `calculateTaxedEstimate()`.
   - Array methods: `forEach()` roster display, `filter()` affordable item isolation (< $200), and `map()` formatted report generation.

2. **Web SaaS Application (`capstone/index.html`)**:
   - **Tab-wise View**: Clean navigation across **Products**, **Financial Analytics & Dynamic Filters**, and **Live Terminal Output Simulation**.
   - **Persistent Storage**: All products added by the user persist across browser reloads via `localStorage`.
   - **Modern SaaS Aesthetics**: Minimalist product glyphs, clean monogram initials avatar, responsive layout, search and filtering tools, and interactive modal dialogs.

### How to Run:
- **CLI Mode**: Run `node capstone/capstone.js` or `node capstone/index.js`
- **Web App**: Open `capstone/index.html` in any web browser
