"use strict";

// Händelselyssnare för att ändra antal sidor som visas
export function changeQuantity(apiKey, getAllMedia) {
    const quantityValue = document.getElementById("quantity").value;
    const sortingData = document.getElementById("typeSelect").value;
    let sortUrl;

    if (sortingData === "movie") {
        sortUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
    } else {
        sortUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc`;
    }
    
    getAllMedia(sortUrl, quantityValue);
}