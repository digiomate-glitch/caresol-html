const fs = require('fs');
let html = fs.readFileSync('supported-living.html', 'utf8');

// Premium classes
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
html = html.replace('<section class=\"section fade-up\" style=\"padding-top:16px;\">', '<section class=\"section fade-up\">');
html = html.replace('<section class=\"section\" style=\"padding-top:16px;\">', '<section class=\"section fade-up\">');

// Replace placeholder 1 (relaxing)
const ph1Regex = /<div class=\"ph ph--tall fade-up\">\s*<div class=\"ph-label\">(.*?)relaxing(.*?)<\/span><\/div>\s*<\/div>/g;
html = html.replace(ph1Regex, '<img src=\"supported_living_relaxing.png\" alt=\"A teenager with autism relaxing in their own supported living lounge\" style=\"width:100%; height:100%; object-fit:cover; border-radius:var(--radius-lg); box-shadow:var(--shadow-soft);\" class=\"fade-up\">');

// Replace placeholder 2 (cooking)
const ph2Regex = /<div class=\"ph ph--tall fade-up\">\s*<div class=\"ph-label\">(.*?)cook a meal(.*?)<\/span><\/div>\s*<\/div>/g;
html = html.replace(ph2Regex, '<img src=\"supported_living_cooking.png\" alt=\"A support worker helping a teenager with Down syndrome cook a meal\" style=\"width:100%; height:100%; object-fit:cover; border-radius:var(--radius-lg); box-shadow:var(--shadow-soft);\" class=\"fade-up\">');

fs.writeFileSync('supported-living.html', html);
console.log('Updated supported-living.html with images and classes');
