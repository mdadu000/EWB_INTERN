// ==============================================================================
// Capstone Mini Project: Interactive Product Inventory & Analytics Dashboard
// File: capstone.js (Console-Based Implementation)
// ==============================================================================

const readline = require('node:readline');

// Prompt helper supporting both Node.js (CLI terminal) and Browser environments
let rl;
const prompt = typeof window !== 'undefined' && window.prompt
  ? window.prompt
  : (() => {
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity,
      });
      const it = rl[Symbol.asyncIterator]();
      return async function prompt(query) {
        process.stdout.write(query + ' ');
        const { value } = await it.next();
        return value ? value.trim() : '';
      };
    })();

// ==========================================
// 1. Data & Input Initialization
// ==========================================
// Start with Laptop ($800) and Mouse ($25)
const inventory = [
  { name: "Laptop", price: 800 },
  { name: "Mouse", price: 25 },
];

// ==========================================
// 2. Control Flow: if...else and switch
// ==========================================
// Automatically categorize products as Budget, Standard, or Premium
function determineCategory(price) {
  // if...else statement to classify price tier
  let tier;
  if (price >= 500) {
    tier = "TIER_PREMIUM";
  } else if (price >= 100) {
    tier = "TIER_STANDARD";
  } else {
    tier = "TIER_BUDGET";
  }

  // switch statement to assign category label
  let category;
  switch (tier) {
    case "TIER_PREMIUM":
      category = "Premium";
      break;
    case "TIER_STANDARD":
      category = "Standard";
      break;
    case "TIER_BUDGET":
    default:
      category = "Budget";
      break;
  }
  return category;
}

// ==========================================
// 3. Loops & Flow Control: break and continue
// ==========================================
// Demonstrates searching/auditing array with continue and break
function auditInventory(items) {
  let auditedCount = 0;
  for (let i = 0; i < items.length; i++) {
    // continue: skip missing or invalid items
    if (!items[i] || !items[i].name || items[i].price <= 0) {
      continue;
    }
    auditedCount++;
    // break: stop early if limit reached
    if (auditedCount >= 100) {
      break;
    }
  }
  return auditedCount;
}

// ==========================================
// 4. Functions & Scope: Regular & Arrow Functions
// ==========================================
// Regular function demonstrating local variable scoping
function calculateTotalValue(items) {
  let total = 0; // Local function-scoped variable
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

// Arrow function with configurable parameters and default values
const calculateAdjustedTotal = (baseTotal, taxRate = 0.08, discountRate = 0.0) => {
  const taxAmount = baseTotal * taxRate;
  const discountAmount = baseTotal * discountRate;
  return baseTotal + taxAmount - discountAmount;
};

// ==========================================
// Main Console Program Execution
// ==========================================
async function main() {
  console.log("--- Initializing Inventory System ---");

  // Prompt user to add a new product (defaults to Monitor at $150 if left empty)
  const inputName = await prompt('Enter new product name (press Enter for "Monitor"):');
  const inputPrice = await prompt('Enter product price in $ (press Enter for "150"):');

  // Explicit type conversion
  const newName = inputName === "" ? "Monitor" : inputName;
  const newPrice = inputPrice === "" ? 150 : Number(inputPrice);

  // Validation using if...else
  if (!newName.trim() || isNaN(newPrice) || newPrice <= 0) {
    console.log("Error: Please provide a valid product name and a positive price.");
    if (rl) rl.close();
    if (typeof process !== "undefined") process.exit(1);
    return;
  }

  // Store inside inventory array
  inventory.push({ name: newName, price: newPrice });
  console.log(`[Prompt executed: User adds "${newName}" at "$${newPrice}"]`);

  // Run audit loop
  auditInventory(inventory);

  // ==========================================
  // 5. Array Methods & Iteration
  // ==========================================

  // a) forEach(): Process and print each product with category badge
  console.log("\n--- Processing Inventory Roster (forEach) ---");
  inventory.forEach((item) => {
    const category = determineCategory(item.price);
    console.log(`* Item: ${item.name} ($${item.price}) -> Category: ${category}`);
  });

  // b) Financial Analytics
  console.log("\n--- Financial Analytics ---");
  const totalValue = calculateTotalValue(inventory);
  console.log(`Total Inventory Value: $${totalValue}`);

  // c) filter(): Find affordable items under $200
  const affordableItems = inventory
    .filter((item) => item.price < 200)
    .map((item) => item.name);
  console.log(`Filtered Affordable Items (Under $200): ${JSON.stringify(affordableItems).replaceAll(',', ', ')}`);

  // d) map(): Generate uppercase formatted report
  const formattedReport = inventory.map(
    (item) => `${item.name.toUpperCase()}: $${item.price}`
  );
  console.log(`Formatted Report List: ${JSON.stringify(formattedReport).replaceAll(',', ', ')}`);

  // Cleanly close interface and exit
  if (rl) rl.close();
  if (typeof process !== "undefined") {
    process.exit(0);
  }
}

main();
