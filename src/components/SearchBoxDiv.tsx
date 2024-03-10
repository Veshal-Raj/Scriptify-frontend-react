import { motion } from "framer-motion";
import { Backdrop, TextField } from "@mui/material";
import { useState } from "react";

const SearchBoxDiv = ({setSearchDiv}) => {
    const [isOpen, setIsOpen ] = useState(true)
    const handleClick = () => {
        setIsOpen(false)
        setSearchDiv(false)
    }
  return (
    <>
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.8 }} 
      transition={{ duration: 0.3 }} 
      style={{
          position: 'absolute',
          top: '10%', 
          left: '20%', 
          transform: 'translate(-50%, -50%)', 
          backgroundColor: 'white',
          padding: '20px', 
          width: '50%',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px', 
          zIndex: 999
        }}
        >
      <TextField id="outlined-basic" label="Search" variant="outlined" fullWidth />
    </motion.div>
    <Backdrop open={isOpen}  onClick={handleClick}/>
        </>
  );
}

export default SearchBoxDiv;
