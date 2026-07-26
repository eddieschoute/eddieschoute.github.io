const { performance } = require('perf_hooks');

// Mock a simplified DOM
class Element {
    constructor(isCollapser = false) {
        this.isCollapser = isCollapser;
        this.parentElement = null;
        this.children = [];
    }

    appendChild(child) {
        this.children.push(child);
        child.parentElement = this;
    }

    querySelector(selector) {
        if (selector === '.collapser') {
            // Simulate the query cost by iterating
            for (let i = 0; i < this.children.length; i++) {
                if (this.children[i].isCollapser) {
                    return this.children[i];
                }
            }
        }
        return null;
    }
}

// Setup a bunch of elements
const iterations = 1000000;
const accordions = [];

for (let i = 0; i < 10; i++) {
    const parent = new Element();
    const button = new Element(true);
    const collapseEl = new Element();

    parent.appendChild(button);
    parent.appendChild(collapseEl);

    accordions.push({ collapseEl, parent, button });
}

console.log("Running baseline (repeated querySelector)...");

const startBaseline = performance.now();
let foundElements = 0;

for (let i = 0; i < iterations; i++) {
    const target = accordions[i % accordions.length].collapseEl;
    // Current implementation:
    const button = target.parentElement.querySelector('.collapser');
    if (button) foundElements++;
}

const endBaseline = performance.now();
const timeBaseline = endBaseline - startBaseline;
console.log(`Baseline time: ${timeBaseline.toFixed(2)}ms`);


console.log("\nRunning optimized (cached reference)...");

const startOptimized = performance.now();
let foundElementsOpt = 0;

for (let i = 0; i < iterations; i++) {
    const targetInfo = accordions[i % accordions.length];
    // Optimized implementation (button reference is already found and saved in closure):
    const button = targetInfo.button; // simulating the cached ref
    if (button) foundElementsOpt++;
}

const endOptimized = performance.now();
const timeOptimized = endOptimized - startOptimized;
console.log(`Optimized time: ${timeOptimized.toFixed(2)}ms`);

const improvement = ((timeBaseline - timeOptimized) / timeBaseline) * 100;
console.log(`\nImprovement: ${improvement.toFixed(2)}% reduction in execution time`);
