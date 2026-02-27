// Carbon Calculator JavaScript
const form = document.getElementById('carbonCalculator');
const resultsCard = document.getElementById('resultsCard');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const distance = parseFloat(document.getElementById('distance').value);
    const frequency = parseInt(document.getElementById('frequency').value);
    const vehicleType = parseFloat(document.getElementById('vehicleType').value);
    const timeframe = parseInt(document.getElementById('timeframe').value);

    // Calculate CO2 saved (kg)
    const totalDistance = distance * frequency * timeframe;
    const co2Traditional = totalDistance * vehicleType;
    const co2Electric = totalDistance * 0.02; // EVs produce minimal emissions
    const co2Saved = co2Traditional - co2Electric;

    // Calculate equivalents
    const treeEquiv = Math.round(co2Saved / 21); // 1 tree absorbs ~21kg CO2/year
    const fuelSaved = Math.round((co2Saved / 2.3) * 1); // 1L diesel = ~2.3kg CO2
    const homeEquiv = Math.round(co2Saved / 10); // Average home uses ~10kg CO2/day
    const lightbulbEquiv = Math.round(co2Saved / 0.5); // LED bulb ~0.5kg CO2/year

    // Update results
    document.getElementById('co2Saved').textContent = co2Saved.toFixed(1);
    document.getElementById('treeEquiv').textContent = treeEquiv;
    document.getElementById('fuelSaved').textContent = fuelSaved;
    document.getElementById('homeEquiv').textContent = homeEquiv;
    document.getElementById('lightbulbEquiv').textContent = lightbulbEquiv;

    // Update chart
    const maxValue = co2Traditional;
    const traditionalBar = document.getElementById('traditionalBar');
    const traditionalValue = document.getElementById('traditionalValue');

    traditionalBar.style.width = '100%';
    traditionalValue.textContent = co2Traditional.toFixed(1) + ' kg';

    document.querySelector('.bar-fill.electric').style.width = ((co2Electric / maxValue) * 100) + '%';
    document.querySelector('.bar-fill.electric .bar-value').textContent = co2Electric.toFixed(1) + ' kg';

    // Show results
    resultsCard.style.display = 'block';
    resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

function resetCalculator() {
    form.reset();
    resultsCard.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
