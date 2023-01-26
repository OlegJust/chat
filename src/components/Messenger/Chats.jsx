import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { db } from '../../firebase'

const Chats = () => {
  const [chats, setChats] = useState([])

  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data())
      })

      return () => {
        unsub()
      }
    }

    currentUser.uid && getChats()
  }, [currentUser.uid])

  const handleSelect = (u) => {
    dispatch({ type: 'CHANGE_USER', payload: u })
  }
  // console.log(Object.entries(chats))

  return (
    <ul role='list' className='p-6 divide-y divide-slate-200'>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <li
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
            className='flex py-4 first:pt-0 last:pb-0'
          >
            <img className='h-10 w-10 rounded-full' src={chat[1].userInfo.photoURL} alt='' />
            <div className='ml-3 overflow-hidden'>
              <p className='text-sm font-medium text-slate-900'>{chat[1].userInfo.displayName}</p>
              <p className='text-sm text-slate-500 truncate'>{chat[1].lastMessage?.text}</p>
            </div>
          </li>
        ))}
    </ul>
  )
}

export default Chats
