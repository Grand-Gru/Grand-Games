"use strict";

// IMPORTS
import { createElements } from "./gameCards.js";

// CONSTANTES
const button_header = document.getElementById("button_header");
const sideBarItens = document.getElementById("side-bar-itens");
const selectSort = document.getElementById("order");

//Criando Eventos
window.onscroll = function (e) {
    if ((window.innerHeight + window.scrollY + 100) >= document.body.offsetHeight)
        createElements();
        
};

selectSort.addEventListener('change', e => changeGames());



for(const button of button_header.children){ // cria eventos para quando um botão do header é apertado
    
    button.addEventListener('click', e => {
             
        if(button.id === 'favoritos'){ 
            document.getElementById("pc").classList.remove("pressed");   
            document.getElementById("browser").classList.remove("pressed");     
            document.getElementById("all").classList.remove("pressed");  
            
     
            button.className = 'pressed';  
            document.getElementById("game-line").classList.add("game-line-disabled");
            document.getElementById("banner").innerHTML= `
            <div class ="favorites-flex">
                <div class="favorite-line"></div>
                <img class="favorite-star" src="../img/star-hover.png">
                <div class="favorite-line"></div>
            </div>
        `
        document.getElementById("games").innerHTML += `   
        <div class = "mini-banner">
            <a href="${data.game_url}"> <img src="${data.thumbnail}"  class="card"> </a>
            <div class="card-content">
                <div>
                    <span class="release-date">${data.release_date}</span>
                    <div class="text-content">
                        <h1 class="title">${data.title}</h1>
                        <span class="description">${data.short_description}</span>
                    </div>
                </div>
                <div class="star" id="${data.id}"> </div>  
            </div>
        </div>`;
        }else{ 
            document.getElementById("game-line").classList.remove("game-line-disabled");
            buttonVerification(button.id);
        }
    })
}

for(const sideBarIten of sideBarItens.children) // cria eventos para quando um botão da sideBar é apertado
    sideBarIten.addEventListener('click', e => {
        for(const tagButton of sideBarItens.children)
            tagButton.classList.remove('pressed');
        sideBarIten.classList.add('pressed'); 
        changeGames();
    })

// Funções

createElements("home", "popularity", "all");// Cria o primeiro banner e os cards

const changeGames = () => { // pega os parametros para criar novos elementos
    const options = document.getElementsByClassName("pressed");
    const sortMethod = document.getElementById("order");
    const value = sortMethod[sortMethod.selectedIndex].value;
    createElements(options[1].id, value, options[0].id);
}

function buttonVerification(id) {
    for(const button of button_header.children){
        if(button.id === id){ 
            button.className = 'pressed';  
        }
        else{
             button.className = '';
        }
    }    
    changeGames();

}

