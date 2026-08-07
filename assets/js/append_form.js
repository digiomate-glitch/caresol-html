const fs = require('fs');
const css = `
/* ---------------------------------- Forms ---------------------------------- */
.contact-form {
  display: flex;
  flex-direction: column;
}
.row2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
@media (max-width: 600px) {
  .row2 { grid-template-columns: 1fr; gap: 0; }
}
.field {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}
.field label {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--deepwood);
  font-weight: 600;
}
.field input, .field select, .field textarea {
  width: 100%;
  padding: 16px;
  border-radius: var(--radius-m);
  border: 1px solid rgba(31,51,41,0.2);
  background: var(--white);
  font-family: var(--font-sans);
  font-size: 16px;
  color: var(--ink);
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
}
.field textarea {
  min-height: 150px;
  resize: vertical;
}
.field input:focus, .field select:focus, .field textarea:focus {
  outline: none;
  border-color: var(--sandstone);
  box-shadow: 0 0 0 4px rgba(220,166,113,0.15);
}
`;
fs.appendFileSync('style.css', css);
console.log('Appended form styles');
