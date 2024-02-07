import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

import LoadingButton from "../components/UI/LoadingButton";

const Login = () => {
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevents default form submission behavior
    // Your form submission logic can go here
    
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" component="h3" sx={{ display: "flex", justifyContent: 'center', marginBottom: '30px'}}>
          Join Scriptify
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <TextField id="standard-basic" label="First name" variant="standard" />
          <TextField id="standard-basic" label="Last name" variant="standard" />
        </Box>
        <TextField id="standard-basic" label="Email id" variant="standard" />
        <TextField id="standard-basic" label="Password" variant="standard" />
        <TextField id="standard-basic" label="Confirm Password" variant="standard" />
        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
          <LoadingButton title="Sign in" />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
