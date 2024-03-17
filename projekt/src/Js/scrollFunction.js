"use strict";



window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        
        document.getElementById("scroll_function").style.backgroundColor = "darken(#395886, 25%);";
        document.getElementById("scroll_function").style.transition = "all .5s!important";
        document.getElementById("scroll_function").style.transitionDuration = "0.6s";
        document.getElementById("scroll_function").style.opacity = ".8";
        document.getElementById("scroll_function").style.borderRadius = "10px";
        document.getElementById("scroll_function").style.transform = "scale(.7)";
        
        
    } else {
        
        document.getElementById("scroll_function").style.opacity = "1";
        document.getElementById("scroll_function").style.transform = "scale(1)";
        document.getElementById("scroll_function").style.transitionDuration = "0.4s";
        
    }
}
