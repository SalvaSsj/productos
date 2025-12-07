// src/views/Products.tsx
import { ActionFunctionArgs, Link, useLoaderData } from 'react-router-dom'
import { getProducts, updateProductAvailability } from '../services/ProductService'
import ProductDetails from '../components/ProductDetails'
import { Product } from '../types'
import { googleLogout } from '@react-oauth/google'
import { useAuth } from '../context/AuthConext'

export async function loader() {
  const products = await getProducts()
  return products
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
  await updateProductAvailability(+data.id)
  return {}
}

export default function Products() {
  const { profile, setProfile, setUser } = useAuth()
  const data = useLoaderData() as Product[]

  const logOut = () => {
    googleLogout()
    setProfile(null)
    setUser(null)
  }

  return (
    <>

      {profile && (
        <div className="mb-4">
          <img src={profile.picture} alt="user image" className="rounded-full w-20 h-20" />
          <h3>Usuario:</h3>
          <p>Nombre: {profile.name}</p>
          <p>Correo: {profile.email}</p>
          <button
            onClick={logOut}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Log out
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to="/nuevo"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Agregar Producto
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto border-collapse">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2 text-left">Producto</th>
              <th className="p-2 text-left">Precio</th>
              <th className="p-2 text-left">Disponibilidad</th>
              <th className="p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
