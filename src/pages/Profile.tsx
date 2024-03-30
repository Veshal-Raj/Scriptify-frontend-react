import { Link, useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchUserBlogs, profileDetails } from "../api/user"
import { Toaster, toast } from 'sonner'
import About from "../components/About"
import { AnimatePresence } from "framer-motion"
import BlogPostCardSkeleton from "../components/Skeleton/BlogSkeleton"
import ProfileInPageNavigation from "../components/ProfileInPageNavigation"
import MobileFooter from "../components/MobileFooter"
import SavedBlogs from "../components/SavedBlogs"
import ForumIcon from '@mui/icons-material/Forum';
import ProfileBlogCard from "../components/ProfileBlogCard"
import { IconButton, Tooltip } from "@mui/material"
import { useSelector } from "react-redux"
import NoBlogPublished from "../components/NoBlogPublished"
import ProfileFollowersDrawer from "../components/ProfileFollowersDrawer"

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
  const [followers, setFollowers] = useState(0)
  const [followings, setFollowings] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const userParams = useParams()
  const { userData } = useSelector(state => state.user)

  const userId = userData._id
  console.log('idddd', userId)
  console.log('profileIddddd', ProfileId)
  const isSameUser = userId === ProfileId;

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


  const { mutate: getProfileDetails } = useMutation({
    mutationFn: profileDetails,
    onSuccess: (response) => {
      if (response.data.response) {
        console.log('user details >>>> ', response.data.response)
        console.log('user followers >>>> ', response.data.response.followers)
        console.log('user following >>>> ', response.data.response.following)
        setProfile(response.data.response)
        setFollowers(response.data.response.followers.length)
        setFollowings(response.data.response.following.length)
      }
    },
    onError: (response) => {
      if (response) {
        console.log(response)
        toast(response.message)

      }
    }
  })

  const { data: userBlogs, isLoading: blogsLoading, isError, refetch } = useQuery({
    queryKey: ["fetchUserBlogs"], // Include debounced search term in the query key
    queryFn: () => fetchUserBlogs(ProfileId),
  });

  useEffect(() => {
    if (userBlogs?.data.response.blogs) {
      setFetchBlogs(userBlogs?.data.response.blogs)
      const blogs = userBlogs?.data.response.blogs
      total_posts = blogs.length
    }
  }, [userBlogs, userParams, ProfileId]);

  console.log(fetchBlogs)

  useEffect(() => {
    getProfileDetails(ProfileId)
    refetch()
  }, [userParams, ProfileId])



  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };


  return (
    <>
      <Navbar />
      <Toaster richColors position="top-right" expand={false} />
      <section className="min-h-[calc(100vh-80px)] mb-24 m-5 md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12">
        <div className="flex flex-col max-md:items-center gap-5 min-w-[250px] ">
          <img src={profile_img} alt="profile_img" className="w-48 h-48 bg-gray-50 rounded-full md:h-32 md:w-32" />
          <h1 className="text-2xl font-medium"> @{username}</h1>
          <p>{total_posts.toLocaleString()} Blogs - {total_reads.toLocaleString()} Reads</p>
          <p className="cursor-pointer" onClick={handleDrawerOpen}>{followers} Followers - {followings} Following</p>
          <ProfileFollowersDrawer
            open={drawerOpen}
            onClose={handleDrawerClose}
          />
          <div className="flex gap-4 mt-2">
            {isSameUser && (<Link to='/settings/edit-profile' className="btn-dark bg-gray-50 text-black px-5 py-3 rounded-md">Edit Profile </Link>)}
            {!isSameUser && <Tooltip title="Chat" placement="right">
              <IconButton className="p-5">
                <ForumIcon />
              </IconButton>
            </Tooltip>}
          </div>
          <div className="hidden md:block">
            <About bio={bio} social_links={social_links} joinedAt={joinedAt} />
          </div>
        </div>
        <div>
          <div className=" mt-5 md:ml-10 ">
            <ProfileInPageNavigation setActiveTab={setActiveTab} isSameUser={isSameUser} />
          </div>
          <AnimatePresence>
            <div className="mt-10 md:px-10 w-full">
              <div className="grid grid-cols-1 gap-6">
                {blogsLoading ? (
                  Array.from({ length: 5 }, (_, i) => (
                    <BlogPostCardSkeleton key={`skeleton-${i}`} />
                  ))
                ) : activeTab === "blogPublished" ? (
                  fetchBlogs.length === 0 ? (
                    <NoBlogPublished />
                  ) : (
                    fetchBlogs.map((blog, i) => (
                      <ProfileBlogCard key={blog.id} blog={blog} index={i} username={profile.personal_info.username} ProfileId={ProfileId} />
                    ))
                  )
                ) : activeTab === "savedBlogs" ? (
                  <div key="savedBlogs">
                    <SavedBlogs />
                  </div>
                ) : activeTab === "about" ? (
                  <div key="about" className="md:hidden">
                    <About bio={bio} social_links={social_links} joinedAt={joinedAt} />
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