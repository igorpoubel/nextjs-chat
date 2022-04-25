import { createContext, useEffect, useState } from 'react'
import Router from 'next/router'
import { recoveryUserInfo, sighInRequest } from 'services/auth'
import { setCookie, parseCookies } from 'nookies'
import { api } from 'services/api'

interface SignInProps {
  username: string
  password: string
}

interface UserProps {
  username: string
  name: string
  avaterUrl: string
}

interface AuthContextProps {
  isAuthenticated: boolean
  user: UserProps
  signIn: (data: SignInProps) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<UserProps | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'nextjschat.token': token } = parseCookies()

    if (token) {
      recoveryUserInfo(token).then((response) => setUser(response.user))
    }
  }, [])

  const signIn = async ({ username, password }: SignInProps) => {
    const { token, user } = await sighInRequest({
      username,
      password
    })

    setCookie(undefined, 'nextjschat.token', token, {
      maxAge: 60 * 60 * 1 // 1 hour
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    setUser(user)

    Router.push('/dashboard')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
