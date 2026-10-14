# 🚀 Capstone Mini Project: Interactive Product Inventory & Analytics Dashboard

A comprehensive, student-friendly JavaScript project built with **HTML, CSS, and vanilla JavaScript**. It demonstrates core JavaScript concepts through both an **interactive console-based program** and an **enhanced visual dashboard**.

---

## 📁 Project Structure

```text
capstone/
├── capstone.js    # Console-Based Implementation (prompt(), explicit conversion, exact output)
├── index.html     # Visual Dashboard User Interface (HTML5)
├── style.css      # Professional, Responsive Dashboard Styling (Vanilla CSS)
├── app.js         # Visual Dashboard Logic & State Management (Vanilla JS)
├── index.js       # Convenience entry-point (forwards to capstone.js)
└── README.md      # Project Documentation & Verification Guide
```

---

## 🎯 8 Essential Features & Implementation Details

| Feature | Concept Applied | How It Works |
| :--- | :--- | :--- |
| **1. Product Management** | Object Arrays, Validation | Starts with **Laptop ($800)** and **Mouse ($25)**. Allows adding products via name & price. Validates inputs against empty names and non-positive/NaN prices. |
| **2. Product Categories** | `if...else` & `switch` statements | Categorizes items into **Budget** (`< $100`), **Standard** (`$100 - $499`), and **Premium** (`≥ $500`) using `if...else` for tiers and `switch` for badge assignments. |
| **3. Inventory Dashboard** | Table Rendering, Summary Cards | Displays products in a responsive table with name, price, and category badges. Shows total product count and inventory valuation. |
| **4. Financial Analytics** | Regular & Arrow Functions, Scope | `calculateTotalValue()` calculates inventory value using a local function-scoped accumulator. `calculateAdjustedTotal()` uses an arrow function with configurable tax and discount rates. |
| **5. Product Filtering & Reports** | `forEach()`, `filter()`, `map()` | `forEach()` iterates over inventory to build the table roster; `filter()` extracts items under `$200`; `map()` creates an uppercase formatted report: `["LAPTOP: $800", ...]`. |
| **6. JavaScript Concepts** | Loops, `break`, `continue`, `prompt()` | Uses `continue` to skip invalid entries and `break` to cap search loops. The CLI version utilizes `prompt()` and explicit `Number()` conversion. |
| **7. Design & Usability** | Modern Responsive UI | Professional cards, clear typography, dynamic category preview as you type, and instant live recalculation when products are added. |
| **8. Testing & Delivery** | Exact Specification Verification | Verified: Laptop ($800) + Mouse ($25) + Monitor ($150) = **$975**. Affordable: **Mouse, Monitor**. Report: `["LAPTOP: $800", "MOUSE: $25", "MONITOR: $150"]`. |

---

## 🖥️ 1. How to Run the Console Implementation (`capstone.js`)

Run directly in your terminal using Node.js:

```bash
cd capstone
node capstone.js
```

### Expected Output:
```text
--- Initializing Inventory System ---
Enter new product name (press Enter for "Monitor"): Monitor
Enter product price in $ (press Enter for "150"): 150
[Prompt executed: User adds "Monitor" at "$150"]

--- Processing Inventory Roster (forEach) ---
* Item: Laptop ($800) -> Category: Premium
* Item: Mouse ($25) -> Category: Budget
* Item: Monitor ($150) -> Category: Standard

--- Financial Analytics ---
Total Inventory Value: $975
Filtered Affordable Items (Under $200): ["Mouse", "Monitor"]
Formatted Report List: ["LAPTOP: $800", "MOUSE: $25", "MONITOR: $150"]
```

*(Pressing `Enter` at both prompts automatically loads the default values: "Monitor" and 150).*

---

## 🌐 2. How to Run the Visual Dashboard (`index.html`)

1. Open [`capstone/index.html`](index.html) in your web browser (double-click the file or right-click and choose **Open with Browser**).
2. **Features to Test**:
   - **Pre-loaded Products**: Starts with Laptop ($800) and Mouse ($25).
   - **Quick Sample Button**: Click **"Load Monitor ($150)"** to immediately test the 3-item test case yielding a total inventory value of **$975.00**.
   - **Add Products**: Use the left form to add custom items. Note the live category badge updating as you type.
   - **Financial Parameters**: Adjust Tax Rate (default 8%) and Discount Rate to watch the adjusted net total update in real-time.
   - **Affordable Items**: Observe the `< $200` chip list dynamically reflecting affordable items (`Mouse`, `Monitor`).
   - **Console Verification Panel**: Scroll down to view the live embedded console output matching `node capstone.js`.
