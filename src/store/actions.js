// Adaugam actiunile necesare store-ul de favorite: add si remove
export function addToFavorites(news) {
    return {
        type: "ADD_TO_FAVORITES",
        payload: news
    }
}

export function removeFromFavorites(newsId){
    return {
        type: "REMOVE_FROM_FAVORITES",
        payload: newsId
    }
}