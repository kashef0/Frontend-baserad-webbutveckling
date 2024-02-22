"use strict";
import { getResponsiveFont } from './enhet_omvandling.js';
const url = "https://studenter.miun.se/~mallar/dt211g/";

getResponsiveFont();

async function getData() {
    const ctx = document.getElementById('ct-chart').getContext('2d');
    try {
        const response = await fetch(url);
        let programData = await response.json();
        let filteredData = [];


        programData.forEach(element => {
            if (element.admissionRound === "HT2023" && element.type === "Kurs") {
                filteredData.push(element);
            }
        });

        filteredData.sort((num1, num2) => num2.applicantsTotal - num1.applicantsTotal);
        const resultNumber = filteredData.slice(0, 6);

        const sum = resultNumber.reduce((total, current) => total + parseInt(current.applicantsTotal), 0);     
        const chartConfig = {
            type: 'bar',
            data: {
                labels: resultNumber.map(el => el.name.split(' ')),
                datasets: [{
                    label: `${sum} of Votes`,
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
                responsive: true,
                scales: {   
                    x: {
                        ticks: {
                            autoSkip: false, // Inaktivera automatisk överhoppning av ticks
                            maxRotation: 0, // inte Vrid ticks till 0 grader
                            maxTicksLimit: 1, // Begränsa antalet ticks som visas
                            font: getResponsiveFont(3)
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                    
                },
                maintainAspectRatio: false,
                
                layout: {
                    padding: 20
                },
                plugins: {
                    legend: {
                        labels: {
                            font: getResponsiveFont(2),
                        }
                    },
                    subtitle: {
                        font: getResponsiveFont(2),
                        display: true,
                        text: 'statistik över de 6 mest sökta kurserna på Mittuniverstetet, HT23'
                    }
                }
            }
        };
        
        new Chart(ctx, chartConfig);


    } catch (error) {
        document.getElementById("error").innerHTML = "<p>Något gick fel, prova igen senare!</p>";
    }
    
}
getData();

