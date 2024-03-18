"use strict";

// Sök efter filmer eller TV shows baserat på användarinmatning

export async function searchMovieOrShow(apiKey) {
    event.preventDefault(); 
    let filtering = [];
    const movieName = document.getElementById('movieInput').value;
    console.log(movieName);
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
        });
    }
}
