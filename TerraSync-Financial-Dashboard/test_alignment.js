const fs = require('fs');
eval(fs.readFileSync('js/financial-model.js', 'utf8'));

const model = new TerrasyncFinancialModel();
const projection = model.generateProjection(60);

console.log('=== ALIGNMENT CHECK WITH SLIDES ===');
console.log('Current (Month 0):');
console.log('  Territories:', projection[0].territories);
console.log('  Acres:', projection[0].acres);
console.log('  Monthly Revenue: $' + (projection[0].totalRevenue).toFixed(0));
console.log('');

console.log('Month 48 (4 years out, 2029):');
console.log('  Territories:', projection[48].territories);
console.log('  Acres:', projection[48].acres.toLocaleString());
console.log('  Monthly Revenue: $' + (projection[48].totalRevenue).toFixed(0));
console.log('  Annual Revenue: $' + ((projection[48].totalRevenue * 12) / 1000000).toFixed(1) + 'M');
console.log('');

console.log('Month 54 (when we hit 45 territories):');
console.log('  Territories:', projection[54].territories);
console.log('  Acres:', projection[54].acres.toLocaleString());
console.log('  Monthly Revenue: $' + (projection[54].totalRevenue).toFixed(0));
console.log('  Annual Revenue: $' + ((projection[54].totalRevenue * 12) / 1000000).toFixed(1) + 'M');
console.log('');

console.log('SLIDE TARGET: 45 territories by 2029 with $36.2M ARR'); 