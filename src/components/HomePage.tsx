import { useEffect, useState } from "react";
import axios from "axios";
import InPageNavigation from "./InPageNavigation";
import { motion, AnimatePresence } from "framer-motion";
import BlogPostCard from "./BlogPostCard";
import { CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";

const HomePage = () => {
    const [blogs, setBlogs] = useState(null);

    useEffect(() => {
        fetchLatestBlogs();
    }, []);

    const fetchLatestBlogs = () => {
        axios
            .get(import.meta.env.VITE_BASE_URL + "user/latest-blog")
            .then(({ data }) => {
                console.log("blogs -->> ", data.response);
                setBlogs(data.response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <section className="h-cover flex justify-center gap-10">
                <motion.div className="w-full">
                    <InPageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>
                        <>
                            {blogs === null ? (
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
                                            <BlogPostCard content={blog} author={blog.author.personal_info} />
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
