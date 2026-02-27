// EV vs Fuel Cost Comparison Calculator
let costChart = null;

const form = document.getElementById('evFuelCalculator');

// Initialize with default calculation
document.addEventListener('DOMContentLoaded', () => {
    calculateComparison();
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    calculateComparison();
});

function calculateComparison() {
    // Get input values
    const distancePerWeek = parseFloat(document.getElementById('distancePerWeek').value);
    const fuelPrice = parseFloat(document.getElementById('fuelPrice').value);
    const fuelConsumption = parseFloat(document.getElementById('fuelConsumption').value);
    const electricityRate = parseFloat(document.getElementById('electricityRate').value);
    const timeframe = parseInt(document.getElementById('timeframe').value);

    // Calculate totals
    const totalDistance = distancePerWeek * 4.33 * timeframe; // 4.33 weeks per month average
    const weeksCount = Math.round(timeframe * 4.33);

    // Fuel vehicle costs
    const fuelNeeded = (totalDistance / 100) * fuelConsumption; // Liters needed
    const fuelCost = fuelNeeded * fuelPrice;
    const fuelMaintenance = totalDistance * 0.15; // GHS 0.15 per km maintenance
    const totalFuelCost = fuelCost + fuelMaintenance;

    // Electric vehicle costs
    const evConsumption = 20; // kWh per 100km (average for electric bus)
    const energyNeeded = (totalDistance / 100) * evConsumption; // kWh needed
    const energyCost = energyNeeded * electricityRate;
    const evMaintenance = totalDistance * 0.05; // GHS 0.05 per km maintenance (70% less)
    const totalEvCost = energyCost + evMaintenance;

    // Savings
    const savings = totalFuelCost - totalEvCost;
    const savingsPercent = ((savings / totalFuelCost) * 100).toFixed(1);

    // CO2 avoided (kg) - diesel produces ~2.68kg CO2 per liter
    const co2Avoided = fuelNeeded * 2.68;

    // Efficiency percentage
    const efficiency = ((totalFuelCost / totalEvCost - 1) * 100).toFixed(0);

    // Update UI
    document.getElementById('fuelCost').textContent = `GHS ${totalFuelCost.toLocaleString('en-GH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('evCost').textContent = `GHS ${totalEvCost.toLocaleString('en-GH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('totalSavings').textContent = `GHS ${savings.toLocaleString('en-GH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('savingsPercent').textContent = `${savingsPercent}% cheaper`;
    document.getElementById('totalDistance').textContent = `${totalDistance.toLocaleString('en-GH', {minimumFractionDigits: 0, maximumFractionDigits: 0})} km`;
    document.getElementById('weeksCount').textContent = `${weeksCount} weeks`;
    document.getElementById('co2Avoided').textContent = `${co2Avoided.toLocaleString('en-GH', {minimumFractionDigits: 0, maximumFractionDigits: 0})} kg`;
    document.getElementById('efficiency').textContent = `${efficiency}%`;

    // Create chart
    createCostChart(timeframe, distancePerWeek, fuelPrice, fuelConsumption, electricityRate);

    // Scroll to results
    document.getElementById('resultsCard').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function createCostChart(months, weeklyDistance, fuelPrice, fuelConsumption, electricityRate) {
    const ctx = document.getElementById('costChart').getContext('2d');

    // Destroy existing chart
    if (costChart) {
        costChart.destroy();
    }

    // Generate data points
    const labels = [];
    const fuelData = [];
    const evData = [];

    for (let month = 0; month <= months; month++) {
        const distance = weeklyDistance * 4.33 * month;

        // Fuel costs
        const fuelNeeded = (distance / 100) * fuelConsumption;
        const fuelCost = fuelNeeded * fuelPrice + (distance * 0.15);

        // EV costs
        const energyNeeded = (distance / 100) * 20;
        const evCost = energyNeeded * electricityRate + (distance * 0.05);

        labels.push(month === 0 ? 'Start' : `Month ${month}`);
        fuelData.push(fuelCost);
        evData.push(evCost);
    }

    // Create new chart
    costChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Fuel Vehicle',
                    data: fuelData,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Electric Vehicle',
                    data: evData,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 14,
                            weight: 600
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += 'GHS ' + context.parsed.y.toLocaleString('en-GH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'GHS ' + value.toLocaleString('en-GH');
                        },
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function resetComparison() {
    form.reset();
    document.getElementById('distancePerWeek').value = 100;
    document.getElementById('fuelPrice').value = 15.5;
    document.getElementById('fuelConsumption').value = 10;
    document.getElementById('electricityRate').value = 1.2;
    calculateComparison();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});
