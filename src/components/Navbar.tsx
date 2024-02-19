import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        backgroundImage: "-webkit-linear-gradient(85deg, #FDFDFE, #D6E4FB)",
        backgroundSize: "100% 100%",
        borderBottom: "0.1px  #000",
      }}>
        <Toolbar>
          <Typography variant="h4" component="h5" color="black" sx={{ flexGrow: 1, paddingLeft: 5, margin: 2 }}>
            Scriptify
          </Typography>
          <Link to="/sign-up" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" sx={{
              paddingX: '20px',
              paddingY: '10px',
              borderRadius: '45px',
              color: 'black',
              '&:hover': {
                background: "-webkit-linear-gradient(45deg, #C99DE9, #a06bd1)",
                color: 'black',
              }
            }}>Sign Up</Button>
          </Link>
          <Link to='/sign-in' style={{ textDecoration: 'none' }}>
            <Button variant="outlined" sx={{
              paddingX: '20px',
              paddingY: '10px',
              borderRadius: '45px',
              marginX: '5px',
              color: 'black',
              background: "-webkit-linear-gradient(45deg, #C99DE9, #a06bd1)",
              transition: 'background-color 0.3s, color 0.3s',
            }}>Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
