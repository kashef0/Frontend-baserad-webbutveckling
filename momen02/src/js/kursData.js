"use strict";

async function getData() {
    const url = "https://dahlgren.miun.se/ramschema_ht23.php"
    try {
        let response = await fetch(url);

        if (!response.ok) {
            throw new error('felaktigt svar från servern');

        }

        let kursData = await response.json();
        console.table(kursData);


        
    } catch (error) {
        console.error('Det uppstod ett fel:', error.message);
    }
}

getData();