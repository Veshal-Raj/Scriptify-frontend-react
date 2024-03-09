import { useEffect, useState } from "react";
import InPageNavigation from "./InPageNavigation";
import { motion, AnimatePresence } from "framer-motion";
import BlogPostCard from "./BlogPostCard";
import { CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { getLatestBlog } from "../api/user";

const HomePage = () => {
    const { data: latestBlog, isLoading } = useQuery({
        queryKey: ["latestBlogs"],
        queryFn: getLatestBlog
    });

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        if (latestBlog) {
            setBlogs(latestBlog.response || []); 
        }
    }, [latestBlog]);

    return (
        <>
            <section className="h-cover flex justify-center gap-10">
                <motion.div className="w-full">
                    <InPageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>
                        <>
                            {isLoading ? (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
                                    <CircularProgress />
                                </div>
                            ) : (
                                <AnimatePresence>
                                    {blogs.map((blog, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.5, delay: i * 0.2 }}
                                        >
                                            <BlogPostCard content={blog} author={blog?.author?.personal_info} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </>
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
