import { Box, Button, Typography } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
          clearInterval(interval); // Stop the interval after one iteration
          setAnimationShown(true); // Set animationShown to true
        }
      }, 300); // Adjust the interval as needed

      return () => clearInterval(interval);
    }
  }, [animationShown]);

  return (
    <>
      <Box
        sx={{
          height: "auto",
          padding: "100px 100px",
          color: "#000",
          "@media (max-width: 600px)": {
            padding: "40px", 
          },

        }}
      >
        <AnimatePresence>
          <Typography variant="h2" component="h2">
            {text}
          </Typography>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Typography variant="h4" component="h2" sx={{ padding: '10px' }}>
              Bringing Together Developers and Community: Where Ideas Flourish and Innovation Thrives!
            </Typography>
          </motion.div>
        </AnimatePresence>
        <motion.div
          whileHover={{ scale: 1, rotate: [0, -3, 3, -3, 0], transition: { duration: 1.9 } }}

          drag
          dragConstraints={{
            top: -50,
            left: -50,
            right: 50,
            bottom: 50,
          }}
        >
          <Link to="/sign-in" style={{textDecoration: 'none'}}>
          <Button
            variant="outlined"
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingX: '20px',
              paddingY: '15px',
              marginTop: '50px',
              marginLeft: '10px',
              borderRadius: '45px',
              background: "-webkit-linear-gradient(45deg, #FFFFF0, #a06bd1)",
              color: 'black',
              transition: 'background-color 0.3s, color 0.3s',
              '&:hover': {
                background: "-webkit-linear-gradient(45deg, #FFFFF0, #8540c7)",
                color: 'black',
              }
            }}
          >
            <GroupsIcon sx={{ margin: '6px' }} /> {/* Icon */}
            Join the Community
          </Button>
          </Link>
        </motion.div>
      </Box>
      <div className="flex relative overflow-hidden  bg-gradient-to-t from-white py-10 bg-opacity-5">
        <motion.div className="absolute top-24 -left-20 right-0 bottom-0 w-1/2 z-10  overflow-hidden "
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
          className="abosulte z-1 left-10 right-0 top-0 bottom-0 mx-auto"
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
        <motion.div className="absolute top-24 -right-10 z-10 " variants={imageVariants} initial="initial" animate="animate"
          //  whileTap={{ scale: 0.9 }}
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
      <div className=" bg-white bg-gradient-to-t from-white py-10">
      </div>
    </>
  );
};

export default LandingHero;
