"use strict";
const TAGS_LIST = [];
const API_OPTIONS = { // Declaração das cahves para RapidAPI
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
        'X-RapidAPI-Key': '03c090ac21msh4e7ac00b13dc67cp13104fjsn56d1012cf8b6'
    }
};
const API_URL = 'https://free-to-play-games-database.p.rapidapi.com/api/';//declarando url base da API

const createRequest = async url => {// Faz o request e formata para json
    try {
        const response = await fetch(API_URL + url, API_OPTIONS);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const formatGameInfos = (gamesInfos = []) => // formata os dados vindo da API
    gamesInfos.map(gameInfos => {
        return {
            id: gameInfos.id,
            title: gameInfos.title,
            thumbnail: gameInfos.thumbnail,
            platform: gameInfos.platform === "PC (Windows)" ? "pc" :  gameInfos.platform === "Web Browser" ? "browser" : "all",
            tag: [],
            release_date: gameInfos.release_date,
            short_description: gameInfos.short_description,
            publisher: gameInfos.publisher,
            developer: gameInfos.developer,
            game_url: gameInfos.game_url,
        }
    });

export const GAMES_DATA = await (async () => { //salva os dados dos jogos formatados 
    const response = await createRequest(`games?platform=all&sort-by=popularity`);
    return formatGameInfos(response);
})();;

export const filterGameInfoByTag = async tag => {
    if (!TAGS_LIST.includes(tag)){
        TAGS_LIST.push(tag);
        const response = await createRequest(`games?category=${tag}`);
        for (const gameTag of response)
            GAMES_DATA.find(gameInfo => gameInfo.id === gameTag.id).tag.push(tag);
    }
    return GAMES_DATA.filter(gameInfo => gameInfo.tag.includes(tag));
}