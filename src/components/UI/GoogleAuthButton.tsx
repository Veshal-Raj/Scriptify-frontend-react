import { Button } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';

const GoogleAuthButton = () => {
  return (
    <div>
      <Button 
        variant="outlined" 
        sx={{ 
          display: 'flex', 
          gap: '8px', 
          alignItems: 'center',
          mb: 3, 
          width: '100%',
          color: 'black', // Set text color to black
          borderColor: 'black', // Set border color to black
          '&:hover': { // Change color on hover
            borderColor: 'black',
            color: 'black',
          },
        }}
      >
        <GoogleIcon /> 
        Sign in with Google
      </Button>    
    </div>
  )
}

export default GoogleAuthButton
