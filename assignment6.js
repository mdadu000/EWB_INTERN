// Assignment 6: Arrays, Objects, and Core Methods (Interactive Input)

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

async function main() {
  // 1. Capture products and prices from the user
  const rawCount = await prompt("How many products would you like to enter? (press Enter for default 3 products):");
  let products = [];

  if (rawCount === "") {
    // Default products if user presses Enter
    products = [
      { name: "Laptop", price: 800 },
      { name: "Mouse", price: 25 },
      { name: "Keyboard", price: 45 },
    ];
  } else {
    const count = Number(rawCount);
    for (let i = 1; i <= count; i++) {
      const name = await prompt(`Enter product ${i} name:`);
      const rawPrice = await prompt(`Enter product ${i} price ($):`);
      products.push({
        name: name || `Item ${i}`,
        price: Number(rawPrice) || 0,
      });
    }
  }

  // Capture filter price threshold
  const rawFilter = await prompt("Enter price threshold to filter items below (press Enter for default 50):");
  const filterThreshold = rawFilter === "" ? 50 : Number(rawFilter);

  // 2. Use forEach() to print each product
  console.log("\n-- All Products (forEach) --");
  products.forEach((product) => {
    console.log(`Item: ${product.name} - Price: $${product.price}`);
  });

  // 3. Use filter() to find items under the specified price threshold
  console.log(`\n-- Filtered Products (Price < $${filterThreshold}) --`);
  const filteredProducts = products.filter((product) => product.price < filterThreshold);
  console.log(filteredProducts);

  // 4. Use map() to create an array of formatted name-price strings
  console.log("\n-- Mapped Product Tags (map) --");
  const mappedTags = products.map(
    (product) => `${product.name.toUpperCase()} costs $${product.price}`
  );
  console.log(`[ ${mappedTags.map((tag) => `"${tag}"`).join(", ")} ]`);

  // 5. Cleanly close interface and exit
  if (rl) rl.close();
  if (typeof process !== "undefined") {
    process.exit(0);
  }
}

main();
