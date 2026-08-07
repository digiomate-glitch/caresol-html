const fs = require('fs');
const css = `
/* ---------------------------------- Page Hero ---------------------------------- */
.page-hero {
  position: relative;
  overflow: hidden;
  padding: 100px 0 60px;
}
@media (max-width: 900px) {
  .page-hero {
    padding: 80px 0 40px;
  }
}
.page-hero h1 {
  font-size: clamp(40px, 5vw, 64px);
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-top: 24px;
}
.page-hero p {
  font-size: 20px;
  color: var(--ink-soft);
  max-width: 600px;
  margin-top: 24px;
  line-height: 1.6;
}
`;
fs.appendFileSync('style.css', css);
console.log('Appended page-hero styles');
