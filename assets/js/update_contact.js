const fs = require('fs');
let html = fs.readFileSync('contact.html', 'utf8');

// Premium classes
const selectors = [
  'section-head', 'hero-lead', 'hero-actions', 'hero-trust', 'two-col', 'card', 
  'service-card', 'pillar', 'stat', 'quote-card', 'timeline-item', 'cta-band', 'ph', 'info-strip'
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

// Fix inline styling
html = html.replace('<section class=\"page-hero\" style=\"padding-bottom:40px;\">', '<section class=\"page-hero fade-up\">');
html = html.replace('<section style=\"padding-bottom:20px;\">', '<section class=\"section fade-up\">');

// Replace placeholder (Map)
const phRegex = /<div class=\"ph ph--tall fade-up\" style=\"margin-bottom:24px;\">\s*<div class=\"ph-label\">(.*?)Google Map(.*?)<\/span><\/div>\s*<\/div>/g;
html = html.replace(phRegex, '<img src=\"contact_office.png\" alt=\"A smiling teenager with Down syndrome and their parent walking into a modern care office\" style=\"width:100%; height:400px; object-fit:cover; border-radius:var(--radius-lg); box-shadow:var(--shadow-soft); margin-bottom: 24px;\" class=\"fade-up\">');

fs.writeFileSync('contact.html', html);
console.log('Updated contact.html with image and classes');
