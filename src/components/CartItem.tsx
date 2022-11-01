import { Button, Stack } from "react-bootstrap"
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
                    // width: '125px',
                    // height: '75px',
                    marginTop: '1em',
                    width: '140px',
                    height: 'auto',
                    objectFit: 'contain'
                }} />
            <div className='me-auto'>
                <div>
                    {item.title}{' '}

                    {/* {quantity > 1 &&  */}
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