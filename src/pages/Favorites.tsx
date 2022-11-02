import { Button, Card, Col, Row } from "react-bootstrap";
import { FavoriteItem } from "../components/FavoriteItem";
import { FavoriteSearchItem } from "../components/FavoritesSearchItem";
import { useFavorites } from "../context/FavoritesContext";


export function Favorites() {
    const { favoriteItems, filteredFavItems, isQueryMatch, clearFavorites } = useFavorites()
   
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
                            // favoriteItems.map((item) => (
                            //     <Col key={item.id}>
                            //         <FavoriteItem {...item}/>
                            //     </Col>
                            // ))
                            filteredFavItems.length === 0 && isQueryMatch === '' ? 
                                favoriteItems.map((item) => (
                                    <Col key={item.id}>
                                        <FavoriteItem {...item}/>
                                    </Col>
                                ))
                            :
                                filteredFavItems.length === 0 ?
                                    <div>No results found!</div>
                                :
                                    filteredFavItems.map((item) => (
                                        <Col key={item.id}>
                                            <FavoriteItem {...item}/>
                                        </Col>
                                    ))
                        }
                    </Row>
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