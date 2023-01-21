import React from 'react'
import InfiniteScrollAnimation from './components/InfiniteScrollAnimation'
import Login from './components/Login'

function App() {
  return (
    <div className='bg-gradient-to-r from-indigo-200 from-transparent to-orange-200 flex justify-center items-center h-screen'>
      <div className='block w-3/5 h-4/5 bg-white rounded-3xl overflow-hidden flex flex-row'>
        <div className='w-2/4 h-full '>
          <Login />
        </div>
        <div className='w-2/4 h-full flex justify-center rer'>
          <InfiniteScrollAnimation />
        </div>
      </div>
    </div>
  )
}

export default App
