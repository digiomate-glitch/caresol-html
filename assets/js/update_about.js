const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

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
html = html.replace(/class=\"eyebrow fade-up\"/g, 'class=\"eyebrow fade-up text-gradient\"');
html = html.replace(/class=\"eyebrow\"/g, 'class=\"eyebrow text-gradient\"');
html = html.replace('<section class=\"section fade-up\" style=\"padding-top:20px;\">', '<section class=\"section fade-up\">');
html = html.replace('<section class=\"section\" style=\"padding-top:20px;\">', '<section class=\"section fade-up\">');

fs.writeFileSync('about.html', html);
console.log('Added classes to about.html');
