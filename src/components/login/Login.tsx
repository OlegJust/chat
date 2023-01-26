import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import LoginPage from './LoginPage'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

function Login() {
  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (err) {
      setErr(true)
    }
  }
  return (
    <LoginPage>
      <section className='flex items-center justify-center h-full'>
        <div className=''>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign in to your account
            </h1>
            <form onSubmit={handleSubmit} className='space-y-4 ' action='#'>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
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
                  className='bg-inherit text-sm border border-blue-100 rounded-lg w-full p-2.5 text-white'
                  required
                />
              </div>

              <button type='submit' className='w-full text-white bg-primary-600'>
                Sign in
              </button>
            </form>
            <p className='text-white'>
              You dont have an account?{' '}
              <Link to='/register' className='underline '>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </LoginPage>
  )
}

export default Login
