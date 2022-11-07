import { createContext, ReactNode, useContext, useState } from "react"
import { useGetProducts } from "../hooks/useGetProducts"
// import storeItems from '../data/items.json'

type SearchProductsProviderProps = {
    children: ReactNode
}

type SearchedItem = {
    id: number
    title: string
    price: number
    images: string[]
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

    function getSearchedProductInfo(query: string){
        if( storeItems !== undefined ){
            const filteredProducts = storeItems.products.filter((products) =>products.title.toLowerCase().includes(query.toLowerCase())).map((item)=>item)
            // console.log(filteredProducts)
            if(filteredProducts.length > 0 && query.length > 0) {
                setIsQueryMatch('YES')
                return setFilteredItems(filteredProducts)
            } else if(filteredProducts.length === 0 && query.length > 0) {
                setIsQueryMatch('NO')
                return setFilteredItems([])
            } else {
                setIsQueryMatch('')
                return setFilteredItems([])
            }
            // setFilteredItems(

                // storeItems.products.filter(product =>{
                //     const filteredProducts = product.title.toLowerCase().includes(query.toLowerCase())
                //     // console.log(filteredProducts)
                //     return setIsQueryMatch('YES'), filteredProducts
                //     // if(filteredProducts){
                //     //     setIsQueryMatch('YES')
                //     //     // console.log(!filteredProducts)
                //     //     return filteredProducts
                //     // } else {
                //     //     setIsQueryMatch('NO')
                //     //     return []
                //     // }
                // })
            // ) 
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