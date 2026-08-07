const fs = require('fs');
['outreach-support.html', 'careers.html', 'contact.html', 'index.html', 'about.html', 'supported-living.html'].forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, i) => {
      if (line.includes('class=\"ph')) console.log(file + ' Line ' + (i+1) + ': ' + line.trim());
    });
  }
});
