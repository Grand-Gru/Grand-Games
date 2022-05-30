"use strict";

import {GAMES_DATA, saveGamesInfoSort} from "./gameData.js";

const createCard = data => { // cria o card e coloca a thumbmail
    document.getElementById("games").innerHTML += `
        <a class="card" id="${data.id}" href="${data.game_url}">
            <h1 class="title">${data.title}</h1>
        </a>
    `;
    document.getElementById(data.id).style.backgroundImage = 'url(' + data.thumbnail +')';
}

const createBanner = data => {// altera o banner
    document.getElementById("banner").style.backgroundImage = 'url(' + data.thumbnail.replace("thumbnail.jpg","background.webp") +')';
    document.getElementById("banner").href = data.game_url;
}


const filterGamesInfo = async (tag, platform, sortMethod) => {
    let gamesInfo = GAMES_DATA;
    if (sortMethod) {
        if(!gamesInfo[0].sort[sortMethod])
            await saveGamesInfoSort(sortMethod);
        gamesInfo = GAMES_DATA.sort((a, b) => a.sort[sortMethod] - b.sort[sortMethod]);
    }
    if((tag || platform) && tag !== "home")
        gamesInfo = gamesInfo.filter(gameInfo => (gameInfo.tag === tag || !tag) && (gameInfo.platform === platform || !platform))
    return gamesInfo;
}

async function* infoController(tag, sortMethod, platform){
    let gamesInfo = await filterGamesInfo(tag, sortMethod, platform);
    createBanner(gamesInfo[0]);
    for (let i = 1; i < gamesInfo.length; i++) {
        createCard(gamesInfo[i]);
        if(i%9 === 0) yield;
    }
}
const generateElements = infoController();
export const createElements = async (tag, sortMethod, platform) => {
    if(tag || sortMethod || platform) 
        generateElements = infoController(tag, sortMethod, platform);
    generateElements.next();
}   