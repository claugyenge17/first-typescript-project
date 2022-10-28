import { ChangeEvent, useEffect, useMemo, useState } from "react"
import storeItems from '../data/items.json'
import { useSearchProducts } from '../context/SearchProductsContext'
import { Button } from "react-bootstrap"


export function SearchItem(){
  
    const { getSearchedProductInfo } = useSearchProducts()
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