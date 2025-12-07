import { ActionFunctionArgs, useLoaderData, Link} from 'react-router-dom'
import { getProducts, updateProductAvailability } from '../services/ProductService'
import ProductDetailsQuest from '../components/ProductDetailsQuest';
import { Product } from '../types';

export async function loader() {
  const products = await getProducts()
  return products
}

export async function action({request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    await updateProductAvailability(+data.id)
    return {}
}

export default function Products() {

  const data = useLoaderData() as Product[]

  return (
    <>
      <div className='flex justify-between'>
            <h2 className='text-4xl font-black text-slate-500'>Productos</h2>
            <Link
                to="/"
                className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
            >
                Regresar
            </Link>
        </div>

        <div className="p-2">
            <table className="w-full mt-5 table-auto">
                <thead className="bg-slate-800 text-white">
                    <tr>
                        <th className="p-2">Producto</th>
                        <th className="p-2">Precio</th>
                        <th className="p-2">Disponibilidad</th>
                    </tr>
                </thead>
                <tbody>
                  {data.map(product => (
                      <ProductDetailsQuest
                          key={product.id}
                          product={product}
                      />
                  ))}
                </tbody>
            </table>
        </div>
    </>
  )
}
