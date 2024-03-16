import { Box,  Typography } from "@mui/material";
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from "react";
import CustomButton from "./Button/CustomButton";

const imageVariants = {
  initial: { opacity: 0, scale: 0, x: "0%", y: "0%" },
  animate: { opacity: 1, scale: 1, x: ["0%", "0%", "0%"], y: ["0%", "0%", "-0%"], transition: { duration: 1.9 } },
};

const LandingHero = () => {

  const [text, setText] = useState('');
  const [animationShown, setAnimationShown] = useState(false);

  useEffect(() => {
    if (!animationShown) {
      const words = ['Code Connect Create.'];
      let currentWordIndex = 0;
      let currentCharacterIndex = 0;

      const interval = setInterval(() => {
        if (currentCharacterIndex <= words[currentWordIndex].length) {
          setText(words[currentWordIndex].slice(0, currentCharacterIndex));
          currentCharacterIndex++;
        } else {
          currentWordIndex = (currentWordIndex + 1) % words.length;
          currentCharacterIndex = 0;
          clearInterval(interval); 
          setAnimationShown(true);
        }
      }, 300); 

      return () => clearInterval(interval);
    }
  }, [animationShown]);

  return (
    <>
      <Box sx={{ height: "auto", padding: "100px 100px", color: "#000",
          "@media (max-width: 600px)": { padding: "40px"},         
        }}
      > 
        <AnimatePresence>
          <Typography variant="h2" component="h2"
            sx={{
              padding: '10px',
              '@media (max-width: 600px)': {
                fontSize: '2.5rem', // Adjust the font size for small screens
              },
            }}
          >
            {text}
          </Typography>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            
          >
            <Typography
  variant="h4"
  component="h2"
  sx={{
    padding: '10px',
    '@media (max-width: 600px)': {
      fontSize: '1.5rem', // Adjust the font size for small screens
    },
  }}
>
  Bringing Together Developers and Community: Where Ideas Flourish and Innovation Thrives!
</Typography>
          </motion.div>
        </AnimatePresence>
          <CustomButton to="/sign-in">Join the Community</CustomButton>
      </Box>
      <div className="flex relative  overflow-hidden  bg-gradient-to-t from-white bg-opacity-5 ">
        <motion.div className="absolute top-24 -left-20 right-0 bottom-0 w-1/2 z-10  overflow-hidden hidden md:block lg:block "
          variants={imageVariants} initial="initial" animate="animate"
          whileHover={{ scale: 0.9 }}
          onHoverStart={() => { }}
          onHoverEnd={() => { }}
        >
          <img
            src={'https://cdn.hashnode.com/res/hashnode/image/upload/v1702020251641/6a7b21f7-ab01-4f24-9633-31b350fe702c.png?auto=format,compress'}
            alt={`Image 1`}
            className='h-[700px] w-auto object-cover'
          />
        </motion.div>
        <motion.div
          className="abosulte z-1 left-10 right-0 top-0 bottom-0 mx-auto hidden md:block lg:block"
          variants={imageVariants}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1, rotate: [0, -5, 5, -5, 0], transition: { duration: 0.6 } }}
        >
          <img
            src={'https://cdn.hashnode.com/res/hashnode/image/upload/v1702020251641/6a7b21f7-ab01-4f24-9633-31b350fe702c.png?auto=format,compress'}
            alt={`Image 2`}
            className='h-[700px] w-full object-cover '
          />
        </motion.div>
        <motion.div className="absolute top-24 -right-10 z-10 hidden md:block lg:block" variants={imageVariants} initial="initial" animate="animate"
          whileHover={{ scale: 0.9 }}
          onHoverStart={() => { }}
          onHoverEnd={() => { }}
        >
          <img
            src={'https://cdn.hashnode.com/res/hashnode/image/upload/v1702020083770/e37d830e-e204-41a5-b869-844e8d6f92cf.png?auto=format,compress'}
            alt={`Image 3`}
            className='h-[700px] w-auto object-cover '
          />
        </motion.div>
      </div>
      <div className=" bg-white bg-gradient-to-t from-white py-10"></div>
    </>
  );
};

export default LandingHero;