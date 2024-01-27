"use strict";

// const url = "https://dahlgren.miun.se/ramschema_ht23.php";


// window.onload = getData();

// document.getElementById("code").addEventListener("click", () => getData("code"));
// document.getElementById("name").addEventListener("click", () => getData("coursename"));
// document.getElementById("progression").addEventListener("click", () => getData("progression"));


// async function getData(item) {
//     try {
//         const response = await fetch(url);
//         let kursData = await response.json();

//         kursData.sort((a, b) => (a[item] > b[item]) ? 1 : -1);
//         // if (!response.ok) {
//         //     throw new Error('felaktigt svar från servern');

//         // }
//         // let kurs = kursData.map(kod => kod);

//         landData(kursData);

//     } catch (error) {
//         console.error('Det uppstod ett fel', error.message);
//     }
// }

// function landData(kurs) {
    
//     const kursInfoEl = document.getElementById("kursData");
//     kursInfoEl.innerHTML = `
//     <tr class="thead">
//         <th id="code">kursKod</th>
//         <th class="kursnamn_rubrik" id="name">kursnamn</th>
//         <th id="progression">progression</th>
//     </tr>
// `
//     kurs.forEach((element) => {
//         kursInfoEl.innerHTML += `
//         <tr class="kursList">
//         <td class="kurskod">${element.code}</td>
//         <td class="kursNamn">${element.coursename}</td>
//         <td  class="progression">${element.progression}</td>
//         </tr>
//         `;
        
//     });
    
// }



const url = "https://dahlgren.miun.se/ramschema_ht23.php";
let kursData;

window.onload = getData();

async function getData() {
    try {
        const response = await fetch(url);
        kursData = await response.json();
        if (!response.ok) {
            throw new Error('felaktigt svar från servern');

        }
        // let kurs = kursData.map(kod => kod);

        landData(kursData);

    } catch (error) {
        console.error('Det uppstod ett fel', error.message);
    }
}

function landData(kurs) {
    
    let kursInfoEl = document.getElementById("kursData");
    kursInfoEl.innerHTML = `
    <tr class="thead">
        <th id="code"><a href="#" role="button">kursKod</a></th>
        <th class="kursnamn_rubrik" id="name" role="button"><a href="#">kursnamn</a></th>
        <th id="progression"><a href="#" role="button">progression</a></th>
    </tr>
    `
    kurs.forEach((element) => {
        kursInfoEl.innerHTML += `
        <tr class="kursList">
        <td class="kurskod">${element.code}</td>
        <td class="kursNamn">${element.coursename}</td>
        <td  class="progression">${element.progression}</td>
        </tr>
        `;
        
    });

    document.getElementById("code").addEventListener("click", () => sortBy("code"));
    document.getElementById("name").addEventListener("click", () => sortBy("coursename"));
    document.getElementById("progression").addEventListener("click", () => sortBy("progression"));
    document.getElementById("search").addEventListener('input', function (El) {filterBy(El.target.value.toLowerCase())});

}

function sortBy(item) {
    let sortering = [...kursData];
    sortering.sort((a, b) => (a[item ] > b[item]) ? 1 : -1);
    landData(sortering);
    
}
function filterBy(valueInput) {
    let filtering = kursData.filter((land) => {
        return land.code.includes(valueInput) || land.coursename.toLowerCase().includes(valueInput) || land.progression.toLowerCase().includes(valueInput);
    });
    landData(filtering);
    
}

