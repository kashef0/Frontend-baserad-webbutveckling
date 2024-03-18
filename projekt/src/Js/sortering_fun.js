"use strict";


// Händelselyssnare för att ändra filmtyp eller TV program
export {sort_by};

async function sort_by(apiKey, getAllMedia, sortingData) {
    let sortUrl;
    if (sortingData === "movie") {
        sortUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
    } else {
        sortUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc`;
    }
    getAllMedia(sortUrl, 1);
}
