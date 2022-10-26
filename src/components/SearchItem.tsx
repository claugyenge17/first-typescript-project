import { ChangeEvent, useEffect, useMemo, useState } from "react"
import storeItems from '../data/items.json'
import { useSearchProducts } from '../context/SearchProductsContext'
import { Button } from "react-bootstrap"


export function SearchItem(){
  
    // const [query, setQuery] = useState('')
    const { getSearchedProductInfo } = useSearchProducts()
    // const filteredItems = useMemo(()=>{
    //     return storeItems.filter(product=>{
    //         return product.name.toLowerCase().includes(query.toLowerCase())
    //     })
    // }, [query])
    // console.log(filteredItems)
    
    
    return (
        <>
            <input
            // value={query} 
            // onChange={e => setQuery(e.target.value)}
            onChange={e => getSearchedProductInfo(e.target.value)}
            placeholder='Search...' 
            type='search'/>
            {/* <Button onClick={() => getSearchedProductInfo(query)}>Search</Button> */}
        </>
    )
}