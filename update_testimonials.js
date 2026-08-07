const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf-8');

const testimonials = [
    ["JG’s Dad", "JG has come on in leaps and bounds. We are so appreciative of the care, dedication, and love shown to him. You should all be incredibly proud of the brilliant work you do."],
    ["KB’s Father", "The care, dedication, and professionalism shown by the staff and management have been outstanding. Thank you for your unwavering support during an incredibly difficult time."],
    ["LK’s Mother", "The care LK receives is unbelievable. The team go above and beyond every day, and I cannot thank them enough for everything they do."],
    ["LB’s Family", "LB has really settled and built strong, trusted relationships with staff. The team know him well and provide kind, caring, person-centred support that helps him access local facilities, make choices, and enjoy greater independence."],
    ["PH’s Mother", "The outstanding support, kindness, and dedication shown to PH have made a real difference. We are truly grateful for everything the team does."],
    ["MA’s Mother", "The team’s dedication, professionalism, and understanding have provided stability and reassurance for both MA and our family. We truly value the positive difference they make."],
    ["EC’s Mother", "It is emotional to see EC so happy and surrounded by people who genuinely care. Thank you for everything you do."],
    ["ZA’s Mother", "Thank you for all the support and encouragement you provide. It is wonderful to see ZA so engaged, involved, and happy."],
    ["JG’s Mother", "JG has progressed so well and is now healthy, happy, and bright. We are so grateful for the dedication of the amazing team."],
    ["LB’s Mother", "Thank you for your kindness and encouragement. It meant so much and made my day very special."],
    ["JG’s Dad", "Your attention to detail, compassion, and respect are exceptional. We cannot thank you enough for your love, dedication, and commitment to helping JG live a meaningful, engaging, and happy life."]
];

let html_parts = [];
testimonials.forEach((t, index) => {
    const author = t[0];
    const text = t[1];
    const i = index + 1;
    html_parts.push(`        <!-- Review ${i} -->
        <div class="quote-card quote-card-layout">
          <svg width="30" height="24" viewBox="0 0 30 24" fill="none" class="quote-card-icon"><path d="M12.5 0C5.5 2.5 0 8 0 15C0 20 3.5 24 8 24C11.5 24 14 21 14 17.5C14 14.5 12 12 9 12C8 12 7 12.3 6.5 12.5C7 8.5 9.5 4.5 14 2L12.5 0ZM28.5 0C21.5 2.5 16 8 16 15C16 20 19.5 24 24 24C27.5 24 30 21 30 17.5C30 14.5 28 12 25 12C24 12 23 12.3 22.5 12.5C23 8.5 25.5 4.5 30 2L28.5 0Z" fill="currentColor"/></svg>
          <div class="quote-card-body">
            <div class="quote-card-text">${text}</div>
            <div class="full-text-hidden quote-hidden-content"><p>${text}</p></div>
            <button class="read-more-btn">Read More</button>
          </div>
          <footer class="quote-author quote-author-text">&mdash; ${author}</footer>
        </div>`);
});

const replacement = html_parts.join('\n\n');

// The pattern needs to match everything from <!-- Review 1 --> to the closing </div> of the last review.
const pattern = /(<!-- Review 1 -->\s*<div class="quote-card".*?)(?=\s*<\/div>\s*<!-- Controls -->)/s;
const match = pattern.exec(content);

if (match) {
    const newContent = content.substring(0, match.index) + replacement + content.substring(match.index + match[0].length);
    fs.writeFileSync('index.html', newContent, 'utf-8');
    console.log("Success");
} else {
    console.log("Failed to find pattern");
}
