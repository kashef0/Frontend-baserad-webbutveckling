"use strict";

// const url = "https://studenter.miun.se/~mallar/dt211g/";

// async function getData() {
//     let number = 0;
//     try {
//         const response = await fetch(url);
//         let programData = await response.json();

//         programData.find(({admissionRound, type}) => admissionRound === "HT2023" && type === "Kurs");
//         console.table(programData);

//         programData.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

//         const greatestSixNumbers = programData.slice(0, 6);

//         programData.forEach(element => {
            

//             if (element.applicantsTotal > number) {
//                 number += element.applicantsTotal;
//             }

//             if (element.type === "kurs" && element.admissionRound === "HT2023") {

//             }
//            Logga elementets namn
//         });

//         console.log(programData);
//     } catch (error) {
//         console.error(error); 
//     }
// }

// getData();

