import React from 'react'
import BurgerMenu from '../../context/BurgerMenu'
import Chats from './Chats'
import Messages from './Messages'
import Input from './Input'

function Messenger() {
  return (
    <BurgerMenu>
      <div className='md:h-4/5 h-full w-full p-4 md:flex items-center'>
        <div className='bg-white w-full h-20 md:w-20 md:mr-8 rounded-3xl overflow-auto lg:w-1/4 md:h-full'>
          <Chats />
        </div>
        <div className='bg-white md:mt-0 mt-6 rounded-3xl overflow-auto w-full md:h-full h-5/6'>
          <Messages />
          <Input />
        </div>
      </div>
    </BurgerMenu>
  )
}

export default Messenger
