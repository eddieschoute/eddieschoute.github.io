var fs = require('fs');
var lint = require('htmllint');

var html_cv = fs.readFileSync('build/cv.html', 'utf-8');
lint(html_cv, {
    'indent-style': false,
    'indent-width': false,
    "line-no-trailing-whitespace": false,
    "class-style": "dash",
    "id-class-style": "camel"
}).then(l => console.log(l));