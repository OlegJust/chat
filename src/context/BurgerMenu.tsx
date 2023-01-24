import React from 'react'
import { Props } from '../interface/main'
// import GiHamburgerMenu from 'react-icons/ai';
import { FaBeer } from 'react-icons/fa'

function BurgerMenu({ children }: Props) {
  //   function Menu(e) {
  //     let list = document.querySelector('ul')
  //     e.name === 'menu'
  //       ? ((e.name = 'close'), list.classList.add('top-[80px]'), list.classList.add('opacity-100'))
  //       : ((e.name = 'menu'),
  //         list.classList.remove('top-[80px]'),
  //         list.classList.remove('opacity-100'))
  //   }
  return (
    <nav className='p-5 bg-white shadow md:flex md:items-center md:justify-between'>
      <div className='flex justify-between items-center '>
        <span className='text-2xl font-[Poppins] cursor-pointer'>
          <FaBeer />
          tailwind
        </span>

        <span className='text-3xl cursor-pointer mx-2 md:hidden block'>
          <FaBeer name='menu' />
        </span>
      </div>

      <ul className='md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500'>
        <li className='mx-4 my-6 md:my-0'>
          <a href='#' className='text-xl hover:text-cyan-500 duration-500'>
            HOME
          </a>
        </li>
        <li className='mx-4 my-6 md:my-0'>
          <a href='#' className='text-xl hover:text-cyan-500 duration-500'>
            SERVICE
          </a>
        </li>
        <li className='mx-4 my-6 md:my-0'>
          <a href='#' className='text-xl hover:text-cyan-500 duration-500'>
            ABOUT
          </a>
        </li>
        <li className='mx-4 my-6 md:my-0'>
          <a href='#' className='text-xl hover:text-cyan-500 duration-500'>
            CONTACT
          </a>
        </li>
        <li className='mx-4 my-6 md:my-0'>
          <a href='#' className='text-xl hover:text-cyan-500 duration-500'>
            BLOGS
          </a>
        </li>

        <button className='bg-cyan-400 text-white font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-cyan-500 rounded '>
          Get started
        </button>
        <h2 className=''>{children}</h2>
      </ul>
    </nav>
  )
}

export default BurgerMenu
