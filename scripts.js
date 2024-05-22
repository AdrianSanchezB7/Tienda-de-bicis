document.addEventListener('DOMContentLoaded', () => {
    fetch('bikes.json')
        .then(response => response.json())
        .then(data => displayBikes(data.bikes));
});

function displayBikes(bikes) {
    const bikeList = document.getElementById('bikeList');
    bikeList.innerHTML = '';
    bikes.forEach(bike => {
        const bikeElement = document.createElement('div');
        bikeElement.className = 'bike';
        bikeElement.innerHTML = `
            <img src="${bike.image}" alt="${bike.name}" class="bike-image">
            <h3>${bike.name}</h3>
            <p>Modelo: ${bike.model}</p>
            <p>Tarifa: ${bike.price} €/hora</p>
            <button onclick="rentBike('${bike.name}')">Alquilar</button>
        `;
        bikeList.appendChild(bikeElement);
    });
}

function filterBikes(model) {
    fetch('bikes.json')
        .then(response => response.json())
        .then(data => {
            if (model === 'all') {
                displayBikes(data.bikes);
            } else {
                const filteredBikes = data.bikes.filter(bike => bike.model.includes(model));
                displayBikes(filteredBikes);
            }
        });
}

function filterByPrice(min, max) {
    fetch('bikes.json')
        .then(response => response.json())
        .then(data => {
            const filteredBikes = data.bikes.filter(bike => bike.price >= min && bike.price <= max);
            displayBikes(filteredBikes);
        });
}

function rentBike(name) {
    alert(`Has seleccionado alquilar la bicicleta: ${name}`);
}
