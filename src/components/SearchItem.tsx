import { useMemo, useState } from "react"
import storeItems from '../data/items.json'

// type StoreItems = {
//     id: number
//     name: string
//     price: number
//     imgUrl: string
//     toLowerCase: () => Lowercase<string>
// }

// type SearchItemProps = {
//     keyword: string
// }

export function SearchItem(){
    // const [items, setItems] = useState<StoreItems[]>([])
    const [query, setQuery] = useState('')
    
    const filteredItems = useMemo(()=>{
        return storeItems.filter(product=>{
            return product.name.toLowerCase().includes(query.toLowerCase())
        })
    }, [query])
    // console.log(filteredItems)
    return (
        <>
            <input
            value={query} 
            onChange={e => setQuery(e.target.value)}
            placeholder='Search...' 
            type='search'/>
        </>
    )
}