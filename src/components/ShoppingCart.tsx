import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
// import storeItems from '../data/items.json'
import { formatCurrency } from "../utilities/formatCurrency";
import { useGetProducts } from "../hooks/useGetProducts";


type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems, cartQuantity, clearCart } = useShoppingCart()
    const storeItems = useGetProducts()
    return (
        <Offcanvas 
        show={isOpen} 
        placement='end'
        onHide={closeCart}
        style={{
            width:'37em',
            zIndex:'10001'
        }}
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    <div className='d-flex flex-column'>
                        <span>Cart</span>
                        <span style={{ fontSize:'.75em'}}>Total number of items in the cart at the moment: <span style={{color:'green'}}>{cartQuantity}</span></span> 
                    </div>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item}/>
                    ))}
                    <div className='d-flex flex-column'>
                        <hr></hr>
                        <div className='ms-auto fw-bold fs-5'>
                            Total{' '}
                            {formatCurrency(cartItems.reduce((total, cartItem) => {
                                const item = storeItems?.products.find(i => i.id === cartItem.id)
                                    return total + (item?.price || 0) * cartItem.quantity
                                }, 0)
                            )}
                        </div>
                        {cartQuantity > 0 && (
                            <div>
                                <Button
                                variant='danger'
                                onClick={clearCart}
                                >
                                    Clear cart
                                </Button>
                            </div>
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}