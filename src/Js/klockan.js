"use strict";


function formatTime() {

    let d = new Date(),
        second = d.getSeconds().toString().length == 1 ? '0' + d.getSeconds() : d.getSeconds(),
        minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
        ampm = d.getHours() >= 12 ? 'pm' : 'am',
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return '<h2>' + hours + '<span>:' + minutes + ':' +second + '</span></h2><small> '+ ampm + '</small><h3>' + days[d.getDay()] + '<br><span>' + months[d.getMonth()] + '-' + d.getDate() + '</span>-' + d.getFullYear() + '</h3>';
}

setInterval(function () {
    document.getElementById("currentTime").innerHTML = formatTime();
}, 1000);

