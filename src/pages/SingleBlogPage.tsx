import { useParams } from "react-router-dom"
import MobileFooter from "../components/MobileFooter"
import Navbar from "../components/Navbar"
import ShowBlogContent from "../components/ShowBlogContent"

const SingleBlogPage = () => {
  const { blogId } = useParams()
  console.log(blogId)
  return (
    <div>
      <Navbar />
      <ShowBlogContent blogId={blogId}/>
      <MobileFooter icon='write' />
    </div>
  )
}

export default SingleBlogPage