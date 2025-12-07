import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './index.css'
import {AuthProvider} from './context/AuthConext'

import { GoogleOAuthProvider } from '@react-oauth/google'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="328736217300-kecf1hqan417camohvl62q4sm0dd7apa.apps.googleusercontent.com">
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
)
