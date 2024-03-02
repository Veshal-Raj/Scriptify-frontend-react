import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const EditorNavBar = () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar style={{ backgroundColor: 'white', color: 'black', justifyContent: 'space-between' }}>
      <Typography variant="h4" component="h5" color="black" sx={{ flexGrow: 1, paddingLeft: 5, margin: 2 }}>
              Scriptify
            </Typography>
            <div>
            <Link to="/user/publish" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" sx={{
                paddingX: '20px',
                paddingY: '10px',
                borderRadius: '45px',
                marginX: '5px',
                color: 'white', // White text color
                backgroundColor: '#007bff', // Black background color
                '&:hover': {
                  backgroundColor: 'white', // White background color on hover
                  color: '#007bff', // Black text color on hover
                },
                transition: 'background-color 0.3s, color 0.3s',
              }}>Publish</Button>
          </Link>
          <Link to="/user/save-draft" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" sx={{
                paddingX: '20px',
                paddingY: '10px',
                borderRadius: '45px',
                '&:hover': {
                    color: 'white', // White background color on hover
                    backgroundColor: '#007bff', // Black text color on hover
                  },
              }}>Save Draft</Button>
          </Link>
          
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default EditorNavBar;
