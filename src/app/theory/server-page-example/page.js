import { fetchListOfProducts } from "@/actions";


async function ServerActionsExample(){
    const products = await fetchListOfProducts()
    console.log(products)

    return (
        <div>
            <h1>Server actions example - server components</h1>
            <ul>
                {
                    products && products.length > 0 ?
                    products.map(productItem => <li key={productItem.id}>{productItem.title}</li>)
                    : <h3>No products available</h3>
                }
            </ul>
        </div>
    )
}

export default ServerActionsExample;