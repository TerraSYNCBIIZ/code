// TERRASYNC CHART COMPONENTS - UPDATED FOR TERRITORY MATURITY MODEL
class TerrasyncCharts {
    constructor(financialModel) {
        this.model = financialModel;
        this.charts = {};
        this.currentMetric = 'revenue';
    }

    // CREATE MAIN CHART
    createMainChart(canvasId) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) {
            console.error('Canvas element not found:', canvasId);
            return;
        }

        // Generate projection data
        const projection = this.model.generateProjection(48);
        
        this.charts.main = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.generateMonthLabels(),
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'TerraSync Territory Maturity Growth',
                        color: '#22c55e',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(75, 85, 99, 0.3)' },
                        ticks: { color: '#9ca3af' }
                    },
                    y: {
                        grid: { color: 'rgba(75, 85, 99, 0.3)' },
                        ticks: { 
                            color: '#9ca3af',
                            callback: function(value) {
                                return '$' + (value / 1000).toFixed(0) + 'K';
                            }
                        }
                    }
                },
                elements: {
                    line: { tension: 0.4 },
                    point: { radius: 3, hoverRadius: 6 }
                }
            }
        });

        // Initialize with revenue data
        this.updateChart('revenue');
    }

    // UPDATE CHART DATA
    updateChart(metric) {
        if (!this.charts.main) return;
        
        this.currentMetric = metric;
        
        const data = this.generateChartData(metric);
        this.charts.main.data.datasets = data.datasets;
        this.charts.main.options.plugins.title.text = data.title;
        this.charts.main.options.scales.y.ticks.callback = data.yAxisFormatter;
        this.charts.main.update();
    }

    // GENERATE CHART DATA BASED ON METRIC
    generateChartData(metric) {
        const projection = this.model.generateProjection(48);
        
        const configs = {
            revenue: {
                title: 'Total Revenue Growth (Territory Maturity Model)',
                datasets: [{
                    label: 'Total Monthly Revenue',
                    data: projection.map(p => p.totalRevenue),
                    borderColor: '#22c55e',
                    backgroundColor: '#22c55e20',
                    fill: true
                }],
                yAxisFormatter: (value) => '$' + (value / 1000).toFixed(0) + 'K'
            },
            recurring: {
                title: 'Recurring Revenue Growth', 
                datasets: [{
                    label: 'Recurring Revenue',
                    data: projection.map(p => p.recurringRevenue),
                    borderColor: '#3b82f6',
                    backgroundColor: '#3b82f620',
                    fill: true
                }, {
                    label: 'Additional Services',
                    data: projection.map(p => p.additionalRevenue),
                    borderColor: '#f59e0b',
                    backgroundColor: '#f59e0b20',
                    fill: true
                }],
                yAxisFormatter: (value) => '$' + (value / 1000).toFixed(0) + 'K'
            },
            acres: {
                title: 'Acres Under Management (Territory Maturity)',
                datasets: [{
                    label: 'Total Acres',
                    data: projection.map(p => p.acres),
                    borderColor: '#10b981',
                    backgroundColor: '#10b98120',
                    fill: true
                }, {
                    label: 'New Acres Added',
                    data: projection.map(p => p.newAcres),
                    borderColor: '#8b5cf6',
                    backgroundColor: '#8b5cf620',
                    fill: true,
                    type: 'bar'
                }],
                yAxisFormatter: (value) => value.toLocaleString() + ' acres'
            },
            territories: {
                title: 'Territory Expansion Schedule',
                datasets: [{
                    label: 'Active Territories',
                    data: projection.map(p => p.territories),
                    borderColor: '#ef4444',
                    backgroundColor: '#ef444420',
                    fill: true,
                    stepped: true
                }],
                yAxisFormatter: (value) => value + ' territories'
            },
            cashflow: {
                title: 'Net Cash Flow Progression',
                datasets: [{
                    label: 'Monthly Net Cash Flow',
                    data: projection.map(p => p.netCashFlow),
                    borderColor: '#06b6d4',
                    backgroundColor: projection.map(p => p.netCashFlow >= 0 ? '#06b6d420' : '#ef444420'),
                    fill: true
                }],
                yAxisFormatter: (value) => '$' + (value / 1000).toFixed(0) + 'K'
            }
        };

        return configs[metric] || configs.revenue;
    }

    // UTILITY FUNCTIONS
    generateMonthLabels() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const labels = [];
        const startYear = 2025;
        const startMonth = 4; // May 2025
        
        for (let i = 0; i < 48; i++) {
            const month = (startMonth + i) % 12;
            const year = startYear + Math.floor((startMonth + i) / 12);
            labels.push(`${months[month]} ${year}`);
        }
        
        return labels;
    }

    // UPDATE METRICS PANEL FROM MODEL
    updateMetrics(month) {
        const projection = this.model.generateProjection(60);
        const currentData = projection[month] || projection[0];
        
        // Update metric displays
        document.getElementById('currentRevenue').textContent = '$' + (currentData.totalRevenue / 1000).toFixed(1) + 'K';
        document.getElementById('currentAcres').textContent = currentData.acres.toLocaleString();
        document.getElementById('currentTerritories').textContent = currentData.territories;
        document.getElementById('currentROIC').textContent = '$' + (currentData.netCashFlow / 1000).toFixed(1) + 'K';
        
        // Update change indicators
        if (month > 0) {
            const prevData = projection[month - 1];
            const revenueChange = ((currentData.totalRevenue - prevData.totalRevenue) / prevData.totalRevenue * 100).toFixed(1);
            const acresChange = currentData.acres - prevData.acres;
            
            document.getElementById('revenueChange').textContent = `+${revenueChange}% vs last month`;
            document.getElementById('acresChange').textContent = `+${acresChange} acres this month`;
        }
        
        // Update month display
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const startMonth = 4; // May 2025
        const currentMonth = (startMonth + month) % 12;
        const currentYear = 2025 + Math.floor((startMonth + month) / 12);
        document.getElementById('currentMonth').textContent = `${months[currentMonth]} ${currentYear}`;
        
        // Update territory status
        const territoryChange = document.getElementById('territoriesChange');
        if (currentData.territories <= 2) {
            territoryChange.textContent = 'Foundation phase';
            territoryChange.className = 'metric-change';
        } else if (currentData.territories <= 8) {
            territoryChange.textContent = 'Growth phase';
            territoryChange.className = 'metric-change positive';
        } else if (currentData.territories <= 20) {
            territoryChange.textContent = 'Scaling phase';
            territoryChange.className = 'metric-change positive';
        } else {
            territoryChange.textContent = 'National expansion';
            territoryChange.className = 'metric-change positive';
        }
    }
}

// GLOBAL FUNCTIONS FOR DASHBOARD INTERACTION
function switchChart(metric) {
    if (window.chartComponents) {
        window.chartComponents.updateChart(metric);
    }
    
    // Update button states
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function updateTimeSlider(month) {
    if (window.chartComponents) {
        window.chartComponents.updateMetrics(parseInt(month));
    }
}

function updateMetricsFromModel(month) {
    if (window.chartComponents) {
        window.chartComponents.updateMetrics(month);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize financial model
        const financialModel = new TerrasyncFinancialModel();
        
        // Validate current state
        const currentState = financialModel.validateCurrentState();
        console.log('Territory Maturity Model - Current State:', currentState);
        
        // Initialize charts
        window.chartComponents = new TerrasyncCharts(financialModel);
        
        // Create main chart with delay to ensure canvas is ready
        setTimeout(() => {
            window.chartComponents.createMainChart('mainChart');
            console.log('✅ Territory Maturity Charts Initialized');
        }, 100);
        
        // Set global references
        window.financialModel = financialModel;
        
    } catch (error) {
        console.error('❌ Error initializing Territory Maturity Charts:', error);
    }
});

// Tab switching function
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
} 