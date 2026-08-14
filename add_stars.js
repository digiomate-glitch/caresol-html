const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf-8');
const startIdx = content.indexOf('<!-- Review 1 -->');
const endIdx = content.indexOf('<!-- Controls -->');

if (startIdx > -1 && endIdx > -1) {
    let part1 = content.substring(0, startIdx);
    let part2 = content.substring(endIdx);
    
    const jsCode = fs.readFileSync('update_testimonials.js', 'utf-8');
    const pMatch = jsCode.match(/const testimonials = \[([\s\S]*?)\];/);
    
    if(pMatch) {
        eval('var testimonials = [' + pMatch[1] + '];');
        let html_parts = [];
        
        testimonials.forEach((t, index) => {
            const author = t[0];
            const text = t[1];
            const i = index + 1;
            
            const starsHtml = `<div class="quote-stars" style="color: #FBBF24; display: flex; gap: 4px; margin-bottom: 12px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/></svg>
            </div>`;
            
            html_parts.push(`        <!-- Review ${i} -->
        <div class="quote-card quote-card-layout">
          <svg width="30" height="24" viewBox="0 0 30 24" fill="none" class="quote-card-icon"><path d="M12.5 0C5.5 2.5 0 8 0 15C0 20 3.5 24 8 24C11.5 24 14 21 14 17.5C14 14.5 12 12 9 12C8 12 7 12.3 6.5 12.5C7 8.5 9.5 4.5 14 2L12.5 0ZM28.5 0C21.5 2.5 16 8 16 15C16 20 19.5 24 24 24C27.5 24 30 21 30 17.5C30 14.5 28 12 25 12C24 12 23 12.3 22.5 12.5C23 8.5 25.5 4.5 30 2L28.5 0Z" fill="currentColor"/></svg>
          <div class="quote-card-body">
            ${starsHtml}
            <div class="quote-card-text">${text}</div>
            <div class="full-text-hidden quote-hidden-content"><p>${text}</p></div>
            <button class="read-more-btn">Read More</button>
          </div>
          <footer class="quote-author quote-author-text">&mdash; ${author}</footer>
        </div>`);
        });
        
        const newContent = part1 + html_parts.join('\n\n') + '\n        \n      </div>\n\n      ' + part2;
        fs.writeFileSync('index.html', newContent);
        console.log('Successfully updated index.html');
    }
} else {
    console.log('Could not find start/end indices.');
}
