import { MouseEvent,  useEffect, useState } from "react";
import InPageNavigation from "./InPageNavigation";
import { motion, AnimatePresence } from "framer-motion";
import BlogPostCard from "./BlogPostCard";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchTags, filterbyTags, getLatestBlog, getTrendingBlogs } from "../api/user";
import MinimalBlogPost from "./MinimalBlogPost";
import BlogPostCardSkeleton from "./Skeleton/BlogSkeleton";
import { Chip } from "@mui/material";
import TagSkeleton from "./Skeleton/ChipSkeleton";

const HomePage = () => {
    const { data: latestBlog, isLoading: latestBlogDataLoading } = useQuery({
        queryKey: ["latestBlogs"],
        queryFn: getLatestBlog
    });

    const { data: trendingBlogData, isLoading: trendingBlogDataLoading } = useQuery({
        queryKey: ["trendingBlogsData"],
        queryFn: getTrendingBlogs
    });

    const { data: tags, isLoading: tagsLoading } = useQuery({
        queryKey: ['AllTags'],
        queryFn: fetchTags
    })
    const [blogs, setBlogs] = useState([]);
    const [trendingBlogs, setTrendingBlogs] = useState([]);
    const [selectedChip, setSelectedChip] = useState<number | null>(null);
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [pageState, setPageState] = useState('home')
    const [tagsFetched, setTagsFetched] = useState<string[]>([])

    const {mutate: filteringByTag} = useMutation({
        mutationFn: filterbyTags,
        onSuccess: (response) => {
            if (response.data.response){               
                setBlogs(response?.data.response)
                setShowSkeleton(false)
            }
        }
      })
    
      const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        const chipIndex = index ;
        if (selectedChip === chipIndex) {
            setSelectedChip(null);
            setShowSkeleton(true);
            setPageState('home'); 
            setShowSkeleton(false);
            setBlogs(latestBlog.response);
        } else {
            setSelectedChip(chipIndex);
            setShowSkeleton(true);
            const text = (e.target as HTMLElement).innerText.toLowerCase();
            const page = pageState.toLowerCase(); 
            setPageState(text);
            const tag = {tag: text}
            filteringByTag(tag);
            if (page === text) {
                setPageState('home');
                setShowSkeleton(false);
                setBlogs(latestBlog.response);
            }
        }
    };

    useEffect(() => {
        setShowSkeleton(false); 
    }, [latestBlog]);
    
    useEffect(() => {
        if (latestBlog) {
            setBlogs(latestBlog.response || []);
        }
    }, [latestBlog]);

    useEffect(() => {
        if (trendingBlogData) {
            setTrendingBlogs(trendingBlogData.response || []);
        }
    }, [trendingBlogData]);

    useEffect(() => {
        if (!tagsLoading && tags) {
            setTagsFetched(tags?.data.response); 
        }
    }, [tagsLoading, tags]);

     const handleTagFilter = async (tag: string) => {
        setShowSkeleton(true);
        const response = await filterbyTags(tag );
        if (response.data.response) {
            setBlogs(response.data.response);
            setShowSkeleton(false);
            setPageState(tag)
        }
    };

    const resetBlogs = () => {        
        setBlogs(latestBlog.response);
        setPageState('home')
    }

    return (
        <>
            <section className="h-cover flex justify-center gap-10 ">
                <motion.div className="">
                    <InPageNavigation routes={[pageState, "trending blogs"]} defaultHidden={["trending blogs"]} tags={tagsFetched} onTagFilter={handleTagFilter} onResetBlogs={resetBlogs}>
                        <>
                            {showSkeleton || latestBlogDataLoading ? (
                                <>
                                    {[...Array(4)].map((_, index) => (
                                        <BlogPostCardSkeleton key={index} />
                                    ))}
                                </>
                            ) : (
                                <AnimatePresence>
                                {blogs.map((blog: any, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5, delay: i * 0.3 }}
                                    >
                                        <BlogPostCard
                                            content={blog}
                                            author={blog?.author?.personal_info}
                                            index={i}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            )}
                               
                        </>
                        {trendingBlogDataLoading ? (
                            <>
                                {[...Array(4)].map((_, index) => (
                                    <BlogPostCardSkeleton key={index} />
                                ))}
                            </>
                        ) : (
                            <AnimatePresence>
                                {trendingBlogs.map((blog, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5, delay: i * 0.3 }}
                                    >
                                        <MinimalBlogPost blog={blog} index={i} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                        <Typography variant="h4" component="h1" gutterBottom>
                            Trending Blog
                        </Typography>
                    </InPageNavigation>
                </motion.div>
                <div className=" text-black max-w-[20%] border-l pl-8 pt-3 my-2  hidden lg:block">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Typography variant="h5" sx={{ marginTop: '2rem' }}>Explore Your Interests</Typography>
                    </motion.div>
                    {tagsLoading ? (
                            <TagSkeleton count={tagsFetched.length > 0 ? tagsFetched.length : 15} />
                        ) : (
                            <div className="flex flex-wrap gap-3 my-5" style={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                {tagsFetched.map((data, i) => (
                                    <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 * i }}>
                                        <Chip label={data} variant="outlined" color={selectedChip === i ? "default" : "primary"}
                                            onClick={(e) => handleClick(e,i)} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                        <Typography variant="h5" sx={{ marginY: '2rem' }}> Upgrade to Scriptify Plus </Typography>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default HomePage;