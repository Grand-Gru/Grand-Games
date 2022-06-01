"use strict";

import { GAMES_DATA, filterGameInfoByTag } from "./gameData.js";

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
    const releaseDate = new Date(data.release_date);
    document.getElementById("banner").innerHTML= `
        <video class="featuredvideo" loop autoplay muted="" poster="${data.thumbnail}">
            <source src="https://www.freetogame.com/g/${data.id}/videoplayback.webm" type="video/webm">
        </video>
        <div class="game-info">
        <span class="game-title">${data.title}</span>
        <p class="game-desciption">${data.short_description}</p>
        <div class="footer">
            <a href="${data.game_url}">Acessar Jogo</a>
            <span class="developer">${data.developer} ${releaseDate.getFullYear()}</span>
        </div>
    </div>
    `
}


const filterGamesInfo = async (tag, sortMethod, platform) => { // filtra as informações do jogo
    let gamesInfo = GAMES_DATA;

    if(tag !== "home")
        gamesInfo = await filterGameInfoByTag(tag);

    if(sortMethod === "alphabetical")
        gamesInfo = gamesInfo.sort((a, b) => a.title.localeCompare(b.title));
    
    if (sortMethod === "release_date"){
        gamesInfo = gamesInfo.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
    }

    if (platform !== "all")
        gamesInfo = gamesInfo.filter(gameInfo => gameInfo.platform === platform || gameInfo.platform === "all");

    return gamesInfo;
}

function* infoController(gamesInfo) {
    document.getElementById("games").innerHTML = "";
    createBanner(gamesInfo[0]);
    for (let i = 1; i < gamesInfo.length; i++) {
        createCard(gamesInfo[i]);
        if (i % 9 === 0) yield;
    }
}
var generateElements;

export const createElements = async (tag, sortMethod, platform) => {
    if (tag || sortMethod || platform){
        const gamesInfo = await filterGamesInfo(tag, sortMethod, platform);
        generateElements = infoController(gamesInfo);
    }
    await generateElements.next();
}   
