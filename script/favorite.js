const favorites = [];

function saveFav(id){
    document.getElementById(id).classList.add("shining-star");
    favorites.push(id);
    console.log(favorites);
    console.log(!!favorites.find(elementId => elementId === id))
    // for(const verification of favorites){
    //     if(verification.id = id){
    //         document.getElementById(id).classList.add("shining-star");

    //     }

}