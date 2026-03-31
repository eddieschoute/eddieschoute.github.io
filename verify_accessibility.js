const fs = require('fs');
const html = fs.readFileSync('build/cv.html', 'utf8');
if (html.includes('<button type="button" id="searchClear" class="search-clear" aria-label="Clear search">&times;</button>')) {
  console.log("Success: Button element and attributes are present in the built HTML.");
} else {
  console.log("Failed: Button not found in the built HTML.");
}
