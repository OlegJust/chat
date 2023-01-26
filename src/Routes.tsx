import { Route, Routes, Navigate } from 'react-router-dom'
import Account from './components/Account/Account'
import Friends from './components/Friends/Friends'
import Messenger from './components/Messenger/Messenger'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { Props } from './interface/main'

import Login from './components/login/Login'
import Register from './components/login/Register'

export function App() {
  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ children }: Props) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }

    return <>{children}</>
  }

  return (
    <div className='background-main flex justify-center items-center h-screen'>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path='/friends'
          element={
            <ProtectedRoute>
              <Friends />
            </ProtectedRoute>
          }
        />
        <Route
          path='/messenger'
          element={
            <ProtectedRoute>
              <Messenger />
            </ProtectedRoute>
          }
        />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
