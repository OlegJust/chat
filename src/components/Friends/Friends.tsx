import React, { useState, useContext } from 'react'
import BurgerMenu from '../../context/BurgerMenu'
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore'
import { db } from '../../firebase'
import { AuthContext } from '../../context/AuthContext'

function Friends() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where('displayName', '==', username))

    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      })
    } catch (err) {
      setErr(true)
    }
  }

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch()
  }

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    try {
      const res = await getDoc(doc(db, 'chats', combinedId))

      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), { messages: [] })

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })
      }
    } catch (err) {
      console.log(err)
    }

    setUser(null)
    setUsername('')
  }
  return (
    <BurgerMenu>
      <div className='md:h-4/5 h-full w-full p-4 md:flex items-center'>
        <div className='bg-white md:mt-0 mt-6 rounded-3xl overflow-auto w-full md:h-full h-5/6'>
          <div className='search'>
            <div className='searchForm'>
              <input
                type='text'
                placeholder='Find a user'
                onKeyDown={handleKey}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            {err && <span>User not found!</span>}
            {user && (
              <div
                onClick={handleSelect}
                className='py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'
              >
                <img
                  className='block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0'
                  src={user.photoURL}
                  alt=''
                />
                <div className='text-center space-y-2 sm:text-left'>
                  <div className='space-y-0.5'>
                    <p className='text-lg text-black font-semibold'>{user.displayName}</p>
                  </div>
                  <button className='px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2'>
                    Message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </BurgerMenu>
  )
}

export default Friends
