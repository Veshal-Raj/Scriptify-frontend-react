import { Box, Button, Typography } from "@mui/material";

const LandingHero = () => {
  return (
    <Box
      sx={{
        height: "auto",
       
        padding: "100px 100px",
        background: "-webkit-linear-gradient(45deg, #FFFFF0, #8A2BE2)",
        color: "#000",
        "@media (max-width: 600px)": {
          padding: "40px", // Padding for mobile view
        },

      }}
    >
      <div>
        <Typography
          variant="h2"
          component="h2"
        >
          Code, Connect, Create.
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          sx={{ padding: '10px'}}
        >
          Bringing Together Developers and Community: Where Ideas Flourish and Innovation Thrives!
        </Typography>
      </div>

      <Button 
  variant="outlined" 
  sx={{ 
    paddingX: '20px', 
    paddingY: '15px', 
    marginTop: '50px', 
    marginLeft: '10px',
    borderRadius: '45px', 
    transition: 'background-color 0.3s, color 0.3s', 
    '&:hover': {
      backgroundColor: 'black', 
      color: 'white', 
    }
  }}
>
  Join the Community
</Button>
    </Box>
  );
};

export default LandingHero;
