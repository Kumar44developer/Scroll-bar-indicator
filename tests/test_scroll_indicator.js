const assert = require('assert');

function calculateScrollPercentage(scrollY, scrollHeight, clientHeight) {
    const totalScrollableDistance = scrollHeight - clientHeight;
    if (totalScrollableDistance <= 0) return 0;
    
    const percentage = (scrollY / totalScrollableDistance) * 100;
    return Math.min(100, Math.max(0, parseFloat(percentage.toFixed(2))));
}

function formatPercentage(percentage) {
    return `${Math.round(percentage)}%`;
}

console.log("Running Scroll Bar Indicator Unit Tests...\n");

// Test 1: Baseline at top of page (scrollY = 0)
assert.strictEqual(calculateScrollPercentage(0, 2000, 800), 0);
assert.strictEqual(formatPercentage(0), "0%");
console.log("PASS: Top of page yields 0%");

// Test 2: Midpoint scrolling (scrollY = 600, total scrollable = 1200)
assert.strictEqual(calculateScrollPercentage(600, 2000, 800), 50);
assert.strictEqual(formatPercentage(50), "50%");
console.log("PASS: Midpoint scroll accurately calculates 50%");

// Test 3: Bottom of page (scrollY = totalScrollable)
assert.strictEqual(calculateScrollPercentage(1200, 2000, 800), 100);
assert.strictEqual(formatPercentage(100), "100%");
console.log("PASS: Bottom of page reaches exact 100%");

// Test 4: Overscroll handling (iOS / Mac elastic bounce)
assert.strictEqual(calculateScrollPercentage(-50, 2000, 800), 0);
assert.strictEqual(calculateScrollPercentage(1500, 2000, 800), 100);
console.log("PASS: Overscroll boundary safely clamped between 0% and 100%");

// Test 5: Non-scrollable viewport (scrollHeight <= clientHeight)
assert.strictEqual(calculateScrollPercentage(0, 800, 800), 0);
assert.strictEqual(calculateScrollPercentage(10, 600, 800), 0);
console.log("PASS: Non-scrollable contents avoid division by zero and return 0%");

console.log("\nAll 5 Scroll Indicator unit test suites passed successfully!");
