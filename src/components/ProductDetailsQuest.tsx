import { useFetcher } from 'react-router-dom'
import { Product } from "../types"
import { formatCurrency } from "../utils"

type ProductDetailsProps = {
    product: Product
}



export default function ProductDetailsQuest({product} : ProductDetailsProps) {

    const fetcher = useFetcher()
    const isAvailable = product.availability

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                { formatCurrency(product.price) }
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method='GET'>
                    <label>
                        {isAvailable ? 'Disponible' : 'No Disponible'}
                    </label>
                </fetcher.Form>
            </td>
        </tr> 
    )
}
