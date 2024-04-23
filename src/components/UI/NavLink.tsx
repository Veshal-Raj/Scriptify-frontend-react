import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

// Define the type for the props
interface NavLinkProps {
  to: string;
  text: string;
  variant?: 'text' | 'outlined' | 'contained';
  backgroundColor?: string;
  color?: string;
  hoverBackgroundColor?: string;
  hoverColor?: string;
 }

const NavLink: React.FC<NavLinkProps> = ({ to, text, variant = 'outlined', backgroundColor = '#007bff', color = 'white', hoverBackgroundColor = 'white', hoverColor = '#007bff' }) => {
    return (
      <Link to={to} style={{ textDecoration: 'none' }} className={text === 'Sign Up' ? 'block' : 'hidden md:block lg:block'}>
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
        >
          {text}
        </Button>
      </Link>
    );
};

export default NavLink;
