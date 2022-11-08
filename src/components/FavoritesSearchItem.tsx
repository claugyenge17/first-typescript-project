import { useFavorites } from "../context/FavoritesContext"

export function FavoriteSearchItem(){
  
    const { getSearchedFavProductInfo } = useFavorites()
    return (
        <>
            <input
            className='border-primary rounded'
            style={{
                height:'2.5em',
                width: '30%'
            }}
            onChange={e => getSearchedFavProductInfo(e.target.value)}
            placeholder='Search through favorites...' 
            type='search'/>
        </>
    )
}