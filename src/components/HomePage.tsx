import axios from "axios"
import InPageNavigation from "./InPageNavigation"
import { useEffect, useState } from "react"
import BlogPostCard from "./BlogPostCard"

const HomePage = () => {
    const [blogs, setBlogs] = useState(null)
    useEffect(() => {
        fetchLatestBlogs()
    }, [])
    const fetchLatestBlogs = () => {
        axios.get(import.meta.env.VITE_BASE_URL + 'user/latest-blog' )
      .then(({data} ) => { 
        console.log('blogs -->> ', data.response)
        setBlogs(data.response)
       

      }).catch(( error) => {
            console.log(error)
      })
    }
  return (
    <>
        <section className="h-cover flex justify-center gap-10">

            <div className="w-full">
                <InPageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>
                    <>
                        {
                            blogs === null ? <h1>loading...</h1> : blogs.map((blog, i) => {
                                return <BlogPostCard content={blog} author={ blog.author.personal_info } />
                            })
                        }
                    </>
                    
                    <h1>Trending Blog</h1>
                </InPageNavigation>
            </div>
            
            <div className=""></div>
        </section>
    </>
  )
}

export default HomePage