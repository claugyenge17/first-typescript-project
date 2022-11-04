import { Button, Stack } from "react-bootstrap"
import { useFavorites } from "../context/FavoritesContext"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { useGetProducts } from "../hooks/useGetProducts"
// import storeItems from '../data/items.json'
import { formatCurrency } from "../utilities/formatCurrency"

type CartItemProps = {
    id: number
    quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
    const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    const { favoriteItems } = useFavorites()
    const isFavorite = favoriteItems.find(item => item.id === id)
    const storeItems = useGetProducts()
    const item = storeItems?.products.find(i => i.id === id)
    if (item === null || item === undefined) return null

    return (
        <Stack
            direction='horizontal'
            gap={3}
            className='d-flex align-items-center border-top'>
            <img
                src={item.images[0]}
                style={{
                    marginTop: '1em',
                    width: '140px',
                    height: 'auto',
                    objectFit: 'contain'
                }} />
            <div className='me-auto'>
                <div>
                    {item.title}{' '}

                    {quantity > 1 ? (
                        <div className='d-flex align-items-center justify-content-between'>
                            <Button
                                className='rounded'
                                size='sm'
                                onClick={() => increaseCartQuantity(id)}
                            >+</Button>
                            <span className='text-muted' style={{ fontSize: '1em', fontWeight: '900' }}>x{quantity}</span>
                            <Button
                                className='rounded'
                                size='sm'
                                onClick={() => decreaseCartQuantity(id)}
                            >-</Button>
                        </div>
                    ) : (
                        <div className='d-flex align-items-center'>
                            <Button
                                className='rounded'
                                size='sm'
                                onClick={() => increaseCartQuantity(id)}>+</Button>
                            <span className='text-muted' style={{ fontSize: '.6em', marginLeft:'.5em' }}>Add more quantity</span>
                        </div>
                    )
                    }
                </div>
                <div className='text-muted' style={{ fontSize: '.75rem' }}
                >
                    This product's individual price is {formatCurrency(item.price)}
                </div>
                {isFavorite ? (
                    <div className='text-muted'>
                        <span
                         className='d-flex align-items-center'
                         style={{ fontSize: '.75rem', color:'green' }}>
                            <svg version="1.1" id="Capa_1" x="0px" y="0px"
                            width="15px" height="15px" viewBox="0 0 544.582 544.582"
                            >
                            <g>
                                <path fill="green" d="M448.069,57.839c-72.675-23.562-150.781,15.759-175.721,87.898C247.41,73.522,169.303,34.277,96.628,57.839
                                    C23.111,81.784-16.975,160.885,6.894,234.708c22.95,70.38,235.773,258.876,263.006,258.876
                                    c27.234,0,244.801-188.267,267.751-258.876C561.595,160.732,521.509,81.631,448.069,57.839z"/>
                            </g>
                            </svg>
                             This product is in your favorites!
                             <svg version="1.1" id="Capa_1" x="0px" y="0px"
                            width="15px" height="15px" viewBox="0 0 544.582 544.582"
                            >
                            <g>
                                <path fill="green" d="M448.069,57.839c-72.675-23.562-150.781,15.759-175.721,87.898C247.41,73.522,169.303,34.277,96.628,57.839
                                    C23.111,81.784-16.975,160.885,6.894,234.708c22.95,70.38,235.773,258.876,263.006,258.876
                                    c27.234,0,244.801-188.267,267.751-258.876C561.595,160.732,521.509,81.631,448.069,57.839z"/>
                            </g>
                            </svg>
                        </span>
                    </div>
                    )
                    : (
                        null
                    )
                }
            </div>
            <div style={{ fontSize: '1em', fontWeight: '900' }}> {formatCurrency(item.price * quantity)} </div>
            <Button
                variant='outline-danger'
                size='sm'
                onClick={() => removeFromCart(item.id)}
            >
                &times;
            </Button>
        </Stack>
    )
}