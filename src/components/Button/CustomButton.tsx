// CustomButton.js
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import GroupsIcon from '@mui/icons-material/Groups';

const CustomButton = ({ to, children }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none', display: 'inline-block', width: 'fit-content' }}>
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
        {children}
      </Button>
    </Link>
  );
};

export default CustomButton;
