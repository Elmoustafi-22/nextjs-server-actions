import { fetchListOfProducts } from "@/actions";


async function ServerActionsExample(){
    const products = await fetchListOfProducts()

    return (
        <div className="p-5">
            <h1 className="text-2xl font-semibold italic">Server actions example - server components</h1>
            <ul className="mt-2 space-y-2 text-sm">
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