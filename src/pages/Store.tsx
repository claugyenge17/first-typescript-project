import { Col, Row } from 'react-bootstrap'
import { StoreItem } from '../components/StoreItem'
import storeItems from '../data/items.json'
import { useSearchProducts } from '../context/SearchProductsContext'



export function Store() {
    const { filteredItems, isQueryMatch } = useSearchProducts();
    // const filteredItems = getSearchedProductInfo()
    console.log(filteredItems)
 
    return (
        <>
            <h1>Store</h1>
            <Row md={2} xs={1} lg={3} className='g-3'>
                {
                    
                filteredItems.length === 0 && isQueryMatch === '' ? 
                    storeItems.map(item => (
                        <Col key={item.id}>
                            <StoreItem {...item}/>
                        </Col>
                    ))
                :
                    filteredItems.length === 0 ?
                        <div>No results found!</div>
                    :
                        filteredItems.map(item => (
                            <Col key={item.id}>
                                <StoreItem {...item}/>
                            </Col>
                        ))
                    
                }
            </Row>
        </>
    )
}