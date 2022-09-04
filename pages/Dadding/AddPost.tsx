import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { doc, getFirestore, collection, onSnapshot, setDoc } from 'firebase/firestore'
import { config } from '../../config'
import { Post } from '../../dataTypes/PostType'
import SinglePost from '../../components/SinglePost'

const firebaseApp = initializeApp(config.firebase)
const firestore = getFirestore(firebaseApp)
const postsCol = collection(firestore, 'posts')

let D: Post[] = []

const AddPost: NextPage = () => {

  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setsubTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const [posts, setPosts] = useState<Post[]>([])
  const [fetching, setFetching] = useState(false)

  const handleAddData = () => {
    setDoc(doc(firestore, `posts/postId-${id}`), {
      id: id, title: title, content: content, subTitle: subtitle, userId: userId
    })
  }

  useEffect(() => {
    setFetching(true)
    onSnapshot(postsCol, snapShot => {
      D = []
      snapShot.forEach((doc) => {
        D.push(doc.data())
      })
      setPosts(D)
      setFetching(false)
    })
  }, [firestore])

  return (
    <div className='flex space-x-6 container mx-auto'>
      <div className='w-1/2'>
        <div className='flex flex-col mt-12 space-y-3 mb-5'>
          <input onChange={(e) => setId(e.target.value)} className='p-2 text-md border border-1 border-teal-500' type='text' placeholder="enter post id..." />
          <input onChange={(e) => setTitle(e.target.value)} className='p-2 text-md border border-1 border-teal-500' type='text' placeholder="enter post title..." />
          <input onChange={(e) => setsubTitle(e.target.value)} className='p-2 text-md border border-1 border-teal-500' type='text' placeholder="enter post subtitle..." />
          <input onChange={(e) => setContent(e.target.value)} className='p-2 text-md border border-1 border-teal-500' type='text' placeholder="enter post content..." />
          <input onChange={(e) => setUserId(e.target.value)} className='p-2 text-md border border-1 border-teal-500' type='text' placeholder="enter post userId..." />
        </div>
        <div onClick={handleAddData} className='bg-teal-500 p-3 text-white cursor-pointer w-28 text-center hover:bg-teal-600'>Add data</div>
      </div>
      <div className='mt-12 border border-1 border-teal-500 p-5 w-1/2 overflow-y-scroll' style={{ maxHeight: "400px" }}>
        {
          fetching ? <p className='flex flex-col justify-center items-center text-center text-teal-500 text-2xl uppercase'>Loading...</p> :
            <ul className='space-y-2'>
              {posts.map((data) => (
                <SinglePost key={data.id} id={data.id} title={data.title} subTitle={data.subTitle} content={data.content} userId={data.userId} />
              ))}
            </ul>
        }
      </div>
    </div >
  )
}

export default AddPost
