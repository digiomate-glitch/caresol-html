const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/class=\"eyebrow fade-up\"/g, 'class=\"eyebrow fade-up text-gradient\"');
html = html.replace(/class=\"eyebrow\"/g, 'class=\"eyebrow text-gradient\"');
// html = html.replace(/<h2>/g, '<h2 class=\"text-gradient\">'); // Let's not make all h2 gradient, only the hero h1 is fine, maybe eyebrow.

fs.writeFileSync('index.html', html);
console.log('Added text-gradient classes to index.html');
