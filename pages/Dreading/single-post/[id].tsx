import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { initializeApp } from 'firebase/app'
import { doc, getFirestore, collection, onSnapshot, query, where, limit, getDocs } from 'firebase/firestore'
import { config } from '../../../config'
import { useEffect, useState } from 'react'
import { Post } from '../../../dataTypes/PostType'

const firebaseApp = initializeApp(config.firebase)
const firestore = getFirestore(firebaseApp)
const postsCol = collection(firestore, 'posts')

const ViewSinglePost: NextPage = () => {

  const [post, setPost] = useState<Post>({ id: '', title: '', subTitle: '', content: '', userId: '' })

  const router = useRouter()
  const id = router.query.id

  useEffect(() => {
    const q = query(postsCol, where('id', '==', `${id}`), limit(1))
    onSnapshot(q, snapShot => {
      snapShot.forEach((doc) => {
        setPost(doc.data())
      })
    })
  }, [firestore])

  console.log(post)

  return (

    <div className='container mx-auto flex flex-col md:flex-row items-center justify-center'>
      <div className='mt-12 w-1/2 p-4 bg-white border border-1 border-teal-500 shadow-lg rounded-lg'>
        <div className="space-y-0 mb-3">
          <p className='text-2xl text-gray-800 font-semibold'>{post.title}</p>
          <p className='text-gray-500 text-md'>{post.subTitle}</p>
        </div>
        <div>
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  )
}

export default ViewSinglePost
