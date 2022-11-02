import { useEffect, useState } from "react";
import axios from 'axios'

const url = 'https://dummyjson.com/products?limit=100';

type product = {
    id: number
    title: string
    price: number
    images: string[]
}

type storeItemsProps = {
    products: product[]
}

export function useGetProducts() {

    const [productsData, setProductsData] = useState<storeItemsProps>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    
    useEffect(()=>{
        getStoreItems()
    }, [])
 
    const getStoreItems = () => {
        setLoading(true)
        axios.get(url)
            .then((response)=>{
                setError('')
                setProductsData(response.data)
            })
            .catch((error) => {
                setError(error.message)
                console.log(error.message)
            })
            .finally(()=> setLoading(false))
    } 
    
  return productsData
}