"use strict";

import { apiKey as apiKey } from './apiKey.js';
import { sort_by } from './sortering_fun.js';
import { searchMovieOrShow } from './search_fun.js';
import { changeQuantity } from './quantity_fun.js'; 
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
    if (quantity > 0) {
        movieResultsAL.innerHTML = '';
    }
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
                            <img src="https://image.tmdb.org/t/p/w500/${media.poster_path}?width=300"  alt="${media.original_title}" data-lightbox="image-${index}">
                            <section class="data">
                                <h2>${media.title || media.name}</h2>
                                <span class="original_language">${media.original_language || ''}</span>
                                <hr>
                                <p><strong>Description:</strong> ${media.overview || 'Beskrivning saknas'}</p>
                                <form class="languageOptions" method="POST">
                                <label for="languageSelect_${index}">välj språk:</label>
                                <select class="languageSelect" id="languageSelect_${index}">
                                    <option value="en">Engelska</option>
                                    <option value="sv">Svenska</option>
                                    <option value="fr">Franska</option>
                                    <option value="es">Spanska</option>
                                    <option value="it">Italinska</option>
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


// Händelselyssnare för att ändra antal sidor som visas
const quantity = document.getElementById("quantity");
quantity.addEventListener('change', () => {
    changeQuantity(apiKey, getAllMedia);
});


// Händelselyssnare för att ändra filmtyp eller TV-program
let movieTypeSelector = document.getElementById("typeSelect");
movieTypeSelector.addEventListener('change', () => {
    sort_by(apiKey, getAllMedia, movieTypeSelector.value);
});

sort_by(apiKey, getAllMedia, movieTypeSelector.value);
// Händelselyssnare för sökmotor när användaren skriver film eller tv namn
let MyBtn = document.getElementById("Btn");
MyBtn.addEventListener('click', () => searchMovieOrShow(apiKey));


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

    // console.log(descriptionElement);
}

// Ändra din befintliga kod för att inkludera en klickhändelse för översättningsknapp
document.addEventListener('click', (event) => {
    const isTranslateButton = event.target.tagName === 'BUTTON' && event.target.textContent === 'Översätt beskrivning';
    
    if (isTranslateButton) {
        const buttonIndex = parseInt(event.target.getAttribute('data-index'), 10);
        translator(buttonIndex);
    }
});

