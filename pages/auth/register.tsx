import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { doc, getFirestore, collection, onSnapshot, setDoc } from 'firebase/firestore'
import { config } from '../../config'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'

const firebaseApp = initializeApp(config.firebase)
const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)

const Register: NextPage = () => {

  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [lerror, setLError] = useState<{ type: string, message: string } | null>({
    type: '', message: ''
  })

  const handleRegister = async () => {
    if (email.trim().length === 0) {
      setLError({ type: 'email', message: 'email is required' })
      return
    } else {
      setLError(null)
    }

    if (password.trim().length === 0) {
      setLError({ type: 'password', message: 'password is required' })
      return
    } else {
      setLError(null)
    }

    createUserWithEmailAndPassword(auth, email, password)
  }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        router.push(`/`)
      } else {
        router.push(`/auth/login`)
      }
    })
  }, [])

  return (
    <div className='container mx-auto flex flex-col md:flex-row items-center justify-center'>
      <div className='bg-teal-500 p-4 mt-32 rounded' >
        <p className='text-white text-xl font-bold text-center'>New Register</p>
        <div className='flex flex-col items-center mt-6 space-y-4'>

          <input onChange={(e) => setEmail(e.target.value)} style={{ minWidth: '400px' }} className='p-3 text-gray-700 border border-1 border-teal-500 focus:outline-none' type='text' placeholder='Create Email address' />
          {lerror && lerror.type === 'email' ? <p className='text-red-500 text-xs'>{lerror.message}</p> : null}

          <input onChange={(e) => setPassword(e.target.value)} style={{ minWidth: '400px' }} className='p-3 text-gray-700 border border-1 border-teal-500 focus:outline-none' type='password' placeholder='Create Sign in password' />
          {lerror && lerror.type === 'password' ? <p className='text-red-500 text-xs'>{lerror.message}</p> : null}

          <button onClick={handleRegister} className='bg-white text-teal-500 p-3 hover:bg-gray-50'>Sign Up</button>

        </div>
      </div>
    </div >
  )
}

export default Register
