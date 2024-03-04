"use strict";

let map;
let marker;

let locationL;
let locationLng;

// const DATA_FIELD = 'cloudCover';
// const TIMESTAMP = (new Date()).toISOString();


function initMap() {
    if (!map) {
        map = L.map('map').setView([62.3863, 17.3066], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // L.tileLayer(`https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${DATA_FIELD}/${TIMESTAMP}.png?apikey=owreIfb8Qv077OBr7kUliLhFaO4wgrV8`, {
        //     attribution: '&copy; <a href="https://www.tomorrow.io/weather-api">Powered by Tomorrow.io</a>',
        // }).addTo(map);
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

            locationL = location.lat;
            locationLng = location.lng;

            
            if (marker) {
                map.removeLayer(marker);
            }

            marker = L.marker([location.lat, location.lng]).addTo(map);

            marker.bindPopup('plats du söker');
            marker.openPopup();
            await weatherData(locationL, locationLng);

        } else {
            document.getElementById("error").innerHTML = "<p>Platsen hittades inte!</p>";
        }

    } catch (error) {
        console.error('Error:', error);
        document.getElementById("error").innerHTML = "<p>Ett fel uppstod när platsdata skulle hämtas.!</p>";
    }
}



async function weatherData(locationL, locationLng) {
    const weatherInfoDiv = document.getElementById("prognos");
    const prognosUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${locationL},${locationLng}&apikey=owreIfb8Qv077OBr7kUliLhFaO4wgrV8`;
    try {
        
        const response1 = await fetch(prognosUrl);
        const data1 = await response1.json();
        
        weatherInfoDiv.innerHTML = "";
        let daily = data1.timelines.daily;
        daily.forEach(element => {
            let dataForm = formatDate(element.time);
            weatherInfoDiv.innerHTML += `<section>
                <h2>${dataForm}</h2>
                <p>Högst: ${element.values.temperatureMax}&#8451</p>
                <p>lägst: ${element.values.temperatureMin}&#8451</p>
                <img src='./weather_icons/${element.values.weatherCodeMax}.png' alt='Powered by Tomorrow.io'>
                </section>`;
        });
        
    } catch (error) {
        console.log("något gick fel" + error)
    }
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    let day = date.getDay();
    let weekdays = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
    let month = date.getMonth() +  1;
    let days = date.getDate();
    return `${weekdays[day]} ${days}/${month}`;
}



document.getElementById('platsBtn').addEventListener('click', findLocation);
window.onload = initMap;

