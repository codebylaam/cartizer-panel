import { createContext } from 'react'

export type UserProfileData = {
  id: string
  first_name: string
  last_name: string
  gender?: 'male' | 'female' | 'other' | null
  seller_id: string
  created_at: string
  updated_at: string
}

export type UserProfile = {
  id: string
  phone: string
  email: string
  created_at: string
  updated_at: string
  profile: UserProfileData
}

export type AuthContextT = {
  isAuthenticated: boolean
  user: UserProfile | null
}

// biome-ignore lint/style/noNonNullAssertion: we handle null in the provider
export const AuthContext = createContext<AuthContextT>(null!)
