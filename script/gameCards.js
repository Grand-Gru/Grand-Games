"use strict";

import { GAMES_DATA, saveGamesInfoSort } from "./gameData.js";

const createCard = data => { // cria o card e coloca a thumbmail
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
            <div class="star" id="star ${data.id}"> </div>  
        </div>
    </div>`;
}

const createBanner = data => {// altera o banner
    document.getElementById("banner").style.backgroundImage = 'url(' + data.thumbnail.replace("thumbnail.jpg", "background.webp") + ')';
    document.getElementById("banner").href = data.game_url;
}


const filterGamesInfo = async (tag, sortMethod, platform) => { // filtra as informações do jogo
    let gamesInfo = GAMES_DATA;
    if (sortMethod) {
        if (!gamesInfo[0].order[sortMethod])
            await saveGamesInfoSort(sortMethod);
        gamesInfo = GAMES_DATA.sort((a, b) => a.order[sortMethod] - b.order[sortMethod]);
    }
    if ((tag || platform) && tag !== "home")
        gamesInfo = gamesInfo.filter(gameInfo => (gameInfo.tag === tag || !tag) && (gameInfo.platform === platform || !platform));
    return gamesInfo;
}

async function* infoController(tag, sortMethod, platform) {
    let gamesInfo = await filterGamesInfo(tag, sortMethod, platform);
    document.getElementById("games").innerHTML = "";
    createBanner(gamesInfo[0]);
    for (let i = 1; i < gamesInfo.length; i++) {
        createCard(gamesInfo[i]);
        if (i % 9 === 0) yield;
    }
}
var generateElements = infoController();

export const createElements = async (tag, sortMethod, platform) => {
    if (tag || sortMethod || platform)
        generateElements = infoController(tag, sortMethod, platform);
    await generateElements.next();
}   