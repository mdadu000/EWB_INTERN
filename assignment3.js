// Assignment 3: Conditional Logic Implementation

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

async function evaluateScore() {
  // 1. Capture user input (defaults to 85 if left empty)
  const rawInput = await prompt("Enter numerical test score (press Enter for default 85):");
  const score = rawInput === "" ? 85 : Number(rawInput);

  // 2. Validate and evaluate test score using if...else statements
  let scoreTier;
  if (isNaN(score) || score < 0 || score > 100) {
    console.log("Invalid score. Please enter a number between 0 and 100.");
    if (rl) rl.close();
    if (typeof process !== 'undefined') {
      process.exit(1);
    }
    return;
  } else if (score >= 90) {
    scoreTier = "EXCELLENT";
  } else if (score >= 80) {
    scoreTier = "VERY_GOOD";
  } else if (score >= 70) {
    scoreTier = "GOOD";
  } else if (score >= 60) {
    scoreTier = "SATISFACTORY";
  } else {
    scoreTier = "FAIL";
  }

  // 3. Determine letter grade using a switch statement
  let grade;
  switch (scoreTier) {
    case "EXCELLENT":
      grade = "A";
      break;
    case "VERY_GOOD":
      grade = "B";
      break;
    case "GOOD":
      grade = "C";
      break;
    case "SATISFACTORY":
      grade = "D";
      break;
    default:
      grade = "F";
      break;
  }

  // 4. Determine pass or fail status using a ternary operator
  const status = score >= 40 ? "Passed" : "Failed";

  // 5. Output formatted results
  console.log(`\nScore: ${score}`);
  console.log(`Grade: ${grade}`);
  console.log(`Status: ${status}`);

  // 6. Cleanly close interface and exit
  if (rl) rl.close();
  if (typeof process !== 'undefined') {
    process.exit(0);
  }
}

evaluateScore();
