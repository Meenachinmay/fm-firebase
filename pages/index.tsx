import type { NextPage } from 'next'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'
import { config } from '../config'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'

const firebaseApp = initializeApp(config.firebase)
const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)


const Home: NextPage = () => {

  const router = useRouter()

  const handleLogout = () => {
    signOut(auth)
  }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user) router.push(`/auth/login`)
    })
  }, [])

  return (
    <div className="h-screen bg-gray-100">
      <div className="container mx-auto">
        <button className='bg-teal-500 text-white p-3 mt-12' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Home
