import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios, { AxiosRequestConfig } from 'axios'

const url = 'https://dummyjson.com/products?limit=100';

type product = {
    id: number
    title: string
    price: number
    images: string[]
}

type storeItemsProps = {
    // id: number
    // title: string
    // price: number
    // images: string[]
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
    
   
    // const { data, error, isLoading } = useQuery('products', getStoreItems)
    // if (error) return <div>Request Failed</div>;
    // if (isLoading) return <div>Loading...</div>;
    // if(data != null) {
    //     // return JSON.parse(data)
    //     return data
    // }
    // return JSON.parse(data)
    // return [productsData, setProductsData] as [typeof productsData, typeof setProductsData]
  return productsData
}