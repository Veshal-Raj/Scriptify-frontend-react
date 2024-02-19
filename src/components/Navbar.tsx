import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        backgroundImage: "-webkit-linear-gradient(85deg, #FDFDFE, #D6E4FB)",
        backgroundSize: "100% 100%",
        // backgroundColor: '#E0D6E9',
        borderBottom: "0.1px  #000",
      }}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: "black" }}

          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h4" component="h5" color="black" sx={{ flexGrow: 1, paddingLeft: 5, margin: 2  }}>
            Scriptify
          </Typography>

          <Button variant="outlined" sx={{
            paddingX: '20px',
            paddingY: '10px',
            borderRadius: '45px',
            // backgroundColor: 'black',
            color: 'black',
            // transition: 'background-color 0.3s, color 0.3s', 
            '&:hover': {
              background: "-webkit-linear-gradient(45deg, #C99DE9, #a06bd1)",
              color: 'black', 
            }
          }}>Sign Up</Button>
          <Button variant="outlined" sx={{
            paddingX: '20px',
            paddingY: '10px',
            borderRadius: '45px',
            marginX: '5px',
            color: 'black',
            // backgroundColor: '#EAEAEA',
            background: "-webkit-linear-gradient(45deg, #C99DE9, #a06bd1)",
            transition: 'background-color 0.3s, color 0.3s', 
            
          }}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
