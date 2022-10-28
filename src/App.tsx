import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Home } from './pages/Home'
import { Store } from './pages/Store'
import { About } from './pages/About'
import { Navbar } from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { SearchProductsProvider } from './context/SearchProductsContext'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ShoppingCartProvider>
      <SearchProductsProvider>
        <Navbar/>
        <Container className='mb-4'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/store' element={<Store/>}/>
            <Route path='/about' element={<About/>}/>
          </Routes>
        </Container>
      </SearchProductsProvider>
    </ShoppingCartProvider>
    </QueryClientProvider>
    
  )
  
}

export default App
