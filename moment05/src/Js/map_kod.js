"use strict";

let map;

function initMap() {
    if (!map) {
        map = L.map('map').setView([62.3863, 17.3066], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    }
}

async function findLocation() {
    const locationInput = document.getElementById('platsInput').value;
    
    const map_url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(locationInput)}&limit=1&apiKey=XMJPgVeLk2rkOo1yR0svyXc1OFpOdNIpXmHTAVyJph8`;

    try {
        const response = await fetch(map_url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const location = data.items[0].position;
            map.setView([location.lat, location.lng], 15);

            const marker = L.marker([location.lat, location.lng]).addTo(map);

            marker.bindPopup('plats du söker');

            marker.openPopup();

        } else {
            document.getElementById("error").innerHTML = "<p>Platsen hittades inte!</p>";
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("error").innerHTML = "<p>Ett fel uppstod när platsdata skulle hämtas.!</p>";
    }
}

document.getElementById('platsBtn').addEventListener('click', findLocation);
window.onload = initMap;


