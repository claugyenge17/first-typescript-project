import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Home } from './pages/Home'
import { Store } from './pages/Store'
import { About } from './pages/About'
import { Navbar } from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { SearchProductsProvider } from './context/SearchProductsContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { Favorites } from './pages/Favorites'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProductsProvider>
        <FavoritesProvider>
        <ShoppingCartProvider>
            <Navbar/>
            <Container className='mb-4'>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/store' element={<Store/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/favorites' element={<Favorites/>}/>
              </Routes>
            </Container>
        </ShoppingCartProvider>
      </FavoritesProvider>
      </SearchProductsProvider>
    </QueryClientProvider>
    
  )
  
}

export default App
