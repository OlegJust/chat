import { Route, Routes } from 'react-router-dom'
import Account from './components/Account/Account'
import Friends from './components/Friends/Friends'
import Messenger from './components/Messenger/Messenger'

import Login from './components/login/Login'
import Register from './components/login/Register'

export function App() {
  return (
    <div className='background-main  flex justify-center items-center h-screen'>
      <Routes>
        <Route path='/' element={<Account />} />
        <Route path='/friends' element={<Friends />} />
        <Route path='/messenger' element={<Messenger />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
