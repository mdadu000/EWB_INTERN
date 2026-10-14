// Assignment 2: Operators, Expressions, and Input Handling

// Prompt support for both Node.js (terminal) and Browser environments
let rl;
const prompt = typeof window !== 'undefined' && window.prompt
  ? window.prompt
  : (() => {
      const readline = require('node:readline');
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

async function calculateBill() {
  // 1. Capture user inputs using prompt()
  const rawBill = await prompt("Enter the bill amount ($):");
  const rawTip = await prompt("Enter the tip percentage (%):");

  // 2. Perform explicit type conversion using Number()
  const subtotal = Number(rawBill);
  const tipPercentage = Number(rawTip);

  // 3. Compute tip and total using arithmetic (*, /) and assignment (+=) operators
  const calculatedTip = (subtotal * tipPercentage) / 100;
  let totalAmount = subtotal;
  totalAmount += calculatedTip; // Compound assignment operator

  // 4. Log formatted strings matching expected output
  console.log(`\nSubtotal: $${subtotal}`);
  console.log(`Tip Percentage: ${tipPercentage}%`);
  console.log(`Calculated Tip: $${calculatedTip}`);
  console.log(`Total Amount to Pay: $${totalAmount}`);

  // 5. Cleanly close interface and exit
  if (rl) rl.close();
  if (typeof process !== 'undefined') {
    process.exit(0);
  }
}

calculateBill();
