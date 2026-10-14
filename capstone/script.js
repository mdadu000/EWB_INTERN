/**
 * Capstone Mini Project: Interactive Product Inventory & Analytics Dashboard
 * Real SaaS Tabbed Web Application Engine (Tab-wise Interface, Persistent Storage, No Photos)
 */

// ==========================================
// 1. Storage Keys & Default State
// ==========================================

const STORAGE_KEY_INVENTORY = "nexus_saas_inventory_items_v1";
const STORAGE_KEY_FILTER_LIMIT = "nexus_saas_filter_limit_v1";
const STORAGE_KEY_AUTH = "nexus_saas_auth_user_v1";
const STORAGE_KEY_ACTIVE_TAB = "nexus_saas_active_tab_v1";

// Default initial items matching the assignment requirements
const DEFAULT_INVENTORY = [
  {
    name: "Laptop",
    price: 800,
    sku: "NEX-8001",
    status: "In Stock",
    addedBy: "System"
  },
  {
    name: "Mouse",
    price: 25,
    sku: "NEX-2502",
    status: "In Stock",
    addedBy: "System"
  },
  {
    name: "Monitor",
    price: 150,
    sku: "NEX-1503",
    status: "In Stock",
    addedBy: "User Input"
  }
];

const DEFAULT_FILTER_LIMIT = 200;

// Application State (Loaded from localStorage)
let inventory = loadInventory();
let filterLimit = loadFilterLimit();
let currentUser = loadAuthUser();
let lastAddedItem = { name: "Monitor", price: 150 };

// ==========================================
// 2. Storage Helpers (Data Persistence)
// ==========================================

function loadInventory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INVENTORY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Storage read error:", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_INVENTORY));
}

function saveInventory() {
  try {
    localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(inventory));
  } catch (e) {
    console.error("Storage write error:", e);
  }
}

function loadFilterLimit() {
  const val = Number(localStorage.getItem(STORAGE_KEY_FILTER_LIMIT));
  return !isNaN(val) && val > 0 ? val : DEFAULT_FILTER_LIMIT;
}

function saveFilterLimit(limit) {
  try {
    localStorage.setItem(STORAGE_KEY_FILTER_LIMIT, String(limit));
  } catch (e) {
    console.error("Storage write error:", e);
  }
}

function loadAuthUser() {
  const val = localStorage.getItem(STORAGE_KEY_AUTH);
  if (val === "LOGGED_OUT") return null;
  return val || "Adnan";
}

function saveAuthUser(username) {
  try {
    localStorage.setItem(STORAGE_KEY_AUTH, username);
  } catch (e) {
    console.error("Storage write error:", e);
  }
}

// ==========================================
// 3. Control Flow & Evaluation (if...else & switch)
// ==========================================

/**
 * Requirement 2: Evaluates price using if...else and switch blocks
 * @param {number} price 
 * @returns {{ tier: string, badge: string, cssClass: string, glyphClass: string }}
 */
function determineCategory(price) {
  // if...else statements to categorize numerical price
  let tier;
  if (price >= 500) {
    tier = "PREMIUM_TIER";
  } else if (price >= 100) {
    tier = "STANDARD_TIER";
  } else {
    tier = "BUDGET_TIER";
  }

  // switch statement to assign badge text & styling
  let badge;
  let cssClass;
  let glyphClass;

  switch (tier) {
    case "PREMIUM_TIER":
      badge = "Premium";
      cssClass = "pill-premium";
      glyphClass = "glyph-premium";
      break;
    case "STANDARD_TIER":
      badge = "Standard";
      cssClass = "pill-standard";
      glyphClass = "glyph-standard";
      break;
    case "BUDGET_TIER":
    default:
      badge = "Budget";
      cssClass = "pill-budget";
      glyphClass = "glyph-budget";
      break;
  }

  return { tier, badge, cssClass, glyphClass };
}

/**
 * Helper to generate modern vector glyphs for category icons (NO PHOTOS)
 */
