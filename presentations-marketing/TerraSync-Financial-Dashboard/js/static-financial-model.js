
function generateProjections() {
    const revenuePoints = [
        { month: 0, revenue: 0 },
        { month: 12, revenue: 85700 },    // End of 2025
        { month: 24, revenue: 514300 },   // End of 2026
        { month: 36, revenue: 1085000 },  // End of 2027
        { month: 48, revenue: 2265000 },  // End of 2028
        { month: 60, revenue: 3768000 }   // End of 2029
    ];

    const locationSchedule = [
        { startMonth: 0, locations: 2 },
        { startMonth: 12, locations: 5 },
        { startMonth: 24, locations: 12 },
        { startMonth: 36, locations: 25 },
        { startMonth: 48, locations: 45 }
    ];

    const projections = [];
    let revenuePointIndex = 0;

    function getLocationsForMonth(m) {
        let locs = locationSchedule[0].locations;
        for (let i = 1; i < locationSchedule.length; i++) {
            if (m >= locationSchedule[i].startMonth) {
                locs = locationSchedule[i].locations;
            }
        }
        return locs;
    }

    for (let m = 0; m < 60; m++) {
        if (revenuePointIndex < revenuePoints.length - 2 && m >= revenuePoints[revenuePointIndex + 1].month) {
            revenuePointIndex++;
        }

        const startPoint = revenuePoints[revenuePointIndex];
        const endPoint = revenuePoints[revenuePointIndex + 1];

        const monthFraction = (endPoint.month - startPoint.month === 0) ? 1 : (m - startPoint.month) / (endPoint.month - startPoint.month);
        const currentRevenue = startPoint.revenue + monthFraction * (endPoint.revenue - startPoint.revenue);

        const currentLocations = getLocationsForMonth(m);
        const grossProfit = currentRevenue * 0.65; // 65% Gross Margin from pitch deck
        const netCashFlow = grossProfit - (currentRevenue * 0.40); // Assuming 40% OpEx of revenue as cost
        const totalAcres = (currentRevenue * 12) / 5000; // Assuming $5k/acre/year revenue generation

        projections.push({
            month: m,
            revenues: {
                total: currentRevenue,
                recurring: { service: currentRevenue * 0.8, saas: currentRevenue * 0.2 },
                oneTime: { installation: 0, product: 0 }
            },
            totalAcres: totalAcres,
            locations: currentLocations,
            netCashFlow: netCashFlow,
        });
    }
    return projections;
}

const staticProjections = generateProjections();
