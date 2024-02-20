import { Typography } from "@mui/material";
import { motion } from 'framer-motion';

const imageVariants = {
    initial: { opacity: 0, scale: 0, x: "0%", y: "0%" },
    animate: { opacity: 1, scale: 1, x: ["0%", "0%", "0%"], y: ["0%", "0%", "-0%"], transition: { duration: 1 } },
};

const DraggableBlog = ({ children }) => (
    <motion.div
        drag
        dragConstraints={{
            top: -50,
            left: -50,
            right: 50,
            bottom: 50,
        }}
        className="border rounded-lg my-10 mx-52 h-80"
        variants={imageVariants}
        initial="initial"
        animate="animate"
        whileTap={{ scale: 0.9 }}
    >
        {children}
    </motion.div>
);

const LandingSection1 = () => {
    const blogs = ["blog 1", "blog 2", "blog 3"];

    return (
        <div className="bg-white py-10">
            <div className="py-20 mx-10 flex">
                <Typography variant="h2" component="h3" className="text-center">
                    Crafted for<span className="text-blue-700"> developers and technical </span>minds to shine through their writing.
                </Typography>
            </div>
            {blogs.map((blog, index) => (
                <DraggableBlog key={index}>
                    {blog}
                </DraggableBlog>
            ))}
        </div>
    );
};

export default LandingSection1;
