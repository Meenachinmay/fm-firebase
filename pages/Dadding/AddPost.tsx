import type { NextPage } from 'next'

const AddPost: NextPage = () => {

  const handleAddData = () => {
    alert('clicked')
  }
  return (
    <div className='container mx-auto'>
      <div>
        <div className='flex flex-col mt-12 space-y-3 mb-5'>
          <input className='p-2 text-md border border-1 border-teal-500' type='text' placeholder="enter post id..." />
          <input className='p-2 text-md border border-1 border-teal-500' type='text' placeholder="enter post title..." />
          <input className='p-2 text-md border border-1 border-teal-500' type='text' placeholder="enter post subtitle..." />
          <input className='p-2 text-md border border-1 border-teal-500' type='text' placeholder="enter post content..." />
          <input className='p-2 text-md border border-1 border-teal-500' type='text' placeholder="enter post userId..." />
        </div>
        <div onClick={handleAddData} className='bg-teal-500 p-3 text-white cursor-pointer w-28 text-center hover:bg-teal-600'>Add data</div>
      </div>
    </div>
  )
}

export default AddPost
