const fs = require('fs');
try {
    eval(fs.readFileSync('js/financial-model.js', 'utf8'));
    
    const model = new TerrasyncFinancialModel();
    const projection = model.generateProjection(60);
    
    console.log('=== FINANCIAL MODEL GROWTH TRAJECTORY ===');
    console.log('');
    
    // Key milestones
    const milestones = [0, 12, 24, 36, 48, 54];
    
    milestones.forEach(month => {
        const data = projection[month];
        const year = 2025 + Math.floor(month / 12);
        console.log(`Month ${month} (${year}):`);
        console.log(`  Territories: ${data.territories}`);
        console.log(`  Acres: ${data.acres.toLocaleString()}`);
        console.log(`  Monthly Revenue: $${(data.totalRevenue / 1000).toFixed(1)}K`);
        console.log(`  Annual Revenue: $${((data.totalRevenue * 12) / 1000000).toFixed(1)}M`);
        console.log(`  Cash Flow: $${(data.netCashFlow / 1000).toFixed(1)}K`);
        console.log('');
    });
    
    console.log('SLIDE TARGETS:');
    console.log('  2029: 45 territories, $36.2M ARR');
    console.log('');
    console.log('MODEL vs SLIDES:');
    console.log(`  Month 54 Territories: ${projection[54].territories} (target: 45)`);
    console.log(`  Month 54 ARR: $${((projection[54].totalRevenue * 12) / 1000000).toFixed(1)}M (target: $36.2M)`);
    
} catch (error) {
    console.error('Error:', error.message);
} 