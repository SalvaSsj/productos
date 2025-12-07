import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, { loader as productsLoader, action as updateAvailabilityAction } from './views/Products'
import ProductsQuest, { loader as productsLoaderQT, action as updateAvailabilityActionQT } from './views/ProductsQuest'
import NewProduct, { action as newProductAction } from './views/NewProduct'
import EditProduct, { loader as editProductLoader, action as editProductAction } from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails'
import Login from './views/Login'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />, 
        children: [
            {
                index: true,
                element: <Login />, 
            },
            {
                path:'productos/',
                element: <Products />,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path:'productosQT/',
                element: <ProductsQuest />,
                loader: productsLoaderQT,
                action: updateAvailabilityActionQT
            },
            {
                path: 'nuevo/',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path:':id/editar/',
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            }, 
            {
                path:':id/eliminar/',
                action: deleteProductAction
            }
        ],
    }
])