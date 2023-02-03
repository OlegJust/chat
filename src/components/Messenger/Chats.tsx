import { doc, onSnapshot, Timestamp } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { db } from '../../firebase'
import { UserType, Chat } from '../../interface/main'

const Chats = () => {
  const [chats, setChats] = useState<{ [key: string]: Chat }>({})

  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data() as { [key: string]: Chat })
      })

      return () => {
        unsub()
      }
    }

    currentUser.uid && getChats()
  }, [currentUser.uid])

  const handleSelect = (event: UserType) => {
    dispatch({ type: 'CHANGE_USER', payload: event })
  }

  return (
    <ul role='list' className='p-6 divide-y divide-slate-200'>
      {Object.entries(chats)
        ?.sort((a, b) => {
          if (a[1].date === null || b[1].date === null) {
            return 0
          } else {
            const timestampA = new Timestamp(a[1].date.seconds, a[1].date.nanoseconds)
            const timestampB = new Timestamp(b[1].date.seconds, b[1].date.nanoseconds)

            return timestampA < timestampB ? 1 : -1
          }
        })
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
