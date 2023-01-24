import React from 'react'
import InfiniteScrollAnimation from './InfiniteScrollAnimation'
import { Props } from '../../interface/main'

function LoginPage({ children }: Props) {
  return (
    <div className='block 2xl:w-3/5 lg:w-4/5 lg:h-4/5 w-full h-full bg-white lg:rounded-3xl overflow-hidden lg:flex'>
      <div className=' lg:w-2/4 w-full lg:h-full h-2/4 background-login lg:rounded-3xl rounded-b-3xl'>
        {children}
      </div>
      <div className='lg:w-2/4 w-full lg:h-full h-2/4  flex justify-center'>
        <InfiniteScrollAnimation />
      </div>
    </div>
  )
}

export default LoginPage
