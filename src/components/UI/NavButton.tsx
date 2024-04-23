import { Button } from '@mui/material';

// Define an interface for the props
interface NavButtonProps {
  text: string;
  variant?: 'text' | 'outlined' | 'contained';
  backgroundColor?: string;
  color?: string;
  hoverBackgroundColor?: string;
  hoverColor?: string;
  onClick?: () => void; // Adjust the type as needed
 }

const NavButton: React.FC<NavButtonProps> = ({  text, variant = 'outlined', backgroundColor = '#007bff', color = 'white', hoverBackgroundColor = 'white', hoverColor = '#007bff' , onClick}) => {
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
    );
  };

export default NavButton;
