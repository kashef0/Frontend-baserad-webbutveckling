"use strict";

const url = "https://studenter.miun.se/~mallar/dt211g/";



async function getData_cirkel() {
    const ctx = document.getElementById('chart').getContext('2d');
    try {
        const response = await fetch(url);
        let programData_cirkel = await response.json();
        let filteredData_cirkel = [];


        programData_cirkel.forEach(el => {
            if (el.admissionRound === "HT2023" && el.type === "Program") {
                filteredData_cirkel.push(el);
            }
        });

        filteredData_cirkel.sort((num1, num2) => num2.applicantsTotal - num1.applicantsTotal);
        const resultNumber = filteredData_cirkel.slice(0, 5);

        const sum = resultNumber.reduce((total, current) => total + parseInt(current.applicantsTotal), 0);
        const getResponsiveFont = (widthNumber) => {
            return function (context) {
                var width = context.chart.width;
                var sizeInEm = width / widthNumber;
                var sizeInRem = sizeInEm / 16; // ändra till rem enhet
        
                return {
                    weight: 'bold',
                    size: sizeInRem
                };
            };
        };
        
        const responsiveFont = getResponsiveFont(2);

        new Chart(ctx, {
            type: 'doughnut',
            data: {
            labels: resultNumber.map(el => el.name),
            datasets: [{
            label:  `${sum} of Votes`,
            data: resultNumber.map(el => el.applicantsTotal),
            backgroundColor: [
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 165, 235, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
                "rgba(255,159,64, 1)",
                "rgba(255,99,132, 1)",
                "rgba(54,165,235, 1)",
                "rgba(75,192,192, 1)",
                "rgba(153,102,255, 1)",
            ],
            hoverBackgroundColor: [
                "rgba(255,159,64, 1)",
                "rgba(255,99,132, 1)",
                "rgba(54,165,235, 1)",
                "rgba(75,192,192, 1)",
                "rgba(153,102,255, 1)",
            ],
            borderWidth: 1,
            }]
            },
            options: {
                
                layout: {
                    padding: 20
                },
                plugins: {
                    subtitle: {
                        font: responsiveFont,
                        display: true,
                        text: 'statistik över de 5 mest sökta programmen på Mittuniverstetet, HT23'
                    },
                }
                
            }
            });
        
    } catch (error) {
        document.getElementById("error").innerHTML = "<p>Något gick fel, prova igen senare!</p>";
    }
}
getData_cirkel();

