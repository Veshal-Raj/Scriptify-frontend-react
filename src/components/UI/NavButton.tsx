import { Button } from '@mui/material';

const NavButton = ({  text, variant = 'outlined', backgroundColor = '#007bff', color = 'white', hoverBackgroundColor = 'white', hoverColor = '#007bff' , onClick}) => {
    return (
      <Button
          variant={variant}
          sx={{
            paddingX: '20px',
            paddingY: '10px',
            borderRadius: '45px',
            marginX: '5px',
            color: color,
            backgroundColor: backgroundColor,
            borderColor: '#007bff',
            '&:hover': {
              backgroundColor: hoverBackgroundColor,
              color: hoverColor,
            },
            transition: 'background-color 0.3s, color 0.3s',
          }}
          onClick={onClick}
        >
          {text}
        </Button>
      //     <Link to={to} style={{ textDecoration: 'none' }}>
      // </Link>
    );
  };

export default NavButton;
