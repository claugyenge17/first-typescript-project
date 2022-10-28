import { useQuery } from 'react-query'
import { Col, Row } from 'react-bootstrap'
import { StoreItem } from '../components/StoreItem'
// import storeItems from '../data/items.json'
import { useSearchProducts } from '../context/SearchProductsContext'
import { useGetProducts } from '../hooks/useGetProducts'


export function Store() {
    const { filteredItems, isQueryMatch } = useSearchProducts();
    const storeItems = useGetProducts()
    
    // console.log(storeItems?.products)
 

    // const getStoreItems = async () =>{
    //     const res = await fetch('https://dummyjson.com/products?limit=100')
    //     return res.json()
    // }

    // const { data, error, isLoading } = useQuery('products', getStoreItems)
    // if (error) return <div>Request Failed</div>;
	// if (isLoading) return <div>Loading...</div>;
    // console.log(data)
    return (
        <>
            <h1>Store</h1>
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