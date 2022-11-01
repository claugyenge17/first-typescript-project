import { createContext, ReactNode, useContext, useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

type FavoritesProviderProps = {
    children: ReactNode
}

type FavoritesContext = {
    addToFavorites: (id: number) => void
    removeFromFavorites: (id: number) => void
    clearFavorites: () => void
    favoriteItems: FavoriteItem[]
}

type FavoriteItem = {
    id: number
}

const FavoritesContext = createContext({} as FavoritesContext)

export function useFavorites() {
    return useContext(FavoritesContext)
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
    const [favoriteItems, setFavoriteItems] = useLocalStorage<FavoriteItem[]>('favorites', [])

    function addToFavorites(id: number){
        setFavoriteItems(currItems => {
            if(currItems.find(item => item.id === id) == null){
                return [...currItems, { id }]
            } else {
                return currItems.map(item => {
                    if(item.id === id){
                        return {...item}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromFavorites(id: number){
        setFavoriteItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    function clearFavorites(){
        setFavoriteItems([])
    }

    return (
        <FavoritesContext.Provider
        value={{
            addToFavorites,
            removeFromFavorites,
            clearFavorites,
            favoriteItems
        }}>
            { children }
        </FavoritesContext.Provider>
    )
}