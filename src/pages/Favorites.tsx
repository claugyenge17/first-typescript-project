import { FavoriteItem } from "../components/FavoriteItem";
import { useFavorites } from "../context/FavoritesContext";

export function Favorites() {
    const { favoriteItems, clearFavorites } = useFavorites()

    return (
        <>
            {favoriteItems.map(item => (
                <FavoriteItem key={item.id} {...item}/>
            ))}
        </>
    )
}