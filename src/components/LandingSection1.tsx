import { Typography } from "@mui/material";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { LandingPageBlogs } from "../utils/constants/constants";

const imageVariants = {
    initial: { opacity: 0, scale: 0, x: "0%", y: "0%" },
    animate: { opacity: 1, scale: 1, x: ["0%", "0%", "0%"], y: ["0%", "0%", "-0%"], transition: { duration: 1 } },
};

interface DraggableBlogProps {
    imageUrl: string;
    title: string;
    description: string;
   }

   const DraggableBlog: React.FC<DraggableBlogProps> = ({ imageUrl, title, description }) => (

    <Link to='/sign-in'>
        <motion.div
            drag
            dragConstraints={{
                top: -50,
                left: -50,
                right: 50,
                bottom: 50,
            }}
            className="border rounded-lg my-10 sm:mx-10 flex flex-col-reverse sm:flex-row items-center justify-center"
            variants={imageVariants}
            initial="initial"
            animate="animate"
            whileTap={{ scale: 0.9 }}
            style={{ backgroundColor: '', maxWidth: '900px', minWidth: '200px' }}
        >
            <div className="w-full sm:w-1/2 p-4">
                <Typography variant="h5" gutterBottom>{title}</Typography>
                <Typography variant="body1" className="max-h-20 overflow-hidden" gutterBottom>{description}</Typography>
            </div>
            <img src={imageUrl} alt={title} className="w-auto h-[200px] m-5 max-h-[200px] sm:w-1/2 lg:w-[400px] rounded-lg" style={{ objectFit: 'cover' }} />
        </motion.div>
    </Link>
);

const LandingSection1 = () => {
    return (
        <div className="bg-white ">
            <div className="pt-10 mx-10">
                <Typography variant="h2" component="h3" className="text-center"
                    sx={{
                        padding: '0px',
                        '@media (max-width: 600px)': {
                            fontSize: '1.5rem',
                            textAlign: 'initial',
                            mx: '5px',
                            py: '10px',
                        },
                    }}
                >
                    Crafted for<span className="text-blue-700"> developers and technical </span>minds to shine through their writing.
                </Typography>
            </div>
            <div className="flex justify-center m-5">
                <div className="mx-auto">
                    {LandingPageBlogs.map((blog, index) => (
                        <DraggableBlog key={index} title={blog.title} description={blog.description} imageUrl={blog.imageUrl} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LandingSection1;