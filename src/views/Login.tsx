// src/components/Login.tsx
import { useGoogleLogin, TokenResponse } from '@react-oauth/google'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../context/AuthConext'

export default function Login() {
  const { setUser, setProfile } = useAuth()
  const navigate = useNavigate()

  const login = useGoogleLogin({
    onSuccess: async (codeResponse: TokenResponse) => {
      setUser(codeResponse)
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`
      )
      setProfile(res.data)
      navigate('/productos')
    },
    onError: (error) => console.error('Login Failed:', error),
  })

  return (
    <div>
      <h2 className="text-2xl font-bold">Apartado de registro:</h2>
      <button
        onClick={() => login()}
        className="bg-indigo-600 text-white px-4 py-2 rounded">
        Conexión mediante Google
      </button>
      <button 
        onClick={() => navigate('/productosQT')} 
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded" > 
        Ir a Productos
      </button>
    </div>
  )
}
