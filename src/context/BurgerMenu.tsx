import React, { useRef, RefObject, useState } from 'react'
import { Props } from '../interface/main'
// import GiHamburgerMenu from 'react-icons/ai';
import { FaUserCircle, FaUserFriends } from 'react-icons/fa'
import { AiFillMessage } from 'react-icons/ai'
import { MdOutlineExitToApp } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

function BurgerMenu({ children }: Props) {
  return (
    <div className='h-full xl:w-4/5 w-full flex items-center'>
      <nav className='md:h-4/5'>
        <ul className='px-8 md:px-0 bg-white md:bg-inherit md:border-0 border-t border-slate-400 md:flex-col md:h-full flex z-0 md:z-auto md:static absolute w-full left-0 md:w-auto  md:opacity-100 bottom-0 top-80px opacity-1 transition-all ease-in duration-500'>
          <li className=''>
            <Link to='/' className='text-xl text-slate-500 hover:text-slate-900 duration-500'>
              <FaUserCircle className=' text-4xl m-3' />
            </Link>
          </li>
          <li className=''>
            <Link
              to='/friends'
              className='text-xl text-slate-500 hover:text-slate-900 duration-500'
            >
              <FaUserFriends className='text-4xl m-3' />
            </Link>
          </li>
          <li className='grow'>
            <Link
              to='/messenger'
              className='text-xl text-slate-500 hover:text-slate-900 duration-500'
            >
              <AiFillMessage className=' text-4xl m-3' />
            </Link>
          </li>
          <li className=''>
            <Link
              onClick={() => signOut(auth)}
              to='/login'
              className='text-xl text-slate-500 hover:text-slate-900 duration-500'
            >
              <MdOutlineExitToApp className=' text-4xl m-3' />
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  )
}

export default BurgerMenu
