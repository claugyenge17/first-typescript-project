import { useSearchProducts } from '../context/SearchProductsContext'

export function SearchItem(){
  
    const { getSearchedProductInfo } = useSearchProducts()
    return (
        <>
            <input
            className='border-primary rounded'
            style={{
                height:'2.5em',
                width: '30%'
            }}
            
            onChange={e => getSearchedProductInfo(e.target.value)}
            placeholder='Search through products...' 
            type='search'/>
        </>
    )
}