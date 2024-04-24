import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchSimilarBlogs, fetchSingleBlog, followUserApi, increaseReadCount, unfollowUserApi } from "../api/user"
import { createContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getDay } from "../hooks/useDate"
import { Typography, Avatar, useMediaQuery, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import BlogInteraction from "./BlogInteraction";
import NoSimilarBlogMessage from "./NoSimilarBlogMessage"
import BlogContent from "./BlogContent"
import SingleBlogSkeleton from "./Skeleton/SingleBlogSkeleton"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'sonner'
import { addFollowing, removeFollowing } from "../redux/slice/userSlice"
import { RootState } from "../redux/appStore"
import { Blog, BlogData } from "../@types/TshowBlogContent"

export const BlogContext = createContext({})

const ShowBlogContent = ({ blogId }: { blogId: string | undefined }) => {
    const [singleBlogData, setSingleBlogData] = useState<BlogData | null>(null)
    const [tags, setTags] = useState([])
    const [similarBlogs, setSimilarBlogs] = useState([]);
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [timerStarted, setTimerStarted] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false)
    const { userData } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const userId = userData?._id
    const authorId = singleBlogData?.author._id
    const followings = userData?.following

    useEffect(() => {
        if (authorId && followings?.includes(authorId)) {
            setIsFollowing(true)
        } else {
            setIsFollowing(false)
        }
    }, [followings, authorId])

    const { data: SingleBlog, isLoading } = useQuery({
        queryKey: ["singleBlog", blogId],
        queryFn: async () => {
            if (blogId) {
               const result = await fetchSingleBlog(blogId)
                return result
            }
        }
    })

    const { mutate: fetchSimilarBlog } = useMutation({
        mutationFn: fetchSimilarBlogs,
        onSuccess: (response) => {
            if (response.data.response) {
                const filteredSimilarBlogs = response.data.response.filter((blog: Blog) => blog.title !== singleBlogData?.title);
                setSimilarBlogs(filteredSimilarBlogs);
            }
        }
    })

    const { mutate: addReadCount } = useMutation({
        mutationFn: increaseReadCount
    })

    const { mutate: followUser } = useMutation({
        mutationFn: followUserApi,
        onSuccess: () => {
            toast.success('Following Author Successfully')
            setIsFollowing(true)
            dispatch(addFollowing(singleBlogData?.author._id))
        },
        onError: () => toast.error('Something went wrong, Please try again later.')
    })

    const { mutate: unfollowUser } = useMutation({
        mutationFn: unfollowUserApi,
        onSuccess: () => {
            toast.success('Unfollowed Author Successfully')
            setIsFollowing(false)
            dispatch(removeFollowing(singleBlogData?.author._id))
        },
        onError: () => toast.error('Something went wrong, Please try again later.')
    })

    useEffect(() => {
        if (blogId) fetchSingleBlog(blogId)        
    }, [blogId])


    useEffect(() => {
        if (SingleBlog?.data) {
            setSingleBlogData(SingleBlog.data.response)
            setTags(SingleBlog.data.response.tags)
        }
    }, [SingleBlog])

    useEffect(() => {
        if (tags.length > 0) fetchSimilarBlog(tags)
    }, [tags])

    useEffect(() => {
        if (!timerStarted) {
            const timer = setTimeout(() => {
                const data = {
                    userId: userId,
                    blogId: blogId
                }
                addReadCount(data)
                setTimerStarted(true)
            }, 60000)
            return () => clearTimeout(timer)
        }
    }, [timerStarted, userId, blogId])

    useEffect(() => {
        if (authorId && userData?.following?.includes(authorId)) setIsFollowing(true);
        else setIsFollowing(false);
    }, [followings, authorId]);


    const content = singleBlogData?.content[0].blocks

    const handleUnfollow = () => {
        if (singleBlogData !== null && singleBlogData?._id) {
            const authorId = singleBlogData?.author._id
            const data = {
                authorId: authorId,
                userId: userId
            }
            unfollowUser(data)
        }
    }

    const handleFollow = () => {
        if (singleBlogData !== null && singleBlogData?._id) {
            const authorId = singleBlogData?.author._id
            const data = {
                authorId: authorId,
                userId: userId
            }
            followUser(data)
        }
    }

    const status = userId === authorId

    return (
        <div>
            {isLoading ? (
                <SingleBlogSkeleton />
            ) : singleBlogData ? (
                <BlogContext.Provider value={{ singleBlogData, setSingleBlogData }}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }} className="max-w-[900px] block mx-auto py-10 max-lg:px-[5vw]" >
                        <img src={singleBlogData?.banner} alt="Banner" className="aspect-video" />
                        <div className="mt-12 font-inter text-4xl leading-normal font-bold max-md:text-3xl max-md:leading-snug !important">
                            <Typography variant={isSmallScreen ? "h5" : "h4"}>{singleBlogData?.title}</Typography>
                            <div className="flex max-sm:flex-col justify-between my-8">
                                <div className="flex gap-5 items-start">
                                    <Avatar src={singleBlogData?.author.personal_info.profile_img} alt="profile_image" className="w-12 h-12 rounded-full" />
                                    <Typography variant="body1" className="capitalize font-normal text-lg">
                                        {singleBlogData?.author.personal_info.username}
                                        <br />
                                        @ <Link to={`/user/${singleBlogData?.author._id}`} className="underline">{singleBlogData?.author.personal_info.username}</Link>
                                    </Typography>
                                    {!status && (
                                        <div className="py-1">
                                            {isFollowing ? (
                                                <Typography variant="body1" className="capitalize font-normal text-lg text-red-700 cursor-pointer" onClick={handleUnfollow}>
                                                    Unfollow <RemoveIcon />
                                                </Typography>
                                            ) : (
                                                <Typography variant="body1" className="capitalize font-normal text-lg text-blue-700 cursor-pointer" onClick={handleFollow}>
                                                    Follow <AddIcon />
                                                </Typography>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <Typography variant="body1" className="text-lg font-normal text-gray-600 opacity-75 max-sm:mt-6 max-sm:ml-20 max-sm:pl-5">
                                    Published on {getDay(new Date(singleBlogData?.publishedAt))}
                                </Typography>
                            </div>
                        </div>
                        <BlogInteraction />
                        <div className="my-12 font-serif   ">
                            {
                                content?.map((block, i) => {
                                    return <div key={i} className="my-4 md:my-8">
                                        <BlogContent block={block} />
                                    </div>
                                })
                            }
                        </div>
                        <BlogInteraction />
                        <div className="my-16">
                            <Typography variant="h5" sx={{ 'marginBottom': '20px' }}> Similar Blogs</Typography>
                            {similarBlogs.length > 0 ? ( // Conditional rendering based on similarBlogs array length
                                <Grid container spacing={3}>
                                    {similarBlogs.map((blog: Blog) => (
                                        <Grid item xs={12} sm={6} md={4} key={blog._id}>
                                            <motion.div whileHover={{ scale: 1.01, transition: { duration: 0.3 } }} className="blog-card" >
                                                <Card>
                                                    <CardActionArea component={Link} to={`/user/blog/${blog.blog_id}`}>
                                                        <CardMedia component="img" height="140" image={blog.banner} alt="Blog Banner" />
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h6" component="div">
                                                                {blog.title}
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>
                                            </motion.div>
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <NoSimilarBlogMessage />
                            )}
                        </div>
                    </motion.div>
                </BlogContext.Provider>
            ) : (
                <Typography variant="body1" className="text-lg font-normal text-gray-600 opacity-75 max-sm:mt-6 max-sm:ml-20 max-sm:pl-5">
                    Blog not found
                </Typography>
            )}
        </div>
    )
}

export default ShowBlogContent