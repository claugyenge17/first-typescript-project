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
    
    function getSearchedFavProductInfo(query: string) {
        if( storeItems != undefined ){
            setFilteredFavItems(
                favoriteItems.filter(product =>{
                    const filteredProducts = product.title.toLowerCase().includes(query.toLowerCase())
                    if(!filteredProducts){
                        setIsQueryMatch('YES')
                        return filteredProducts
                        // console.log(filteredProducts)
                    } else {
                        setIsQueryMatch('NO')
                        return []
                    }
                })
            ) 
        } else {
            setFilteredFavItems([])
        }
    }


    // function addToFavorites(id: number){
    //     if(storeItems?.products.find(item => item.id === id) == null){
    //         setFavoriteItems([...favoriteItems, { id }])
    //     } else {
    //         return favoriteItems.map(item => {
    //             if(item.id === id){
    //                 return {...item}
    //             } else {
    //                 return item
    //             }
    //         })
    //     }
       
    // }
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