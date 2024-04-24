import { useParams } from "react-router-dom"
import MobileFooter from "../components/MobileFooter"
import Navbar from "../components/Navbar"
import ShowBlogContent from "../components/ShowBlogContent"

const SingleBlogPage = () => {
  const { blogId } = useParams()
  return (
    <>
      <Navbar />
      <ShowBlogContent blogId={blogId}/>
      <MobileFooter icon='write' />
    </>
  )
}

export default SingleBlogPage