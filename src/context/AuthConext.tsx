// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'
import { TokenResponse } from '@react-oauth/google'

interface GoogleProfile {
  id: string
  email: string
  name: string
  picture: string
}

interface AuthContextType {
  user: TokenResponse | null
  profile: GoogleProfile | null
  setUser: (u: TokenResponse | null) => void
  setProfile: (p: GoogleProfile | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TokenResponse | null>(null)
  const [profile, setProfile] = useState<GoogleProfile | null>(null)

  return (
    <AuthContext.Provider value={{ user, profile, setUser, setProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
