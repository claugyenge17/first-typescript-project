import { Button, Card } from "react-bootstrap"
import { useFavorites } from "../context/FavoritesContext"
import { formatCurrency } from "../utilities/formatCurrency"

type favoriteProduct = {
    id: number
    title: string
    price: number
    images: string[]
}

export function FavoriteItem({ id, title, price, images }: favoriteProduct){
    const { removeFromFavorites } = useFavorites()

    return (
        <>
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
            
        </>
    )
}