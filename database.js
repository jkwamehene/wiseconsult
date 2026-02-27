// EV Database JavaScript
AOS.init({ duration: 800, offset: 100, once: true });

const vehicles = [
    {name: 'BYD K9 Electric Bus', type: 'bus', seats: 40, range: 350, image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop'},
    {name: 'Yutong E12 Bus', type: 'bus', seats: 45, range: 320, image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop'},
    {name: 'Nissan e-NV200', type: 'van', seats: 7, range: 280, image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=400&h=300&fit=crop'},
    {name: 'Tesla Model 3', type: 'sedan', seats: 5, range: 450, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop'},
    {name: 'Proterra Catalyst', type: 'bus', seats: 42, range: 380, image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop'},
    {name: 'Chevrolet Bolt', type: 'sedan', seats: 5, range: 417, image: 'https://images.unsplash.com/photo-1583267746897-dee1d831b1e0?w=400&h=300&fit=crop'}
];

function renderVehicles(filter = 'all', search = '') {
    const grid = document.getElementById('vehiclesGrid');
    const filtered = vehicles.filter(v => {
        const matchesType = filter === 'all' || v.type === filter;
        const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase());
        return matchesType && matchesSearch;
    });

    grid.innerHTML = filtered.map(v => `
        <div class="vehicle-card" data-aos="fade-up">
            <div class="vehicle-image" style="background-image: url('${v.image}')"></div>
            <div class="vehicle-info">
                <h3>${v.name}</h3>
                <div class="vehicle-specs">
                    <span><i class="fas fa-users"></i> ${v.seats} seats</span>
                    <span><i class="fas fa-battery-full"></i> ${v.range} km range</span>
                    <span class="type-badge">${v.type}</span>
                </div>
                <button class="btn-secondary btn-small">View Details</button>
            </div>
        </div>
    `).join('');
}

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Search and filter
document.getElementById('searchVehicles').addEventListener('input', (e) => {
    const search = e.target.value;
    const filter = document.getElementById('filterType').value;
    renderVehicles(filter, search);
});

document.getElementById('filterType').addEventListener('change', (e) => {
    const filter = e.target.value;
    const search = document.getElementById('searchVehicles').value;
    renderVehicles(filter, search);
});

// Initial render
renderVehicles();
