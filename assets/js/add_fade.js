const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const selectors = [
  'section-head', 'hero-lead', 'hero-actions', 'hero-trust', 'two-col', 'card', 
  'service-card', 'pillar', 'stat', 'quote-card', 'timeline-item', 'cta-band', 'ph'
];

selectors.forEach(sel => {
  const findRegex = new RegExp('class=\"([^\"]*\\\\b' + sel + '\\\\b[^\"]*)\"', 'gi');
  html = html.replace(findRegex, (match, classList) => {
    if (classList.includes('fade-up')) return match;
    return 'class=\"' + classList + ' fade-up\"';
  });
});

html = html.replace(/<h1>/, '<h1 class=\"fade-up\">');

fs.writeFileSync('index.html', html);
console.log('Added fade-up classes to index.html');
