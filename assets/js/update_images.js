const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const heroRegex = /<div class="ph ph--hero">.*?<\/div>\s*<\/div>/s;
const heroReplacement = '<div class="ph ph--hero" style="background-image: url(\'hero_cooking_1785391956971.png\'); background-size: cover; background-position: center; border-radius: var(--radius-l); border: 1px solid rgba(31,51,41,0.09);"></div>';
html = html.replace(heroRegex, heroReplacement);

const service1Regex = /<div class="ph ph--wide" style="border-radius:0;">.*?<span>Placeholder &mdash; a person in their own supported living home.*?<\/div>\s*<\/div>/s;
const service1Replacement = '<div class="ph ph--wide" style="border-radius:0; background-image: url(\'service_living_1785391967493.png\'); background-size: cover; background-position: center; border: 1px solid rgba(31,51,41,0.09);"></div>';
html = html.replace(service1Regex, service1Replacement);

const service2Regex = /<div class="ph ph--wide" style="border-radius:0;">.*?<span>Placeholder &mdash; a support worker and client out in the community.*?<\/div>\s*<\/div>/s;
const service2Replacement = '<div class="ph ph--wide" style="border-radius:0; background-image: url(\'service_park_1785391977118.png\'); background-size: cover; background-position: center; border: 1px solid rgba(31,51,41,0.09);"></div>';
html = html.replace(service2Regex, service2Replacement);

const choicesRegex = /<div class="col-media">\s*<div class="ph ph--tall">.*?Placeholder &mdash; a person making a choice.*?<\/div>\s*<\/div>/s;
const choicesReplacement = '<div class="col-media">\n        <div class="ph ph--tall" style="background-image: url(\'choices_board_1785391986833.png\'); background-size: cover; background-position: center; border-radius: var(--radius-l); border: 1px solid rgba(31,51,41,0.09);"></div>\n      </div>';
html = html.replace(choicesRegex, choicesReplacement);

const timelineRegex = /<div class="col-media">\s*<div class="ph ph--tall">.*?Placeholder &mdash; a support worker and family member in conversation.*?<\/div>\s*<\/div>/s;
const timelineReplacement = '<div class="col-media">\n        <div class="ph ph--tall" style="background-image: url(\'timeline_parents_1785391996870.png\'); background-size: cover; background-position: center; border-radius: var(--radius-l); border: 1px solid rgba(31,51,41,0.09);"></div>\n      </div>';
html = html.replace(timelineRegex, timelineReplacement);

fs.writeFileSync('index.html', html);
console.log('Images applied to index.html successfully!');
