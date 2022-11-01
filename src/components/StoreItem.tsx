import { useEffect } from "react"
import { Button, Card } from "react-bootstrap"
import { useFavorites } from "../context/FavoritesContext"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"

type product = {
    id: number
    title: string
    price: number
    images: string[]
}

export function StoreItem({ id, title, price, images }: product){
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    const { addToFavorites, removeFromFavorites } = useFavorites()
    const quantity = getItemQuantity(id);
    
    return <Card className='h-100'>
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
                {quantity === 0 ? (
                    <Button 
                    className='w-100'
                    onClick={() => increaseCartQuantity(id)}
                    >+ Add To Cart</Button>
                ): <div className='d-flex align-items-center flex-column'
                    style={{gap:'.5rem'}}
                    >
                        <div className='d-flex align-items-center justify-content-center'
                        style={{gap:'.5rem'}}
                        >
                            <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                            <div>
                                <span className='fs-3'>{quantity}</span> in cart
                            </div>
                            <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                        </div>
                       <Button 
                       variant='danger' 
                       size='sm'
                       onClick={() => removeFromCart(id)}
                       >Remove</Button>
                    </div>}
            </div>
        </Card.Body>
    </Card>
}