import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import { SearchItem } from "../components/SearchItem"
import storeItems from '../data/items.json'

type SearchProductsProviderProps = {
    children: ReactNode
}

type SearchItem = {
    id: number
    name: string
    price: number
    imgUrl: string
    // toLowerCase: () => Lowercase<string>
}

type SearchContext = {
    filteredItems: SearchItem[]
    isQueryMatch: string
    getSearchedProductInfo: (query: string) => void
}



const SearchProductsContext = createContext({} as SearchContext)

export function useSearchProducts() {
    return useContext(SearchProductsContext)
}

export function SearchProductsProvider( { children }: SearchProductsProviderProps ){
    const [filteredItems, setFilteredItems] = useState<SearchItem[]>([])
    const [isQueryMatch, setIsQueryMatch] = useState('')

    function getSearchedProductInfo(query: string) {
        setFilteredItems(
            storeItems.filter(product =>{
                const filteredProducts = product.name.toLowerCase().includes(query.toLowerCase())
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
    }

    return (
        <SearchProductsContext.Provider 
        value={{
            filteredItems: filteredItems,
            isQueryMatch: isQueryMatch,
            getSearchedProductInfo,
        }}>
            {children}
        </SearchProductsContext.Provider>
    )
}