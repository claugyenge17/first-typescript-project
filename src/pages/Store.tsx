import { Col, Row } from 'react-bootstrap'
import { StoreItem } from '../components/StoreItem'
// import storeItems from '../data/items.json'
import { useSearchProducts } from '../context/SearchProductsContext'
import { useGetProducts } from '../hooks/useGetProducts'
import { SearchItem } from '../components/SearchItem'


export function Store() {
    const { filteredItems, isQueryMatch } = useSearchProducts();
    const storeItems = useGetProducts()
    
    return (
        <>
            <h1>Store</h1>
            <div style={{marginBottom:'1em'}}>
                <SearchItem/>
            </div>
            <Row md={2} xs={1} lg={3} className='g-3'>
                {
                    
                filteredItems.length === 0 && isQueryMatch === '' ? 
                    storeItems?.products.map((item) => (
                        <Col key={item.id}>
                            <StoreItem {...item}/>
                        </Col>
                    ))
                :
                    filteredItems.length === 0 ?
                        <div>No results found!</div>
                    :
                        filteredItems.map((item) => (
                            <Col key={item.id}>
                                <StoreItem {...item}/>
                            </Col>
                        ))
                    
                }
            </Row>
        </>
    )
}