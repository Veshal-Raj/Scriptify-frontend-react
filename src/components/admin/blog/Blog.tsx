import { useQuery } from "@tanstack/react-query";
import Navbar from "../../Navbar"
import BlogTable from "./BlogTable";
import { getAllBlogsApi } from "../../../api/admin";

// const blogs = [
//   { _id: 1, title: 'Introduction to React', author: 'John Doe', date: '2024-04-18' },
//   { _id: 2, title: 'Getting Started with Material-UI', author: 'Jane Smith', date: '2024-04-19' },
//   { _id: 3, title: 'State Management in React with Redux', author: 'Alex Johnson', date: '2024-04-20' },
//   { _id: 4, title: 'Responsive Web Design Techniques', author: 'Emily Brown', date: '2024-04-21' },
//   { _id: 5, title: 'Creating RESTful APIs with Express.js', author: 'Michael Williams', date: '2024-04-22' },
//   // Add more blog objects as needed
// ];


const Blog = () => {
  const {data: AllBlogs, isLoading} = useQuery({
    queryKey: ['getAllBlogs'],
    queryFn: getAllBlogsApi
  })

  // console.log('AllBlogs', AllBlogs)
  if (AllBlogs?.data) console.table('all blogs  --- ',AllBlogs?.data)
  const blogs = AllBlogs?.data
  // console.log(blogs)
  console.log('isBlocked --- ',blogs?.isBlocked)
  return (
    <>
        <Navbar />
        {isLoading? <></> : <BlogTable blogs={blogs} /> }
    </>
  )
}

export default Blog