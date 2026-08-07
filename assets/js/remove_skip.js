const fs = require('fs');
const files = fs.readdirSync('.');
const htmlFiles = files.filter(f => f.endsWith('.html'));
let count = 0;
htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('<a href=\"#main\" class=\"skip-link\">Skip to main content</a>')) {
    content = content.replace(/<a href=\"#main\" class=\"skip-link\">Skip to main content<\/a>\r?\n?/g, '');
    fs.writeFileSync(file, content);
    count++;
  }
});
console.log('Removed from ' + count + ' files.');
