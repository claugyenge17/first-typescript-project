import { createContext, ReactNode, useContext, useState } from "react"
import { useGetProducts } from "../hooks/useGetProducts"
import { useLocalStorage } from "../hooks/useLocalStorage"

type FavoritesProviderProps = {
    children: ReactNode
}

type FavoriteItem = {
    id: number
    title: string
    price: number
    images: string[]
}

type FavoritesContext = {
    addToFavorites: (id: number, title: string, price: number, images: string[]) => void
    removeFromFavorites: (id: number) => void
    clearFavorites: () => void
    favoriteItems: FavoriteItem[]
    filteredFavItems: FavoriteItem[]
    isQueryMatch: string
    getSearchedFavProductInfo: (query: string) => void
}

const FavoritesContext = createContext({} as FavoritesContext)

export function useFavorites() {
    return useContext(FavoritesContext)
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
    const [favoriteItems, setFavoriteItems] = useLocalStorage<FavoriteItem[]>('favorites', [])
    const [filteredFavItems, setFilteredFavItems ] = useState<FavoriteItem[]>([])
    const [isQueryMatch, setIsQueryMatch] = useState('')
    const storeItems = useGetProducts()
    
    function getSearchedFavProductInfo(query: string){
        if( storeItems != undefined ){
             const filteredProducts = favoriteItems.filter((products) =>products.title.toLowerCase().includes(query.toLowerCase())).map((item)=>item)
            // console.log(filteredProducts)
            if(filteredProducts.length > 0 && query.length > 0) {
                setIsQueryMatch('YES')
                return setFilteredFavItems(filteredProducts)
            } else if(filteredProducts.length === 0 && query.length > 0) {
                setIsQueryMatch('NO')
                return setFilteredFavItems([])
            } else {
                setIsQueryMatch('')
                return setFilteredFavItems([])
            }
        } else {
            setFilteredFavItems([])
        }
    }
    

    function addToFavorites(id: number, title: string, price: number, images: string[]){
        setFavoriteItems(currItems => {
            if(currItems.find(item => item.id === id) == null){
                return [...currItems, { id, title, price, images }]
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
            favoriteItems,
            filteredFavItems,
            isQueryMatch: isQueryMatch,
            getSearchedFavProductInfo,
        }}>
            { children }
        </FavoritesContext.Provider>
    )
}