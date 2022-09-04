import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { doc, getFirestore, collection, onSnapshot, setDoc } from 'firebase/firestore'
import { config } from '../../config'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import Link from 'next/link'

const firebaseApp = initializeApp(config.firebase)
const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)

const Login: NextPage = () => {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [fetching, setFetching] = useState(false)
  const [lerror, setLError] = useState<{ type: string, message: string } | null>({
    type: '', message: ''
  })
  const [serror, setSError] = useState<{ type: string, message: string } | null>({
    type: '', message: ''
  })

  const handleLogin = async () => {
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

    setFetching(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {

        setFetching(false)
      })
      .catch((error) => {
        setFetching(false)
        if (error.code === 'auth/invalid-email') {
          setSError({ type: 'email', message: 'Email is invalid.' })
          return
        } else {
          setSError(null)
        }

        if (error.code === 'auth/wrong-password') {
          setSError({ type: 'password', message: 'Password is invalid.' })
          return
        } else {
          setSError(null)
        }

      })

  }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        router.push(`/Dadding/AddPost`)
      }
    })
  }, [])

  const handleRedirect = () => {
    router.push(`/auth/register`)
  }

  return (
    <div className='container mx-auto flex flex-col md:flex-row items-center justify-center'>
      <div className='bg-teal-500 p-4 mt-32 rounded shadow-lg' >
        <p className='text-white text-xl font-bold text-center'>Login</p>
        <div className='flex flex-col items-center mt-6 space-y-4'>

          <input onChange={(e) => setEmail(e.target.value)} style={{ minWidth: '400px' }} className='p-3 text-gray-700 border border-1 border-teal-500 focus:outline-none' type='text' placeholder='Email address' />
          {lerror && lerror.type === 'email' ? <p className='text-red-500 text-xs'>{lerror.message}</p> : null}
          {serror && serror.type === 'email' ? <p className='text-red-500 text-xs'>{serror.message}</p> : null}

          <input onChange={(e) => setPassword(e.target.value)} style={{ minWidth: '400px' }} className='p-3 text-gray-700 border border-1 border-teal-500 focus:outline-none' type='password' placeholder='password' />
          {lerror && lerror.type === 'password' ? <p className='text-red-500 text-xs'>{lerror.message}</p> : null}
          {serror && serror.type === 'password' ? <p className='text-red-500 text-xs'>{serror.message}</p> : null}

          <button disabled={fetching} onClick={handleLogin} className='bg-white text-teal-500 focus:outline-none py-1 px-5 rounded-lg'>{fetching ? 'Signing In' : 'Login'}</button>
          <p onClick={handleRedirect} className='underline cursor-pointer text-white text-xs'>New account?</p>
        </div>
      </div>
    </div >
  )
}

export default Login

