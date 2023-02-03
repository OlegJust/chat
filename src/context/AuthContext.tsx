import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { Props } from '../interface/main'

export const AuthContext = createContext({})

export const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log(user)
      if (user) {
        setCurrentUser(user)
      }
    })

    return () => {
      unsub()
    }
  }, [])

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>
}
