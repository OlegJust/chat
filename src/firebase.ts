import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCgBlRZAUSiJIYs1xPJ4czMR5c49PgrZjc',
  authDomain: 'chatdemo-fc749.firebaseapp.com',
  databaseURL: 'https://chatdemo-fc749-default-rtdb.firebaseio.com',
  projectId: 'chatdemo-fc749',
  storageBucket: 'chatdemo-fc749.appspot.com',
  messagingSenderId: '254365807544',
  appId: '1:254365807544:web:431116584d792797dbd54d',
  measurementId: 'G-72QZYBFZQR',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
