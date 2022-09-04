import React from 'react'
import { useRouter } from 'next/router'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { config } from '../config'

const firebaseApp = initializeApp(config.firebase)
const auth = getAuth(firebaseApp)

const Navbar: React.FC = () => {

  const router = useRouter()

  const handleLogout = () => {
    signOut(auth)
    router.push('/auth/login')
  }

  const handleRedirect = () => {
    router.push(`/auth/login`)
  }

  return (
    <div className="bg-teal-400 py-4 px-12">
      <div className='flex justify-between items-center'>
        <div>

        </div>
        <div className="space-x-3 text-white">
          {
            auth.currentUser?.uid ? <button onClick={handleLogout} className='py-1 px-2 border border-1 border-gray-100'>Logout</button>
              :
              <button onClick={handleRedirect} className='py-1 px-2 border border-1 border-gray-100'>Login</button>
          }
        </div>
      </div>
    </div >
  )
}

export default Navbar
