"use strict";

import { createElements } from "./gameCards.js";


createElements();

window.onscroll = function (e) {
    if ((window.innerHeight + window.scrollY + 100) >= document.body.offsetHeight)
        createElements();
};
const button_header = document.getElementById("button_header");


for(const button of button_header.children){
    button.addEventListener('click', e => {
        buttonVerification(button.id)
    })
}


function buttonVerification(id) {
    for(const button of button_header.children){
        if(button.id === id){ 
            createElements(false,false,id)
            button.className = 'pressed';  
        }else{
             button.className = '';
        }
    }
}


