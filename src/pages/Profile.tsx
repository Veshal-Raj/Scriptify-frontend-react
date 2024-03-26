import { Link, useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchUserBlogs, profileDetails, searchQuery } from "../api/user"
import toast, { Toaster } from "react-hot-toast"
import About from "../components/About"
import { AnimatePresence } from "framer-motion"
import BlogPostCard from "../components/BlogPostCard"
import { motion } from 'framer-motion'
import { Typography } from "@mui/material"
import BlogPostCardSkeleton from "../components/Skeleton/BlogSkeleton"
import InPageNavigation from "../components/InPageNavigation"
import ProfileBlogCard from "../components/ProfileBlogCard"
import ProfileInPageNavigation from "../components/ProfileInPageNavigation"
import MobileFooter from "../components/MobileFooter"
import SavedBlogs from "../components/SavedBlogs"
import AboutProfile from "../components/AboutProfile"

export const profileDataStructure = {
                    "personal_info": {
                      "username": "",
                      "email": "",
                      "password": "",
                      "bio": ""
                    },
                    "social_links": {
                      "youtube": "",
                      "instagram": "",
                      "facebook": "",
                      "twitter": "",
                      "github": "",
                      "website": ""
                    },
                    "account_info": {
                      "total_posts": 0,
                      "total_reads": 0
                    },
                    "_id": "",
                    "blogs": [],
                    "role": "",
                    "isVerified": true,
                    "isSubscribed": false,
                    "joinedAt": "",
                    "__v": 0
}
const Profile = () => {
  const { id: ProfileId } = useParams()
  const [profile, setProfile] = useState(profileDataStructure)
  const [fetchBlogs, setFetchBlogs] = useState([])
  const [activeTab, setActiveTab] = useState("blogPublished");

  // console.log(id)
  let {
    personal_info: { username, email, profile_img, bio, password },
    social_links,
    account_info: { total_posts, total_reads },
    _id,
    blogs,
    role,
    isVerified,
    isSubscribed,
    joinedAt,
  } = profile;


  const {mutate: getProfileDetails} = useMutation({
    mutationFn: profileDetails,
    onSuccess: (response) => {
        if (response.data.response){               
            console.log(response.data.response)
            setProfile(response.data.response)
        }        
    },
    onError: (response) => {
      if (response) {
        console.log(response)
        toast(response.message)

      }
    }
  })

  
  
  
  const { data: userBlogs, isLoading: blogsLoading, isError } = useQuery({
    queryKey: ["fetchUserBlogs"], // Include debounced search term in the query key
    queryFn: () => fetchUserBlogs(ProfileId),
});



  useEffect(() => {
    if (userBlogs?.data.response.blogs) {
        setFetchBlogs(userBlogs?.data.response.blogs)
        const blogs = userBlogs?.data.response.blogs
        total_posts = blogs.length
    }
}, [userBlogs]);
  console.log(fetchBlogs)

  useEffect(() => {
   
     getProfileDetails(ProfileId)
  }, [])
  return (
    <>
      <Navbar />
      <Toaster />
      <section className="min-h-[calc(100vh-80px)] mb-24 m-5 md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12">
        <div className="flex flex-col max-md:items-center gap-5 min-w-[250px] ">
          <img src={profile_img} alt="profile_img" className="w-48 h-48 bg-gray-50 rounded-full md:h-32 md:w-32"/>
          <h1 className="text-2xl font-medium"> @{username}</h1>
          <p>{total_posts.toLocaleString()} Blogs - {total_reads.toLocaleString()} Reads</p>
          <div className="flex gap-4 mt-2">
            <Link to='/settings/edit-profile' className="btn-dark bg-gray-50 text-black px-5 py-3 rounded-md">Edit Profile </Link>
          </div>
          <div className="hidden md:block">

          <About  bio={bio} social_links={social_links} joinedAt={joinedAt}/>
          </div>
        </div>
        <div>

        <div className=" mt-5 md:ml-10 ">
          <ProfileInPageNavigation setActiveTab={setActiveTab} />
        </div>
        <AnimatePresence>
          <div className="mt-10 md:px-10 w-full">
              <div className="grid grid-cols-1 gap-6">
              {blogsLoading ? (
    Array.from({ length: 5 }, (_, i) => (
      <BlogPostCardSkeleton key={`skeleton-${i}`} />
    ))
  ) : activeTab === "blogPublished" ? (
    fetchBlogs.map((blog, i) => (
      
      <ProfileBlogCard key={blog.id} blog={blog} index={i} username={profile.personal_info.username} />
    ))
  ) : activeTab === "savedBlogs" ? (
    <div key="savedBlogs">
      <SavedBlogs /> 
    </div>
  ) : activeTab === "about" ? (
    <div key="about" className="md:hidden">
      <About  bio={bio} social_links={social_links} joinedAt={joinedAt}/>
      {/* <AboutProfile /> */}
    </div>
  ) : null}
              </div>
            </div>
      </AnimatePresence>
                  </div>
      </section>
      
      <MobileFooter icon='account' />
    </>
  )
}

export default Profile


