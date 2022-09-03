import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const ViewSinglePost: NextPage = () => {

  const router = useRouter()
  const id = router.query.id

  return (
    <div>hello world from ViewSinglePost page.</div>
  )
}

export default ViewSinglePost
