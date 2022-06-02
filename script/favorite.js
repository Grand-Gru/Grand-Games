localStorage.favorites = '[]';

function saveFav(id){
    const favorites = JSON.parse(localStorage.favorites);
    if(favorites.includes(id)){
        document.getElementById(id).classList.remove("shining-star");
        localStorage.favorites = JSON.stringify(favorites.filter(idFav => idFav !== id));
    }else{
        document.getElementById(id).classList.add("shining-star");
        favorites.push(id);
        localStorage.favorites = JSON.stringify(favorites);
    }
}
