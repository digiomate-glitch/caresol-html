const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const headerRegex = /<svg class="brand-mark"[^>]*>.*?<\/svg>\s*<span>Care Solutions Hub<small>Tunbridge Wells, Kent<\/small><\/span>/gs;
const footerRegex = /<svg width="34" height="34"[^>]*>.*?<\/svg>\s*Care Solutions Hub/gs;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(headerRegex, '<img src="logo.png" alt="Care Solutions Hub Logo" style="height: 60px; width: auto;" class="brand-mark">');
  content = content.replace(footerRegex, '<img src="logo.png" alt="Care Solutions Hub Logo" style="height: 44px; width: auto;" class="brand-mark">');
  fs.writeFileSync(f, content);
});
console.log('Done!');