function getProductGlyphSvg(badge) {
  if (badge === "Premium") {
    // Star / Crown glyph for Premium items
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>`;
  } else if (badge === "Standard") {
    // Screen / Workstation glyph for Standard items
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="8" y1="21" x2="16" y2="21"></line>
      <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>`;
  } else {
    // Tag / Package glyph for Budget items
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
      <line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>`;
  }
}

// ==========================================
// 4. Loops & Flow Control: Search with break/continue
// ==========================================

/**
 * Requirement 3: Searches roster using loops with continue & break
 * @param {Array} items 
 * @param {string} query 
 * @returns {Array}
 */
function searchRosterWithControlFlow(items, query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return items;

  const results = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    // continue statement: skips invalid or non-matching entries
    if (!item.name || !item.name.toLowerCase().includes(q)) {
      continue;
    }

    results.push(item);

    // break statement: safety cap
    if (results.length >= 100) {
      break;
    }
  }

  return results;
}

// ==========================================
// 5. Functions & Scope: Regular & Arrow Functions
// ==========================================

/**
 * Requirement 4a: Standard function to compute total value
 * Encapsulates function-scoped accumulator variable
 */
function calculateTotalValue(items) {
  let total = 0; // Function-scoped variable
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

/**
 * Requirement 4b: Arrow function with default parameter
 * Computes taxed total estimate
 */
const calculateTaxedEstimate = (subtotal, taxRate = 0.08) => {
  return subtotal + (subtotal * taxRate);
};

// ==========================================
// 6. DOM Elements
// ==========================================

// Views
const authSection = document.getElementById("auth-section");
const dashboardSection = document.getElementById("dashboard-section");

// Auth
const loginForm = document.getElementById("login-form");
const loginUsernameInput = document.getElementById("login-username");
const loginPasswordInput = document.getElementById("login-password");
const btnTogglePwd = document.getElementById("btn-toggle-pwd");
const fillDemoBtn = document.getElementById("fill-demo-btn");
const userDisplayName = document.getElementById("user-display-name");
const userAvatarInitial = document.getElementById("user-avatar-initial");
const btnLogoutSidebar = document.getElementById("btn-logout-sidebar");

// Tab Navigation Elements
const navTabButtons = document.querySelectorAll(".nav-tab-btn[data-tab]");
const tabPanes = document.querySelectorAll(".tab-pane");
const headerActiveTabIndicator = document.getElementById("header-active-tab-indicator");

// Section 1: Products
const productsContainer = document.getElementById("products-cards-container");
const filterSearchInput = document.getElementById("filter-search-input");
const topSearchInput = document.getElementById("top-search-input");
const filterCategorySelect = document.getElementById("filter-category-select");
const filterSortSelect = document.getElementById("filter-sort-select");
const btnExportJson = document.getElementById("btn-export-json");
const btnOpenAddModal = document.getElementById("btn-open-add-modal");

// Section 2: Financial Analytics & Filters
const btnOpenFilterModal = document.getElementById("btn-open-filter-modal");
const currentThresholdLabel = document.getElementById("current-threshold-label");
const kpiTotalVal = document.getElementById("kpi-total-val");
const kpiItemsCount = document.getElementById("kpi-items-count");
const kpiAffordableCount = document.getElementById("kpi-affordable-count");
const kpiTaxedVal = document.getElementById("kpi-taxed-val");
const affordableKpiTitle = document.getElementById("affordable-kpi-title");
const filterRuleLabel = document.getElementById("filter-rule-label");
const affordableBadgeCount = document.getElementById("affordable-badge-count");
const affordableChipsContainer = document.getElementById("affordable-chips-container");
const reportCodeContainer = document.getElementById("report-code-container");
const btnCopyMapReport = document.getElementById("btn-copy-map-report");

// Section 3: Console Terminal Simulation
const terminalSimulationText = document.getElementById("terminal-simulation-text");
const btnReSimulate = document.getElementById("btn-re-simulate");

// Modals
const modalAddProduct = document.getElementById("modal-add-product");
const btnCloseAddModal = document.getElementById("btn-close-add-modal");
const btnCancelAddModal = document.getElementById("btn-cancel-add-modal");
const modalProductForm = document.getElementById("modal-product-form");
const newProductName = document.getElementById("new-product-name");
const newProductPrice = document.getElementById("new-product-price");
const modalCatPreview = document.getElementById("modal-cat-preview");

const modalFilterThreshold = document.getElementById("modal-filter-threshold");
const btnCloseFilterModal = document.getElementById("btn-close-filter-modal");
const btnCancelFilterModal = document.getElementById("btn-cancel-filter-modal");
const btnApplyFilterModal = document.getElementById("btn-apply-filter-modal");
const inputFilterLimitVal = document.getElementById("input-filter-limit-val");

const btnResetDefaultsSidebar = document.getElementById("btn-reset-defaults-sidebar");
const toast = document.getElementById("toast");

// ==========================================
// 7. Tab-Wise Navigation Controller
// ==========================================

/**
 * Switches the active tab smoothly and updates header badge
 * @param {string} tabId 
 */
function switchTab(tabId) {
  if (!tabId) return;

  // Update nav buttons
  navTabButtons.forEach(btn => {
    if (btn.getAttribute("data-tab") === tabId) {
      btn.classList.add("active");
      if (headerActiveTabIndicator) {
        const titleSpan = btn.querySelector("span");
        headerActiveTabIndicator.textContent = titleSpan ? titleSpan.textContent : "Dashboard";
      }
    } else {
      btn.classList.remove("active");
    }
  });

  // Update tab pane visibility
  tabPanes.forEach(pane => {
    if (pane.id === tabId) {
      pane.classList.add("active");
    } else {
      pane.classList.remove("active");
    }
  });

  // Save active tab choice
  try {
    sessionStorage.setItem(STORAGE_KEY_ACTIVE_TAB, tabId);
  } catch (e) {
    // ignore
  }

  // Refresh target tab's dynamic data
  if (tabId === "tab-products") {
    renderSection1Products();
  } else if (tabId === "tab-analytics") {
    renderSection2Analytics();
  } else if (tabId === "tab-console") {
    renderSection3ConsoleSimulation();
  }
}

// Bind tab switching click listeners
navTabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const tabId = btn.getAttribute("data-tab");
    switchTab(tabId);
  });
});

// ==========================================
// 8. Authentication State Manager
// ==========================================

function checkAuth() {
  if (currentUser) {
    authSection.style.display = "none";
    dashboardSection.style.display = "flex";
    
    // Set user monogram and name (NO USER PHOTOS)
    userDisplayName.textContent = currentUser;
    if (userAvatarInitial) {
      userAvatarInitial.textContent = currentUser.trim().charAt(0).toUpperCase() || "A";
    }

    // Restore previous tab or default to products
    const savedTab = sessionStorage.getItem(STORAGE_KEY_ACTIVE_TAB) || "tab-products";
    switchTab(savedTab);
    renderAll();
  } else {
    authSection.style.display = "flex";
    dashboardSection.style.display = "none";
  }
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = loginUsernameInput.value.trim();
  if (!username) {
    showToast("Please enter a username.");
    return;
  }
  currentUser = username;
  saveAuthUser(currentUser);
  checkAuth();
  showToast(`Welcome, ${currentUser}!`);
});

btnLogoutSidebar.addEventListener("click", () => {
  localStorage.setItem(STORAGE_KEY_AUTH, "LOGGED_OUT");
  currentUser = null;
  checkAuth();
  showToast("Logged out successfully.");
});

btnTogglePwd.addEventListener("click", () => {
  loginPasswordInput.type = loginPasswordInput.type === "password" ? "text" : "password";
});

fillDemoBtn.addEventListener("click", () => {
  loginUsernameInput.value = "adnan";
  loginPasswordInput.value = "password123";
  showToast("Demo credentials loaded!");
});

// ==========================================
// 9. Render Engine: Products, Analytics, Console
// ==========================================

function renderAll() {
  renderSection1Products();
  renderSection2Analytics();
  renderSection3ConsoleSimulation();
}

/**
 * TAB 1: PRODUCTS INVENTORY (Products & Add Product)
 * Clean SaaS Cards Grid - NO PHOTOS OR AVATARS
 * Leverages Array.prototype.forEach() to render product cards
 */
function renderSection1Products() {
  const searchQuery = (filterSearchInput.value || topSearchInput.value || "").trim();
  const categoryFilter = filterCategorySelect.value;
  const sortMode = filterSortSelect.value;

  // Filter using control flow loop
  let filtered = searchRosterWithControlFlow(inventory, searchQuery);

  // Category filter
  if (categoryFilter !== "ALL") {
    filtered = filtered.filter(item => {
      const { badge } = determineCategory(item.price);
      return badge === categoryFilter;
    });
  }

  // Sorting
  if (sortMode === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortMode === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortMode === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  productsContainer.innerHTML = "";

  if (filtered.length === 0) {
    productsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; color: var(--text-muted); background: #fff; border-radius: 18px; border: 1px solid var(--border-light);">
        <p style="font-size: 1.15rem; font-weight: 700; color: var(--text-dark);">No products match your criteria</p>
        <p style="font-size: 0.88rem; margin-top: 0.4rem;">Try adjusting search terms or click "+ Add Product" to create one.</p>
      </div>
    `;
    return;
  }

  // Requirement 5a: forEach() to process and render visible items
  filtered.forEach((product) => {
    const globalIndex = inventory.indexOf(product);
    const { badge, cssClass, glyphClass } = determineCategory(product.price);
    const glyphSvg = getProductGlyphSvg(badge);
    const sku = product.sku || `NEX-${(globalIndex + 1).toString().padStart(4, "0")}`;
    const addedBy = product.addedBy || currentUser || "Adnan";

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="card-header-row">
        <div class="product-glyph-box ${glyphClass}" title="${badge} Category">
          ${glyphSvg}
        </div>
        <div class="card-actions-right">
          <span class="cat-pill ${cssClass}">${badge}</span>
          <button class="btn-card-delete" title="Delete Product" onclick="deleteProduct(${globalIndex})">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="card-body">
        <div class="card-price-display">$${product.price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</div>
        <h3 class="card-title-text" title="${escapeHtml(product.name)}">${escapeHtml(product.name)}</h3>
        <p class="card-meta-desc">Category tier: <strong>${badge}</strong> &bull; SKU: <strong>${sku}</strong></p>
      </div>

      <div class="card-footer-meta">
        <span class="stock-indicator">
          <span class="stock-dot"></span>
          Active Inventory
        </span>
        <span>Added by: <strong>${escapeHtml(addedBy)}</strong></span>
      </div>
    `;

    productsContainer.appendChild(card);
  });
}

/**
 * TAB 2: FINANCIAL ANALYTICS & DYNAMIC FILTER CONTROL
 * Implements calculateTotalValue, calculateTaxedEstimate, filter(), and map()
 */
function renderSection2Analytics() {
  currentThresholdLabel.textContent = `$${filterLimit}`;
  affordableKpiTitle.textContent = `Affordable Items (< $${filterLimit})`;
  filterRuleLabel.innerHTML = `Items with price &lt; $${filterLimit}`;

  // 1. Total value using standard function
  const totalValue = calculateTotalValue(inventory);
  const taxedEstimate = calculateTaxedEstimate(totalValue);

  kpiTotalVal.textContent = `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  kpiItemsCount.textContent = `${inventory.length} items`;
  kpiTaxedVal.textContent = `$${taxedEstimate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // 2. Requirement 5b: filter() to isolate affordable items under dynamic threshold
  const affordableItems = inventory
    .filter(item => item.price < filterLimit)
    .map(item => item.name);

  kpiAffordableCount.textContent = `${affordableItems.length} items`;
  affordableBadgeCount.textContent = `${affordableItems.length} Found`;

  affordableChipsContainer.innerHTML = "";
  if (affordableItems.length === 0) {
    affordableChipsContainer.innerHTML = `<span style="font-size: 0.85rem; color: var(--text-muted);">No products found under $${filterLimit}</span>`;
  } else {
    affordableItems.forEach(name => {
      const chip = document.createElement("span");
      chip.className = "chip-item";
      chip.textContent = name;
      affordableChipsContainer.appendChild(chip);
    });
  }

  // 3. Requirement 5c: map() to format transformed report list
  const formattedReport = inventory.map(
    item => `"${item.name.toUpperCase()}: $${item.price}"`
  );
  reportCodeContainer.textContent = `[ ${formattedReport.join(", ")} ]`;
}

/**
 * TAB 3: EXACT CONSOLE OUTPUT SIMULATION
 * Mirrors the exact character-by-character output expected by node capstone.js
 */
function renderSection3ConsoleSimulation() {
  let rosterLog = "";
  inventory.forEach(item => {
    const { badge } = determineCategory(item.price);
    rosterLog += `* Item: ${item.name} ($${item.price}) -> Category: ${badge}\n`;
  });

  const affordableItems = inventory
    .filter(item => item.price < filterLimit)
    .map(item => item.name);

  const affordableJson = JSON.stringify(affordableItems).replaceAll(',', ', ');

  const formattedReport = inventory.map(
    item => `"${item.name.toUpperCase()}: $${item.price}"`
  );
  const reportJson = `[ ${formattedReport.join(", ")} ]`;

  const totalValue = calculateTotalValue(inventory);

  const consoleOutput = `--- Initializing Inventory System ---
[Prompt executed: User adds "${lastAddedItem.name}" at "$${lastAddedItem.price}"]

--- Processing Inventory Roster (forEach) ---
${rosterLog.trim()}

--- Financial Analytics ---
Total Inventory Value: $${totalValue}
Filtered Affordable Items (Under $${filterLimit}): ${affordableJson}
Formatted Report List: ${reportJson}`;

  terminalSimulationText.textContent = consoleOutput;
}

// ==========================================
// 10. Interactive Modals & Actions
// ==========================================

// Add Product Modal Handlers
btnOpenAddModal.addEventListener("click", () => {
  newProductName.value = "";
  newProductPrice.value = "";
  modalCatPreview.textContent = "Standard ($100 - $499)";
  modalCatPreview.className = "cat-pill pill-standard";
  modalAddProduct.style.display = "flex";
  newProductName.focus();
});

btnCloseAddModal.addEventListener("click", () => modalAddProduct.style.display = "none");
btnCancelAddModal.addEventListener("click", () => modalAddProduct.style.display = "none");

// Dynamic preview inside modal
newProductPrice.addEventListener("input", (e) => {
  const val = Number(e.target.value);
  if (!isNaN(val) && val > 0) {
    const { badge, cssClass } = determineCategory(val);
    modalCatPreview.textContent = `${badge} (${val >= 500 ? '≥ $500' : val >= 100 ? '$100 - $499' : '< $100'})`;
    modalCatPreview.className = `cat-pill ${cssClass}`;
  } else {
    modalCatPreview.textContent = "Standard ($100 - $499)";
    modalCatPreview.className = "cat-pill pill-standard";
  }
});

// Submit Add Product Form
modalProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = newProductName.value.trim();
  const price = Number(newProductPrice.value);

  // Requirement 2: if...else validation
  if (!name || isNaN(price) || price <= 0) {
    showToast("Please enter a valid product name and positive price.");
    return;
  }

  const { badge } = determineCategory(price);
  const newItem = {
    name,
    price,
    sku: `NEX-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "In Stock",
    addedBy: currentUser || "Adnan"
  };

  // Add to inventory array and persist to localStorage
  inventory.push(newItem);
  lastAddedItem = { name, price };
  saveInventory();

  modalAddProduct.style.display = "none";
  renderAll();
  showToast(`Added "${name}" ($${price}) to inventory! Saved in storage.`);
});

// Delete Product
window.deleteProduct = function(index) {
  if (inventory.length <= 1) {
    showToast("Cannot delete: Please keep at least 1 item in roster.");
    return;
  }
  const removed = inventory.splice(index, 1);
  saveInventory();
  renderAll();
  showToast(`Removed "${removed[0].name}" from inventory.`);
};

// Filter Limit Threshold Modal Handlers
btnOpenFilterModal.addEventListener("click", () => {
  inputFilterLimitVal.value = filterLimit;
  modalFilterThreshold.style.display = "flex";
  inputFilterLimitVal.focus();
});

btnCloseFilterModal.addEventListener("click", () => modalFilterThreshold.style.display = "none");
btnCancelFilterModal.addEventListener("click", () => modalFilterThreshold.style.display = "none");

btnApplyFilterModal.addEventListener("click", () => {
  const val = Number(inputFilterLimitVal.value);
  if (isNaN(val) || val <= 0) {
    showToast("Please enter a valid positive number for the filter limit.");
    return;
  }
  filterLimit = val;
  saveFilterLimit(filterLimit);
  modalFilterThreshold.style.display = "none";
  renderAll();
  showToast(`Affordable filter limit updated to $${filterLimit}! Saved in storage.`);
});

// Close modals when clicking backdrop
[modalAddProduct, modalFilterThreshold].forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});

