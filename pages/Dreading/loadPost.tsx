import type { NextPage } from 'next'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'
import { config } from '../../config'
import { getAuth } from 'firebase/auth'

import { useEffect, useState } from 'react'
import { Post } from '../../dataTypes/PostType'
import { useRouter } from 'next/router'

const firebaseApp = initializeApp(config.firebase)
const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)
const postsCol = collection(firestore, 'posts')

let D: Post[] = []

const LoadPost: NextPage = () => {
  const router = useRouter()

  const [posts, setPosts] = useState<Post[]>([])
  const [fetching, setFetching] = useState(false)

  const handleLoadPost = () => {
    setFetching(true)
    onSnapshot(postsCol, snapShot => {
      D = []
      snapShot.forEach((doc) => {
        D.push(doc.data())
      })
      setPosts(D)
      setFetching(false)
    })
  }

  useEffect(() => {
    if (!auth.currentUser) {
      router.push(`/auth/login`)
    }
  }, [])

  if (fetching) {
    return (
      <div className='container mx-auto text-center text-orange-500 text-xl mt-12'>loading posts...</div>
    )
  }

  return (
    <div className='flex flex-col justify-center align-center container mx-auto p-5'>
      <div className=''>
        <p onClick={handleLoadPost} className="text-center underline cursor-pointer text-teal-500 text-3xl hover:text-blue-500" > Hello form LoadPost page.</p>
        <ul className="mt-12 space-y-4 cursor-pointer justify-items-start">
          {
            D.map(data => (
              <li key={data.id} className="p-3 rounded border border-1 border-teal-500 text-gray-500 text-xl hover:bg-gray-100" >
                {data.title}
              </li>
            ))
          }
        </ul>
      </div>
    </div >
  )
}

export default LoadPost
