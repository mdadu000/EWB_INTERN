// Assignment 5: Function Architecture and Scope (Interactive Input)

// Prompt helper supporting both Node.js (terminal) and Browser environments
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

// 1. Standard function with default parameter values
function calculateAreaStandard(length = 5, width = 4) {
  return length * width;
}

// 2. Arrow function with default parameter values
const calculateAreaArrow = (length = 5, width = 4) => length * width;

// 3. Demonstrating Scope Limits (Block Scope vs Function Scope)
function demonstrateScope() {
  // Block Scope: variables declared with let/const inside {} are not accessible outside
  {
    let blockVar = "I exist only inside this block";
  }

  try {
    // Attempting to access blockVar outside its block
    console.log(blockVar);
  } catch (error) {
    console.log(`Scope Test Error: ${error.name}: ${error.message} (when accessed outside block)`);
  }
}

async function main() {
  // Capture user input for custom length and width (default to 10 and 3 if left empty)
  const rawLength = await prompt("Enter custom length (press Enter for default 10):");
  const rawWidth = await prompt("Enter custom width (press Enter for default 3):");

  const customLength = rawLength === "" ? 10 : Number(rawLength);
  const customWidth = rawWidth === "" ? 3 : Number(rawWidth);

  // 1. Standard Function Area using default values (no arguments passed)
  console.log(`\nStandard Function Area (Default 5x4): ${calculateAreaStandard()}`);

  // 2. Arrow Function Area using custom input values
  console.log(`Arrow Function Area (Custom ${customLength}x${customWidth}): ${calculateAreaArrow(customLength, customWidth)}`);

  // 3. Demonstrate Scope Limits
  demonstrateScope();

  // Cleanly close interface and exit
  if (rl) rl.close();
  if (typeof process !== 'undefined') {
    process.exit(0);
  }
}

main();
