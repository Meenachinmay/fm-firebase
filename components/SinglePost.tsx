import React from 'react'
import { useRouter } from 'next/router'

type SinglePostProps = {
  id: string,
  title: string,
  subTitle: string,
  content: string,
  userId: string
}

const SinglePost: React.FC<SinglePostProps> = ({ id, title, subTitle, content, userId }: SinglePostProps) => {
  const router = useRouter()

  const handleShowSinglePost = () => {
    router.push(`/Dreading/single-post/${id}`)
  }

  return (
    <div className="bg-white border border-1 border-teal-500 p-3">
      <div className="container mx-auto">
        <div onClick={handleShowSinglePost} className="text-xl text-teal-500 cursor-pointer hover:underline">{title}</div>
        <div className="text-sm text-gray-500 mb-3">{subTitle}</div>
        <div className="text-sm text-gray-800 tracking-tight">{content}</div>
      </div>

    </div>
  )
}

export default SinglePost
