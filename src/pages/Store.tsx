import { Col, Row } from 'react-bootstrap'
import { StoreItem } from '../components/StoreItem'
// import storeItems from '../data/items.json'
import { useSearchProducts } from '../context/SearchProductsContext'
import { useGetProducts } from '../hooks/useGetProducts'
import { SearchItem } from '../components/SearchItem'
import { Pagination } from '../components/Pagination'
import { useMemo, useState } from 'react'


let PageSize = 12;

export function Store() {
    const [currentPage, setCurrentPage] = useState(1)
    const { filteredItems, isQueryMatch } = useSearchProducts()
    const storeItems = useGetProducts()

    const storeProducts = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return storeItems?.products.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, storeItems])
    
    const filteredStoreProducts = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredItems.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredItems])

    return (
        <>
            <h1>Store</h1>
            <div style={{marginBottom:'1em'}}>
                <SearchItem/>
            </div>
            <Row md={2} xs={1} lg={3} className='g-3'>
                {
                filteredItems.length === 0 && isQueryMatch === '' ? 
                    // storeItems?.products.map((item) => (
                    //     <Col key={item.id}>
                    //         <StoreItem {...item}/>
                    //     </Col>
                    // ))
                    storeProducts?.map((item) => (
                            <Col key={item.id}>
                                <StoreItem {...item}/>
                            </Col>
                    ))
                :
                    filteredItems.length === 0 ?
                        <div>No results found!</div>
                    :
                        // filteredItems.map((item) => (
                        //     <Col key={item.id}>
                        //         <StoreItem {...item}/>
                        //     </Col>
                        // ))
                        filteredStoreProducts.map((item) => (
                            <Col key={item.id}>
                                <StoreItem {...item}/>
                            </Col>
                        ))
                }
            </Row>
            {
                filteredItems.length === 0 && isQueryMatch === '' ? (
                <div className='d-flex mt-3 align-items-center justify-content-center'>
                    <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={Number(storeItems?.products.length)}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                    siblingCount={1}
                    pageNumber={1}
                    />
                </div>
                ) : (
                    <div className='d-flex mt-3 align-items-center justify-content-center'>
                        <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={filteredItems.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                        siblingCount={1}
                        pageNumber={1}
                        />
                    </div>
                )
            }
            
            
        </>
    )
}