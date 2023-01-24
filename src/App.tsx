import React from 'react'
import InfiniteScrollAnimation from './components/InfiniteScrollAnimation'
import Login from './components/Login'

function App() {
  return (
    <div className='background-main  flex justify-center items-center h-screen'>
      <div className='block w-3/5 h-4/5 bg-white rounded-3xl overflow-hidden flex flex-row'>
        <div className='w-2/4 h-full background-login rounded-3xl'>
          <Login />
        </div>
        <div className='w-2/4 h-full  flex justify-center'>
          <InfiniteScrollAnimation />
        </div>
      </div>
    </div>
  )
}

export default App
