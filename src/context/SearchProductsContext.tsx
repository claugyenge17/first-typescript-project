import { createContext, ReactNode, useContext, useState } from "react"
import { useGetProducts } from "../hooks/useGetProducts"
// import storeItems from '../data/items.json'

type SearchProductsProviderProps = {
    children: ReactNode
}

type SearchedItem = {
    id: number
    // name: string
    title: string
    price: number
    images: string[]
    // imgUrl: string
    // toLowerCase: () => Lowercase<string>
}

type SearchContext = {
    filteredItems: SearchedItem[]
    isQueryMatch: string
    getSearchedProductInfo: (query: string) => void
}



const SearchProductsContext = createContext({} as SearchContext)

export function useSearchProducts() {
    return useContext(SearchProductsContext)
}

export function SearchProductsProvider( { children }: SearchProductsProviderProps ){
    const [filteredItems, setFilteredItems] = useState<SearchedItem[]>([])
    const [isQueryMatch, setIsQueryMatch] = useState('')

    const storeItems = useGetProducts()

    function getSearchedProductInfo(query: string) {
        if( storeItems != undefined ){
            setFilteredItems(
                storeItems.products.filter(product =>{
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
            setFilteredItems([])
        }
        
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