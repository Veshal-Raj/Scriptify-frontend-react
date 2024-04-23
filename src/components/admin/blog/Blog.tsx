import { useQuery } from "@tanstack/react-query";
import Navbar from "../../Navbar"
import BlogTable from "./BlogTable";
import { getAllBlogsApi } from "../../../api/admin";

const Blog = () => {
  const { data: AllBlogs, isLoading } = useQuery({
    queryKey: ['getAllBlogs'],
    queryFn: getAllBlogsApi
  })

  const blogs = AllBlogs?.data

  return (
    <>
      <Navbar />
      {isLoading ? <></> : <BlogTable blogs={blogs} />}
    </>
  )
}

export default Blog