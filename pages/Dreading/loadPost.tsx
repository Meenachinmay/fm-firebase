import type { NextPage } from 'next'

const LoadPost: NextPage = () => {

  const handleLoadPost = () => {
    alert('clicked')
  }
  return (
    <div className='flex flex-col justify-center align-center container mx-auto p-5'>
      <div className=''>
        <p onClick={handleLoadPost} className="text-center underline cursor-pointer text-teal-500 text-3xl hover:text-blue-500" > Hello form LoadPost page.</p>
        <ul className="mt-12 space-y-4 cursor-pointer justify-items-start">
          <li className="p-3 rounded border border-1 border-teal-500 text-gray-500 text-xl hover:bg-gray-100">
            Hello world
          </li>
          <li className="p-3 rounded border border-1 border-teal-500 text-gray-500 text-xl hover:bg-gray-100">
            Hello world
          </li>
        </ul>
      </div>
    </div >
  )
}

export default LoadPost
