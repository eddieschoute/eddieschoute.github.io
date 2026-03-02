const fs = require("fs");
const lint = require("htmllint");

const html_cv = fs.readFileSync("build/cv.html", "utf-8");
lint(html_cv, {
  "indent-style": false,
  "indent-width": false,
  "line-no-trailing-whitespace": false,
  "class-style": "dash",
  "id-class-style": "camel"
}).then(l => console.log(l));