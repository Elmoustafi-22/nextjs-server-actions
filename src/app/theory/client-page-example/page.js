'use client'
import { fetchListOfProducts } from "@/actions";
import { useEffect, useState } from "react";

function ClientPageExample(){
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    async function getListOfProducts(){
        setLoading(true)
        const data = await fetchListOfProducts();
        console.log(data)
        if(data) {
            setProducts(data);
            setLoading(false)
        }
    }

    useEffect(() => {
        getListOfProducts()
    }, []);

    if (loading) return <h1>Loading data! Please wait</h1>
    
    return (
      <div>
        <h1 className="text-2xl font-semibold italic">Client page server </h1>
        <ul className="mt-2 space-y-2 text-sm">
          {products && products.length > 0 ? (
            products.map((productItem) => (
              <li key={productItem.id}>{productItem.title}</li>
            ))
          ) : (
            <h3>No products available</h3>
          )}
        </ul>
      </div>
    );
}

export default ClientPageExample;