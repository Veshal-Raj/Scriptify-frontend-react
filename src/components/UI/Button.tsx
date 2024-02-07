import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";

const LoadingButton: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    setLoading(true);
    // Simulating an asynchronous operation
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Replace this with your actual asynchronous operation
  };

  return (
    <Button variant="contained" disabled={loading} onClick={handleClick}
    sx={{ color: 'white', bgcolor: 'black',  '&:hover': {
        bgcolor: 'black'
      } }}>
      {loading ? (
        <CircularProgress size={24} color="inherit" /> 
      ) : (
        "Sign up"
      )}
    </Button>
  );
};

export default LoadingButton;
