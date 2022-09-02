import type { NextPage } from 'next'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'
import { config } from '../config'
import { useEffect, useState } from 'react'

const firebaseApp = initializeApp(config.firebase)
const firestore = getFirestore(firebaseApp)
const postsCol = collection(firestore, 'posts')

const Home: NextPage = () => {
  const [posts, setPosts] = useState<{
    id: string,
    title: string,
    subTitle: string,
    content: string,
    userId: string
  }[]>([])
  useEffect(() => {

    onSnapshot(postsCol, snapShot => {
      let d = []
      snapShot.forEach((doc) => {
        d.push(doc.data())
      })
      console.log(d)
    })
  }, [firestore])

  return (
    <div className="text-blue-500 text-3xl">Hello world</div>
  )
}

export default Home
