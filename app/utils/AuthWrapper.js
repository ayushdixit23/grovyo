"use client"
import Cookies from 'js-cookie'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { checkToken } from './useful'

export const AuthContext = createContext()

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false)
  const [data, setData] = useState("")

  const f = async (token) => {
    try {
      if (token) {
        const a = await checkToken(token)
        setData(a.payload)
        setAuth(true)
      } else {
        setAuth(false)
        setData("")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const contextValue = useMemo(() => ({
    data,
    auth,
    setAuth,
    setData,
    f,
  }), [data, auth, f]);

  useEffect(() => {
    const token = Cookies.get("access_token") || null
    f(token)
  }, [setAuth, auth])
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}