// Reset to Defaults (Restores Laptop $800, Mouse $25, Monitor $150)
btnResetDefaultsSidebar.addEventListener("click", () => {
  inventory = JSON.parse(JSON.stringify(DEFAULT_INVENTORY));
  filterLimit = DEFAULT_FILTER_LIMIT;
  saveInventory();
  saveFilterLimit(filterLimit);

  lastAddedItem = { name: "Monitor", price: 150 };
  filterSearchInput.value = "";
  topSearchInput.value = "";
  filterCategorySelect.value = "ALL";
  filterSortSelect.value = "default";

  renderAll();
  showToast("Inventory restored to initial assignment defaults.");
});

// Copy Transformed Map Report
btnCopyMapReport.addEventListener("click", () => {
  const text = reportCodeContainer.textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast("Formatted report copied to clipboard!");
  }).catch(() => {
    showToast("Failed to copy report.");
  });
});

// Re-simulate button
btnReSimulate.addEventListener("click", () => {
  renderSection3ConsoleSimulation();
  showToast("Console simulation refreshed.");
});

// Search & Filter event bindings
[filterSearchInput, topSearchInput].forEach(input => {
  input.addEventListener("input", () => {
    if (input === topSearchInput) filterSearchInput.value = topSearchInput.value;
    else topSearchInput.value = filterSearchInput.value;
    renderSection1Products();
  });
});

filterCategorySelect.addEventListener("change", renderSection1Products);
filterSortSelect.addEventListener("change", renderSection1Products);

// Export JSON
btnExportJson.addEventListener("click", () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inventory, null, 2));
  const dlAnchorElem = document.createElement("a");
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "inventory_report.json");
  dlAnchorElem.click();
  showToast("Inventory exported to JSON.");
});

// Toast notification helper
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// XSS Sanitizer
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Initial Boot
checkAuth();
