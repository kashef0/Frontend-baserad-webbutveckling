"use strict";
export { getResponsiveFont };

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

getResponsiveFont();