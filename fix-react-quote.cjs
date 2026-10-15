const fs = require('fs');

const quoteFile = './src/components/home/QuoteSection.tsx';
let content = fs.readFileSync(quoteFile, 'utf8');

// The first patch failed to remove the Price Guarantee Card completely because it was nested deeply or regex didn't match.
// Let's use a simpler replacement to remove the price card HTML.
content = content.replace(/\{\/\* Price Guarantee Card \*\/\}[\s\S]*?(?=<div className="space-y-2\.5 text-xs text-slate-400">)/, '');

fs.writeFileSync(quoteFile, content);
console.log("Fixed QuoteSection.tsx price rendering");
