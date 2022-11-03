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
    const { favoriteItems, addToFavorites, removeFromFavorites } = useFavorites()
    const quantity = getItemQuantity(id);
    const isFavorite = favoriteItems.find(item => item.id === id)

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
                            <Button 
                            variant='danger'
                            onClick={() => decreaseCartQuantity(id)}>-</Button>
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
            {isFavorite ? (
            <Button
            size='sm'
            style={{border:'0', width:'3em', background:'transparent', display:'flex'}}
            onClick={() => removeFromFavorites(id)}>
                <svg version="1.1" id="Capa_1" x="0px" y="0px"
                        width="35px" height="35px" viewBox="0 0 544.582 544.582"
                    >
                    <g>
                        <path fill="red" d="M448.069,57.839c-72.675-23.562-150.781,15.759-175.721,87.898C247.41,73.522,169.303,34.277,96.628,57.839
                            C23.111,81.784-16.975,160.885,6.894,234.708c22.95,70.38,235.773,258.876,263.006,258.876
                            c27.234,0,244.801-188.267,267.751-258.876C561.595,160.732,521.509,81.631,448.069,57.839z"/>
                    </g>
                    </svg>
            </Button>
            ) : (
                <Button 
                size='sm'
                style={{border:'0', width:'3em', background:'transparent', display:'flex'}}
                onClick={() => addToFavorites(id, title, price, images)}>
                    <svg version="1.1" id="Capa_1" x="0px" y="0px"
                    width="35px" height="35px"
                    viewBox="0 0 471.701 471.701">
                    <g>
                        <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                            c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                            l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                            C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                            s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                            c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                            C444.801,187.101,434.001,213.101,414.401,232.701z"/>
                    </g>
                    </svg>
                </Button>
            )}
        </Card.Body>
    </Card>
}