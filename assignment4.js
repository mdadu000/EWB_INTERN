// Assignment 4: Loop Control Structures (Dynamic Input)

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

async function runLoops() {
  // 1. Accept any number from the user (defaults to 5 if left empty)
  const rawInput = await prompt("Enter a number for the multiplication table (press Enter for default 5):");
  const baseNumber = rawInput === "" ? 5 : Number(rawInput);

  if (isNaN(baseNumber)) {
    console.log("Invalid input. Please enter a valid number.");
    if (rl) rl.close();
    if (typeof process !== 'undefined') process.exit(1);
    return;
  }

  // Part 1: For loop to print multiplication table of the chosen number up to 5
  console.log(`\n-- Multiplication Table of ${baseNumber} --`);
  for (let i = 1; i <= 5; i++) {
    console.log(`${baseNumber} x ${i} = ${baseNumber * i}`);
  }

  // Part 2: While loop with break to find the first number > 10 that is divisible by baseNumber
  console.log(`\n-- First number > 10 divisible by ${baseNumber} --`);
  let num = 11;
  while (true) {
    if (num % baseNumber === 0) {
      console.log(`Found: ${num}`);
      break; // Exit loop once the condition is met
    }
    num++;
  }

  // Part 3: Do...while loop that skips numbers using continue (skips number 3)
  console.log("\n-- do...while Loop (Skipping 3 using continue) --");
  let count = 0;
  do {
    count++;
    if (count === 3) {
      continue; // Skip the rest of this iteration when count is 3
    }
    console.log(`Number: ${count}`);
  } while (count < 5);

  // Cleanly close interface and exit
  if (rl) rl.close();
  if (typeof process !== 'undefined') {
    process.exit(0);
  }
}

runLoops();
