// Quick calculation to verify mature territory revenue
const matureAcres = 1200;
const serviceRevenue = matureAcres * 59; // $59/acre/month

console.log('Mature Territory Revenue Breakdown:');
console.log('Service Revenue (1200 acres × $59):', serviceRevenue.toLocaleString());
console.log('');

// Add SaaS revenue (20% adoption)
const saasUsers = Math.floor(matureAcres * 0.20);
const saasRevenue = saasUsers * 50;
console.log('SaaS Revenue (' + saasUsers + ' users × $50):', saasRevenue.toLocaleString());

// Total recurring revenue
const totalRecurring = serviceRevenue + saasRevenue;
console.log('Total Recurring Revenue:', totalRecurring.toLocaleString());
console.log('');

// Calculate gross profit
const serviceGP = serviceRevenue * 0.70; // 70% margin
const saasGP = saasRevenue * 0.85; // 85% margin
const totalGP = serviceGP + saasGP;
console.log('Gross Profit Breakdown:');
console.log('Service GP (70% margin):', serviceGP.toLocaleString());
console.log('SaaS GP (85% margin):', saasGP.toLocaleString());
console.log('Total Gross Profit:', totalGP.toLocaleString());
console.log('');

// TerraSync's share (60%)
const terrasyncShare = totalGP * 0.60;
console.log('TerraSync Share (60%):', terrasyncShare.toLocaleString());
console.log('');

console.log('SLIDE TARGET: $67,000/month per mature territory');
console.log('ACTUAL MODEL: $' + totalRecurring.toLocaleString() + '/month gross revenue');
console.log('TERRASYNC NET: $' + terrasyncShare.toLocaleString() + '/month per mature territory');
console.log('Alignment check:', terrasyncShare >= 67000 ? '✓ EXCEEDS TARGET' : '⚠ BELOW TARGET'); 