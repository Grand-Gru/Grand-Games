"use strict";

// IMPORTS
import { createElements, createElementsFavorite } from "./gameCards.js";

// CONSTANTES
const button_header = document.getElementById("button_header");
const sideBarItens = document.getElementById("side-bar-itens");
const selectSort = document.getElementById("order");
const buttonPressed = document.getElementsByClassName("pressed");
const options = document.getElementById("options");
const sideBar = document.getElementById("side-bar");
const rollback = document.getElementById("rollback");
//Criando Eventos
window.onscroll = function (e) {    
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        createElements();
        rollback.classList.remove("rollback-initial");
        rollback.classList.add("rollback");
    }
};

selectSort.addEventListener('change', e => changeGames());


document.getElementById("flex-logo").addEventListener('click', e =>{
location.reload();
})

document.addEventListener( "click", (e) => {
    if(e.target === options && sideBar.className === 'side-bar'){
        sideBar.classList.remove("side-bar");
        sideBar.classList.remove("side-bar");
        sideBar.classList.add("side-bar-cell");
    }
    else{
        sideBar.classList.remove("side-bar-cell");
        sideBar.classList.add("side-bar");
    }

})

for (const button of button_header.children) { // cria eventos para quando um botão do header é apertado

    button.addEventListener('click', e => {

        if (button.id === 'favoritos') {
            buttonPressed[0].classList.remove("pressed");
            buttonPressed[0].classList.remove("pressed");


            button.className = 'pressed';
            document.getElementById("game-line").classList.add("game-line-disabled");
            document.getElementById("banner").innerHTML = `
                <div class ="favorites-flex">
                    <div class="favorite-line"></div>
                        <img class="favorite-star" src="./img/star-hover.png">
                    <div class="favorite-line"></div>
                </div>`;
                createElementsFavorite();
        } else {
            if(buttonPressed.length === 1){
                document.getElementById("home").classList.add("pressed")
            }
            document.getElementById("game-line").classList.remove("game-line-disabled");
            buttonVerification(button.id);
        }
    })
}

for (const sideBarIten of sideBarItens.children) // cria eventos para quando um botão da sideBar é apertado
    sideBarIten.addEventListener('click', e => {
        if (buttonPressed[0].id === 'favoritos') {
            buttonPressed[0].classList.remove("pressed");
            document.getElementById("game-line").classList.remove("game-line-disabled");
            document.getElementById("all").classList.add("pressed");
        }
        for (const tagButton of sideBarItens.children)
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
    createElements(options[1].id, value, options[0].id);//options na posilcao 1 => tag na posicao 0 => plataforma
}

function buttonVerification(id) {
    for (const button of button_header.children) {
        if (button.id === id) {
            button.className = 'pressed';
        }
        else {
            button.className = '';
        }
    }
    changeGames();

}

