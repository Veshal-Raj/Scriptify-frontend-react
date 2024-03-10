import { useEffect, useState } from "react";
import InPageNavigation from "./InPageNavigation";
import { motion, AnimatePresence } from "framer-motion";
import BlogPostCard from "./BlogPostCard";
import { CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { getLatestBlog, getTrendingBlogs } from "../api/user";
import MinimalBlogPost from "./MinimalBlogPost";
import SkeletonTypography from "./Skeleton/BlogSkeleton";
import BlogPostCardSkeleton from "./Skeleton/BlogSkeleton";

const HomePage = () => {
    const { data: latestBlog, isLoading } = useQuery({
        queryKey: ["latestBlogs"],
        queryFn: getLatestBlog
    });

    const { data: trendingBlogData, isLoading: trendingBlogDataLoading } = useQuery({
        queryKey: ["trendingBlogsData"],
        queryFn: getTrendingBlogs
    });

    const [blogs, setBlogs] = useState([]);
    const [trendingBlogs, setTrendingBlogs] = useState([]);

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

    return (
        <>
            <section className="h-cover flex justify-center gap-10">
                <motion.div className="w-full">
                    <InPageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>
                        <>
                            {isLoading ? (
                                <>
                                {[...Array(4)].map((_, index) => (
                                    <BlogPostCardSkeleton key={index} />
                                ))}
                            </>
                            ) : (
                                <AnimatePresence>
                                    {blogs.map((blog, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.5, delay: i * 0.3 }}
                                        >
                                            <BlogPostCard content={blog} author={blog?.author?.personal_info} index = {i} />
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
                
            </section>
        </>
    );
};

export default HomePage;
