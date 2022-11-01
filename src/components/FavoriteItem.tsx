import { Stack } from "react-bootstrap"
import { useFavorites } from "../context/FavoritesContext"
import { useGetProducts } from "../hooks/useGetProducts"

type FavoriteItemProps = {
    id: number
}

export function FavoriteItem({ id }: FavoriteItemProps){
    const { removeFromFavorites } = useFavorites()
    
   

    return (
        <>
        </>
    )
}