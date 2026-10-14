// Assignment 1: Variables, Data Types, and Console Operations (Interactive User Input)
const readline = require('node:readline');

function createPrompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity,
  });

  const iterator = rl[Symbol.asyncIterator]();

  return {
    async ask(questionText) {
      process.stdout.write(questionText);
      const { value, done } = await iterator.next();
      return done ? '' : value.trim();
    },
    close() {
      rl.close();
    },
  };
}

async function main() {
  const prompt = createPrompt();

  // 1. Get input details from the user
  const inputName = await prompt.ask('Enter your Name: ');
  const inputAge = await prompt.ask('Enter your Age: ');
  const inputEmployment = await prompt.ask('Are you employed? (true/false): ');
  const inputSkills = await prompt.ask('Enter your Skills (comma-separated, e.g. HTML, CSS, JavaScript): ');

  prompt.close();

  // 2. Declare variables using const, let, and var, converting them to their appropriate types
  const userName = inputName;
  let age = Number(inputAge);
  var isEmployed = inputEmployment.toLowerCase() === 'true';
  const skills = inputSkills ? inputSkills.split(',').map((skill) => skill.trim()) : [];

  // 3. Check types using typeof and log results
  console.log('\n--- Output ---');
  console.log(`Name: ${userName} (Type: ${typeof userName})`);
  console.log(`Age: ${age} (Type: ${typeof age})`);
  console.log(`Is Employed: ${isEmployed} (Type: ${typeof isEmployed})`);
  console.log(`Skills: ${JSON.stringify(skills).replaceAll(',', ', ')} (Type: ${typeof skills})`);
}

main();
