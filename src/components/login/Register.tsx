import React, { useState, FormEvent, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginPage from './LoginPage'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db, storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

function Register() {
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState<File[]>([])

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      const date = new Date().getTime()
      const storageRef = ref(storage, `${displayName + date}`)
      if (file.length > 0) {
        const files = file[0]
        await uploadBytesResumable(storageRef, files).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              })
              await setDoc(doc(db, 'users', res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              })

              await setDoc(doc(db, 'userChats', res.user.uid), {})
              navigate('/')
            } catch (err) {
              console.log(err)
              setErr(true)
              setLoading(false)
            }
          })
        })
      }
    } catch (err) {
      setErr(true)
      setLoading(false)
    }
  }
  return (
    <LoginPage>
      <section className='flex items-center justify-center h-full'>
        <div className=''>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Register
            </h1>
            <form onSubmit={handleSubmit} className='space-y-4 ' action='#'>
              <div>
                <label
                  htmlFor='text'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  display name
                </label>
                <input
                  type='text'
                  onChange={(e) => setDisplayName(e.target.value)}
                  className='bg-inherit text-sm border border-blue-100 rounded-lg w-full p-2.5 text-white'
                  placeholder='name@company.com'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                  className='bg-inherit text-sm border border-blue-100 rounded-lg w-full p-2.5 text-white'
                  placeholder='name@company.com'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  onChange={(e) => setPassword(e.target.value)}
                  className='bg-inherit text-sm border border-blue-100 rounded-lg w-full p-2.5 text-white'
                  required
                />
              </div>
              <input
                required
                onChange={({ currentTarget: { files } }: ChangeEvent<HTMLInputElement>) => {
                  if (files && files.length) {
                    setFile((existing) => existing.concat(Array.from(files)))
                  }
                }}
                style={{ display: 'none' }}
                type='file'
                id='file'
              />
              <label htmlFor='file'>
                <span>Add an avatar</span>
              </label>

              <button disabled={loading} type='submit' className='w-full text-white bg-primary-600'>
                Sign up
              </button>
              {loading && 'Uploading and compressing the image please wait...'}
              {err && <span>Something went wrong</span>}
            </form>
            <p className='text-white'>
              You dont have an account?{' '}
              <Link to='/' className='underline '>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </LoginPage>
  )
}

export default Register
