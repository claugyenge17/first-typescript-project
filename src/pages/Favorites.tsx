import { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FavoriteItem } from "../components/FavoriteItem";
import { FavoriteSearchItem } from "../components/FavoritesSearchItem";
import { Pagination } from "../components/Pagination";
import { useFavorites } from "../context/FavoritesContext";

let PageSize = 12;

export function Favorites() {
    const { favoriteItems, filteredFavItems, isQueryMatch, clearFavorites } = useFavorites()
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredFavCurrentPage, setFilteredFavCurrentPage] = useState(1)

    const filteredStoreProducts = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return favoriteItems.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, favoriteItems])

    // console.log(filteredStoreProducts)

    const filteredStoreFavProducts = useMemo(() => {
        const firstPageIndex = (filteredFavCurrentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredFavItems.slice(firstPageIndex, lastPageIndex);
    }, [filteredFavCurrentPage, filteredFavItems])
    // console.log(favoriteItems.length)
    
    useEffect(() => {
        if(currentPage > 1 && filteredStoreProducts.length === 0){
            setCurrentPage(currentPage - 1)
        } else {
            setCurrentPage(currentPage)
        }
    })
    
    return (
        <>
            <h1>Favorites</h1>
            {favoriteItems.length >= 1 ? (
                <div>
                    <Button
                    style={{marginBottom:'1em'}}
                    variant='danger'
                    onClick={()=>clearFavorites()}
                    >Clear favorites
                    </Button>
                    <div style={{marginBottom:'1em'}}>
                        <FavoriteSearchItem/>
                    </div>
                    <Row md={2} xs={1} lg={3} className='g-3'>
                        {
                            filteredFavItems.length === 0 && isQueryMatch === '' ? 
                                filteredStoreProducts.map((item) => (
                                    <Col key={item.id}>
                                        <FavoriteItem {...item}/>
                                    </Col>
                                ))
                            :
                            filteredFavItems.length === 0 && isQueryMatch === 'NO' ?
                                // filteredStoreProducts.map((item) => (
                                //     <Col key={item.id}>
                                //         <FavoriteItem {...item}/>
                                //     </Col>
                                // ))
                                <div>No results found!</div>
                            :
                            filteredFavItems.length > 0 && isQueryMatch === 'YES' ?
                                filteredStoreFavProducts.map((item)=>(
                                    <Col key={item.id}>
                                        <FavoriteItem {...item}/>
                                    </Col>
                                ))
                                // filteredFavItems.length === 0 ?
                                //     <div>No results found!</div>
                                // :
                            :
                            filteredFavItems.length > 0 && isQueryMatch === '' ?
                                filteredStoreFavProducts.map((item)=>(
                                    <Col key={item.id}>
                                        <FavoriteItem {...item}/>
                                    </Col>
                                ))
                            :
                            filteredStoreFavProducts.map((item) => (
                                <Col key={item.id}>
                                    <FavoriteItem {...item}/>
                                </Col>
                            ))
                        }
                    </Row>
                    {
                        filteredFavItems.length === 0 && isQueryMatch === '' ? (
                            <div className='d-flex mt-3 align-items-center justify-content-center'>
                                <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={favoriteItems.length}
                                pageSize={PageSize}
                                onPageChange={page => setCurrentPage(page)}
                                siblingCount={1}
                                pageNumber={1}
                                />
                            </div>
                        ) : 
                            filteredFavItems.length === 0 && isQueryMatch === 'NO' ? (
                                <div className='d-flex mt-3 align-items-center justify-content-center'>
                                    <Pagination
                                    className="pagination-bar"
                                    currentPage={filteredFavCurrentPage}
                                    totalCount={filteredFavItems.length}
                                    pageSize={PageSize}
                                    onPageChange={page => setFilteredFavCurrentPage(page)}
                                    siblingCount={1}
                                    pageNumber={1}
                                    />
                                </div>
                        ) :
                        filteredFavItems.length > 0 && isQueryMatch === 'YES' ? (
                                <div className='d-flex mt-3 align-items-center justify-content-center'>
                                    <Pagination
                                    className="pagination-bar"
                                    currentPage={filteredFavCurrentPage}
                                    totalCount={filteredFavItems.length}
                                    pageSize={PageSize}
                                    onPageChange={page => setFilteredFavCurrentPage(page)}
                                    siblingCount={1}
                                    pageNumber={1}
                                    />
                                </div>
                        ) :
                        (
                            <div className='d-flex mt-3 align-items-center justify-content-center'>
                                <Pagination
                                className="pagination-bar"
                                currentPage={filteredFavCurrentPage}
                                totalCount={filteredFavItems.length}
                                pageSize={PageSize}
                                onPageChange={page => setFilteredFavCurrentPage(page)}
                                siblingCount={1}
                                pageNumber={1}
                                />
                            </div>
                        )
                    }
                </div>
                
            ):(
                <Card className='h-100'>
                    <Card.Body>
                        <Card.Title>No products in your favorite list!</Card.Title>
                    </Card.Body>
                </Card>
            )}
        </>
    )
}