"use strict";

const apiKey = '574e4fc7dc4f6a633dbe547a131dc735';


async function fetchData(url, page = 1) {
    try {
        const response = await fetch(`${url}&page=${page}`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error:', error);
        return 'misslyckades anroppning';
    }
}

async function getAllMedia(sortUrl) {
    let movieResultsAL = document.getElementById("movieResults");
    // const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
    // const tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc`;

    let maxPages = 1; // Set the maximum number of pages to fetch
    try {
        for (let page = 1; page <= maxPages; page++) {
            const movieResults = await fetchData(sortUrl, page);
            // const tvResults = await fetchData(tvUrl, page);
            console.log(movieResults);
            // const allMedia = [...movieResults];
            movieResultsAL.innerHTML = "";
            if (movieResults.length > 0) {
                movieResults.forEach(media => {
                    // console.log(media.title || media.name);
                    movieResultsAL.innerHTML += `
                    <section>
                    <h2>${media.title || media.name}</h2>
                    <img src="https://image.tmdb.org/t/p/w500/${media.poster_path}">
                    <p><strong>Beskrivning:</strong> ${media.overview}</p>
                    </section>
                    `;
                });
            } else {
                console.log('inga medier resultat hittades.');
            }
        }

    } catch (error) {
        console.error('Error:', error);
    }

}

window.onload = function() {
    const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
    getAllMedia(movieUrl);
}

async function searchMovieOrShow() {
    let filtering = [];
    const movieName = document.getElementById('movieInput').value;

    // Hämta filminformation från TMDb API
    const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`);
    const movieData = await movieResponse.json();

    if (Array.isArray(movieData.results)) {
        // Use the filter method to filter movies based on the title
        filtering = movieData.results.filter(movie =>
            movie.title.toLowerCase().includes(movieName.toLowerCase())
        );

        // console.log(filtering);
        // Visa filmresultat
        const movieResultsDiv = document.getElementById('movieResults');
        movieResultsDiv.innerHTML = '';
        filtering.forEach(media => {
            movieResultsDiv.innerHTML += `
            <section>
            <h2>${media.title || media.name}</h2>
            <img src="https://image.tmdb.org/t/p/w500/${media.poster_path}">
            <p><strong>Beskrivning:</strong> ${media.overview}</p>
            </section>
            `;
        });
    }
}

let movieTypeSelector = document.getElementById("typeSelect");
movieTypeSelector.addEventListener('change', sort_by);
let sortingData;
async function sort_by() {
    sortingData = document.getElementById('typeSelect').value;

    let sortUrl;
    if(sortingData === "movie") {
        sortUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
    } else {
        sortUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`;
    }
    // Hämta filminformation från TMDb API
    const movieResponse = await fetch(sortUrl);
    const movieData = await movieResponse.json();
    // console.log(movieData);
    getAllMedia(sortUrl);
}

getAllMedia();

let MyBtn = document.getElementById("Btn");
MyBtn.addEventListener('click', searchMovieOrShow);

window.getMovieDetails = async function(movieId) {
    // Hämta detaljerad filminformation från TMDb API
    const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?&append_to_response=videos&api_key=${apiKey}`);
    const detailsData = await detailsResponse.json();

    // Visa detaljerad filminformation
    const movieResultsDiv = document.getElementById('movieResults');
    movieResultsDiv.innerHTML = `<h2>${detailsData.title}</h2>`;
    movieResultsDiv.innerHTML += `<p>${detailsData.overview}</p>`;

    searchMovieOrShow();
}

async function translateDescription() {
    const description = document.getElementById('movieResults').querySelector('p').innerText;
    const language = document.getElementById('languageSelect').value;

    // Använd Google Cloud Translation API för att översätta beskrivningen
    const translationResponse = await fetch(`https://translation.googleapis.com/language/translate/v2?key=YOUR_GOOGLE_TRANSLATION_API_KEY`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: description,
            target: language,
        }),
    });
    const translationData = await translationResponse.json();

    // Visa översatt beskrivning
    const translatedDescriptionDiv = document.getElementById('translatedDescription');
    translatedDescriptionDiv.innerHTML = `<h3>Översatt beskrivning:</h3>`;
    translatedDescriptionDiv.innerHTML += `<p>${translationData.data.translations[0].translatedText}</p>`;
}











// const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`);
// const tvResponse = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`);
// const movieData = await movieResponse.json();
// const tvData = await tvResponse.json(); 
// const allMedia = [...movieData.results, ...tvData.results];
// // const movieData = await movieResponse.json();

// if (Array.isArray(allMedia)) {

//     filtering = allMedia.filter(movie => {
//         const title = movie.title || movie.name || ''; 
//         return title.toLowerCase().includes(movieName.toLowerCase());
//     });