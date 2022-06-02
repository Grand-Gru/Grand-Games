<<<<<<< HEAD


function saveFav(id){
    
    document.getElementById(id).classList.toggle("shining-star");
    
}
=======
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
>>>>>>> 791854cc6fd6d2174c06025510a81ea6efbf5834
