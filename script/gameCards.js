export const gamesInfo = {};
const options = { // Declaração das cahves para RapidAPI
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
        'X-RapidAPI-Key': '03c090ac21msh4e7ac00b13dc67cp13104fjsn56d1012cf8b6'
    }
};

async function requestInfos(tag, sort) {
    let params = `?platform=all&sort-by=${sort}${tag != "home" ? `&category=${tag}` : ``}`
    try {
        const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games${params}`, options);
        return await response.json();
    } catch (error) {

    }
};

async function requestGameInfo(id) {
    try {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {

    }
}

async function getTagSelectedList() {
    const tag = "home";
    const sort = "popularity";
    const platform = "all";

    if (!gamesData?.[tag]?.[sort]) {
        gamesData[tag][sort] = await requestInfos(tag, sort);
        if (gamesData[tag][sort][0])
            gamesData[tag][sort][0] = await requestGameInfo(gamesData[tag][sort][0].id);
    }
    if (platform === "all")
        return gamesData[tag][sort];
    return gamesData[tag][sort].include()

}
export async function* createCards() {
    createBanner();
    for (let i = 1; i < gamesData.length; i++) {
        createCard(getTagSelectedList());
        if (i % 9) yield;
    }
};


gamesInfo["home"]["popularity"] = await requestInfos();
