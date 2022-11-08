import { Col, Row } from 'react-bootstrap'
import { StoreItem } from '../components/StoreItem'
// import storeItems from '../data/items.json'
import { useSearchProducts } from '../context/SearchProductsContext'
import { useGetProducts } from '../hooks/useGetProducts'
import { SearchItem } from '../components/SearchItem'
import { Pagination } from '../components/Pagination'
import { useEffect, useMemo, useState } from 'react'


let PageSize = 12;

export function Store() {
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredCurrentPage, setFilteredCurrentPage] = useState(1)
    const { filteredItems, isQueryMatch } = useSearchProducts()
    const storeItems = useGetProducts()

    console.log(isQueryMatch)
    console.log(filteredItems)
    console.log('Current page', currentPage)
    console.log('Filtered current page', filteredCurrentPage)

    const storeProducts = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return storeItems?.products.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, storeItems])
    
    const filteredStoreProducts = useMemo(() => {
        const firstPageIndex = (filteredCurrentPage - 1) * PageSize
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredItems.slice(firstPageIndex, lastPageIndex);
    }, [filteredCurrentPage, filteredItems])


    useEffect(() => {
        if(filteredItems.length === 0 && isQueryMatch === 'NO'){
            setFilteredCurrentPage(1)
        }
        if(filteredItems.length === 0 && isQueryMatch === ''){
            setFilteredCurrentPage(1)
        }
    })

    return (
        <>
            <h1>Store</h1>
            <div style={{marginBottom:'1em', display:'flex', justifyContent:'center'}}>
                <SearchItem/>
            </div>
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
                ) : 
                filteredItems.length === 0 && isQueryMatch === 'NO' ? (
                    <div className='d-flex mt-3 align-items-center justify-content-center'>
                        <Pagination
                        className="pagination-bar"
                        currentPage={filteredCurrentPage}
                        totalCount={filteredItems.length}
                        pageSize={PageSize}
                        onPageChange={page => setFilteredCurrentPage(page)}
                        siblingCount={1}
                        pageNumber={1}
                        />
                    </div>
                ) :
                filteredItems.length > 0 && isQueryMatch === 'YES' ? (
                    <div className='d-flex mt-3 align-items-center justify-content-center'>
                        <Pagination
                        className="pagination-bar"
                        currentPage={filteredCurrentPage}
                        totalCount={filteredItems.length}
                        pageSize={PageSize}
                        onPageChange={page => setFilteredCurrentPage(page)}
                        siblingCount={1}
                        pageNumber={1}
                        />
                    </div>
                ) :
                (
                    <div className='d-flex mt-3 align-items-center justify-content-center'>
                        <Pagination
                        className="pagination-bar"
                        currentPage={filteredCurrentPage}
                        totalCount={filteredItems.length}
                        pageSize={PageSize}
                        onPageChange={page => setFilteredCurrentPage(page)}
                        siblingCount={1}
                        pageNumber={1}
                        />
                    </div>
                )
            }
            <Row md={2} xs={1} lg={3} className='g-3'>
                {
                    filteredItems.length === 0 && isQueryMatch === '' ?
                        storeProducts?.map((item) => (
                            <Col key={item.id}>
                                <StoreItem {...item}/>
                            </Col>
                        ))
                    :
                    filteredItems.length === 0 && isQueryMatch === 'NO' ? 
                        <div>No results found!</div>
                    :
                    filteredItems.length > 0 && isQueryMatch === 'YES' ?
                        filteredStoreProducts.map((item) => (
                            <Col key={item.id}>
                                <StoreItem {...item}/>
                            </Col>
                        ))
                    :
                    filteredItems.length > 0 && isQueryMatch === '' ?
                        filteredStoreProducts.map((item) => (
                            <Col key={item.id}>
                                <StoreItem {...item}/>
                            </Col>
                        ))
                    :
                    filteredStoreProducts.map((item) => (
                        <Col key={item.id}>
                            <StoreItem {...item}/>
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}