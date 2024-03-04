'use strict';



// const detectLanguage = async (text) => {
//     try {
//         let response = await translate.detect(text);
//         return response[0].language;
//     } catch (error) {
//         console.log(`Error at detectlanguage--- ${error}`);
//         return 0;
//     }
// }

// detectLanguage('idag är måndag')
//     .then((res) => {
//         console.log("språket är "+res);
//     })
//     .catch((error) => {
//         console.log(error);
//     });


    // const translateText = async (text, targetLanguage) => {
    //     try {
    //         let [response] = await translate.translate(text, targetLanguage);
    //         return response
    //     } catch (error) {
    //         console.log(`error at translate text--- ${error}`);
    //         return 0;
    //     }
    // }

    // translateText('det är måndag', 'it')
    // .then((res) => {
    //     console.log(res);
    // })
    // .catch((err) => {
    //     console.log(err);
    // });

const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS['translate-projrct'] // or CREDENTIALS.translate_projrct
});

async function quickStart(text, target) {
    const [translation] = await translate.translate(text, target);
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
}

quickStart("Hello, world!", 'ru');






// Händelselyssnare för att översätta beskrivningen baserat på språkval
const languageSelectors = document.querySelectorAll('.languageSelect');

languageSelectors.forEach((language, index) => {
    language.addEventListener('change', (event) => translator(event, index));
}); 

async function translator(event, index) {
    if (event) {
        event.preventDefault();  
    }

    const descriptionElement = document.getElementById('movieResults').querySelectorAll('p')[index];
    const description = descriptionElement.innerText;
    let languageValue = languageSelectors[index].value;
    
    try {
        const translationResponse = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${translationApiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: description,
                target: languageValue,
            }),
        });

        if (!translationResponse.ok) {
            throw new Error(`Translation request failed with status: ${translationResponse.status}`);
        }

        const translationData = await translationResponse.json();

        if (translationData && translationData.data && translationData.data.translations) {
            const translatedText = translationData.data.translations[0].translatedText;

            const translatedDescriptionDiv = document.getElementById('translate');
            translatedDescriptionDiv.innerHTML = `<h3>Översatt beskrivning:</h3>`;
            translatedDescriptionDiv.innerHTML += `<p>${translatedText}</p>`;
        } else {
            console.error('Unexpected translation response format:', translationData);
        }
    } catch (error) {
        console.error('Error during translation:', error);
    }
}

// förberedd händelselyssnare och funktioner när DOM laddas

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.languageOptions button');
    buttons.forEach((button, index) => {
        button.addEventListener('click', (event) => translator(event, index));
    });
});



