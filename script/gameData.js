"use strict";

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

    }
}

const formatGameInfos = async (gamesInfos = []) => // formata os dados vindo da API
    gamesInfos.map(gameInfos => {
        return { 
            id: gameInfos.id,
            title: gameInfos.title,
            thumbnail: gameInfos.thumbnail,
            platform: gameInfos.platform === "PC (Windows)" ? "pc" : "browser",
            genre: gameInfos.genre.toLowerCase().trim(),
            release_date: gameInfos.release_date,
            short_description: gameInfos.short_description,
            publisher: gameInfos.publisher,
            developer: gameInfos.developer,
            gameurl: gameInfos.game_url,
            sort:{
                alphabetical: undefined, 
                release_date: undefined
            }
        }
    });

export const GAMES_DATA = (async () => { //salva os dados dos jogos formatados 
    const response = await createRequest(`games?platform=all&sort-by=popularity`);
    return await formatGameInfos(response);
})();

export const saveGamesInfoSort = async sortMethod => { //salva a ordem do metodo escolhido
    const response = await createRequest(`games?platform=all&sort-by=${sortMethod}`);
    for (let i = 1; i <= response.length; i++)
        GAMES_DATA.filter(
            gameInfo =>  gameInfo.id === response[i].id
        )[0].sort[sortMethod] = i;
}

