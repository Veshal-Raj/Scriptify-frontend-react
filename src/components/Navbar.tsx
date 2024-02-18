import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        backgroundImage: "-webkit-linear-gradient(85deg, #EAEAEA, #8A2BE2)",
        backgroundSize: "100% 100%",
        borderBottom: "0.1px  #000",
      }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: "black" }}

          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" color="black" sx={{ flexGrow: 1 }}>
            Scriptify
          </Typography>
          <Button sx={{ color: 'black' }}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
