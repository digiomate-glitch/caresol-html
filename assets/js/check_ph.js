const fs = require('fs');
['outreach-support.html', 'careers.html', 'contact.html', 'index.html', 'about.html', 'supported-living.html'].forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const phMatches = content.match(/class=\"ph/g);
    console.log(file + ' has ' + (phMatches ? phMatches.length : 0) + ' placeholders left.');
  }
});
