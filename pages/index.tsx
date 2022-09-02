import type { NextPage } from 'next'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'
import { config } from '../config'
import { useEffect, useState } from 'react'
import { Post } from '../dataTypes/PostType'

const firebaseApp = initializeApp(config.firebase)
const firestore = getFirestore(firebaseApp)
const postsCol = collection(firestore, 'posts')

let D: Post[] = []

const Home: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {

    onSnapshot(postsCol, snapShot => {
      D = []
      snapShot.forEach((doc) => {
        D.push(doc.data())
      })
      D.map(data => console.log(data.content))
      setPosts(D)
      console.log(D)
    })
  }, [firestore])

  return (
    <div className="h-screen bg-gray-100">
      <div className="container mx-auto">
        {
          D.map(data => (
            <p className='text-gray-800 text-2xl'>{data.title}</p>
          ))
        }
      </div>
    </div>
  )
}

export default Home
