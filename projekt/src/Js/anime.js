"use strict";

import { translationApiKey as translationApiKey, apiKey as apiKey } from './apiKey.js';
const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();

// Hämta data från Api baserat på den angivna webbUrl och sidan
async function fetchData(url, page) {
    try {
        const response = await fetch(`${url}&page=${page}`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error:', error);
        return 'misslyckades anroppning';
    }
}
// Hämta och visa medieinnehåll baserat på anropade sorteringsURL och kvantitet 
async function getAllMedia(sortUrl, quantity) {
    let movieResultsAL = document.getElementById("movieResults");
    
    try {
        let allMediaContent = "";

        for (let page = 1; page <= quantity; page++) {
            const movieResults = await fetchData(sortUrl, page);
            
            movieResultsAL.innerHTML = "";
            if (movieResults.length > 0) {
                movieResults.forEach((media, index) => {
                    // console.log(media.title || media.name);
                    allMediaContent += `
                    <div class="data_container">
                        <figure class="img_container">
                            <span class="vote">${media.vote_average.toFixed(1)}</span>
                            <span class="episodes">${media.number_of_episodes || ''}</span>
                            <img src="https://image.tmdb.org/t/p/w500/${media.poster_path}?width=300" alt="${media.original_title}">
                            <section class="data">
                                <h2>${media.title || media.name}</h2>
                                <p><strong>Description:</strong> ${media.overview || 'Beskrivning saknas'}</p>
                                <form class="languageOptions" method="POST">
                                <label for="languageSelect_${index}">välj språk:</label>
                                <select class="languageSelect" id="languageSelect_${index}">
                                    <option value="en">Engelska</option>
                                    <option value="sv">Svenska</option>
                                    <option value="fr">Franska</option>
                                    <option value="es">Spanska</option>
                                    <option value="it">italinska</option>
                                    <option value="ar">Arabiska</option>
                                </select>
                                <button type="button" data-index="${index}">Översätt beskrivning</button>
                                </form>
                            </section>
                        </figure>
                    </div>
                    `;
                    translator(index);
                });
                
                
            } else {
                console.log('inga medier resultat hittades.');
            }
        }
        movieResultsAL.innerHTML = allMediaContent;
        
        
    } catch (error) {
        console.error('Error:', error);
    }
    

}
// Sök efter filmer eller TV shows baserat på användarinmatning
async function searchMovieOrShow() {
    let filtering = [];
    const movieName = document.getElementById('movieInput').value;

    const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`);
    const movieData = await movieResponse.json();

    if (Array.isArray(movieData.results)) {
        filtering = movieData.results.filter(movie =>
            movie.title.toLowerCase().includes(movieName.toLowerCase())
        );

        // console.log(filtering);
        // Visa filmresultat
        const movieResultsDiv = document.getElementById('movieResults');
        movieResultsDiv.innerHTML = '';
        filtering.forEach((media, index) => {
            const description = media.overview || 'Beskrivning saknas';
            movieResultsDiv.innerHTML += `
            <div class="data_container">
                <figure class="img_container">
                    <span class="vote">${media.vote_average.toFixed(1)}</span>
                    <span class="episodes">${media.number_of_episodes || ''}</span>
                    <img src="https://image.tmdb.org/t/p/w500/${media.poster_path}?width=300" alt="${media.original_title}">
                    <section class="data">
                        <h2>${media.title || media.name}</h2>
                        <p><strong>Description:</strong> ${media.overview || description}</p>
                        <form class="languageOptions" method="POST">
                        <label for="languageSelect_${index}">välj språk:</label>
                            <select class="languageSelect" id="languageSelect_${index}">
                            <option value="En">Engelska</option>
                            <option value="Sv">Svenska</option>
                            <option value="Fr">Franska</option>
                            <option value="Sp">Spanska</option>
                            <option value="it">Italinska</option>
                            <option value="ar">Arabiska</option>
                        </select>
                        <button type="button" data-index="${index}">Översätt beskrivning</button>
                        </form>
                    </section>
                </figure>
            </div>
            `;
        });
    }
}


// Händelselyssnare för att ändra antal sidor som visas
let quantity = document.getElementById("quantity");
quantity.addEventListener('change', changeQuantity);

function changeQuantity() {
    let quantityValue = document.getElementById("quantity").value;
    let sortingData = document.getElementById('typeSelect').value;
    let sortUrl;

    if (sortingData === "movie") {
        sortUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
    } else {
        sortUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc`;
    }

    getAllMedia(sortUrl, quantityValue);
}


// Händelselyssnare för att ändra filmtyp eller TV program

let movieTypeSelector = document.getElementById("typeSelect");
movieTypeSelector.addEventListener('change', sort_by);
let sortingData;
async function sort_by() {
    sortingData = document.getElementById('typeSelect').value;
    console.log("sortingData");
    let sortUrl;
    if(sortingData === "movie") {
        sortUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
    } else {
        sortUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc`;
    }
    getAllMedia(sortUrl, 1);
}

// Händelselyssnare för sökmotor när användaren skriver film eller tv namn
let MyBtn = document.getElementById("Btn");
MyBtn.addEventListener('click', searchMovieOrShow);

sort_by();





const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS['translate-projrct']
});

async function translator(index) {
    const descriptionElement = document.querySelector(`#movieResults .data_container:nth-child(${index + 1}) .data p`);
    
    if (!descriptionElement) {
        console.error(`Description element not found for index ${index}`);
        return;
    }

    const originalDescription = descriptionElement.textContent;
    const languageSelect = document.getElementById(`languageSelect_${index}`);
    if (!languageSelect) {
        console.error(`Language select element not found for index ${index}`);
        return;
    }
    
    const targetLanguage = languageSelect.value;

    const [translation] = await translate.translate(originalDescription, targetLanguage);
    
    // Ersätt den ursprungliga beskrivningen med den översatta
    descriptionElement.textContent = `${translation}`;

    console.log(descriptionElement);
}

// Ändra din befintliga kod för att inkludera en klickhändelse för översättningsknapp
document.addEventListener('click', (event) => {
    const isTranslateButton = event.target.tagName === 'BUTTON' && event.target.textContent === 'Översätt beskrivning';
    
    if (isTranslateButton) {
        const buttonIndex = parseInt(event.target.getAttribute('data-index'), 10);
        translator(buttonIndex);
    }
});

// Update your HTML generation code to include the data-index attribute in the button
// Add data-index="${index}" to the button in the HTML template
// Example:
// <button type="button" data-index="${index}">Översätt beskrivning</button>



// const {Translate} = require('@google-cloud/translate').v2;
// require('dotenv').config();

// const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// const translate = new Translate({
//     Credential: CREDENTIALS,
//     projectId: CREDENTIALS.translate-projrct
// });

// const detectLanguage = async (text) => {
//     try {
//         let response = await translate.detect(text);
//         return response[0].language;
//     } catch (error) {
//         console.log(`Error at detectlanguage--- ${error}`);
//         return 0;
//     }
// }
// detectLanguage('today is monday')
//         .then((res) => {
//             console.log(res);
//         })
//         .catch((err) => {
//             console.log(error);
//         })