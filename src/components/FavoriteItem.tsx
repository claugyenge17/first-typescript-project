import { Button, Card, Stack } from "react-bootstrap"
import { useFavorites } from "../context/FavoritesContext"
import { useGetProducts } from "../hooks/useGetProducts"
import { formatCurrency } from "../utilities/formatCurrency"

type favoriteProduct = {
    id: number
    title: string
    price: number
    images: string[]
}

export function FavoriteItem({ id, title, price, images }: favoriteProduct){
    const { favoriteItems, removeFromFavorites } = useFavorites()
    // const storeItems = useGetProducts()
    // const item = storeItems?.products.find(i => i.id === id)
    // const isFavorite = favoriteItems.find(item => item.id === id)
    // if (item === null || item === undefined) return null

    return (
        <>
            {/* {isFavorite ? ( */}
                    <Card className='h-100'>
                        <Card.Img 
                        variant='top' 
                        src={images[0]} 
                        height='200px'
                        style={{objectFit:'cover'}}
                        />
                        <Card.Body className='d-flex flex-column'>
                            <Card.Title className='d-flex justify-content-between
                            align-items-baseline mb-4'>
                                <span className='fs-2'>{title}</span>
                                <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
                            </Card.Title>
                            <div className='mt-auto'>
                                <Button 
                                variant='danger' 
                                size='sm'
                                onClick={() => removeFromFavorites(id)}
                                >Remove from favorites</Button>
                            </div>
                        </Card.Body>
                    </Card> 
            {/* ) : (
                    <Card className='h-100'>
                        <Card.Body>
                            <Card.Title>No products in your favorite list!</Card.Title>
                        </Card.Body>
                    </Card>
            )
            } */}
        </>
    )
}