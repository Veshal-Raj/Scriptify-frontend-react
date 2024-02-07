import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form"

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true); // Set loading state to true when form is submitted
      console.log(data);
      // Simulate asynchronous operation, like API call
      setTimeout(() => {
        setLoading(false); // Reset loading state after operation is done
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", paddingTop: "50px" }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4" sx={{mb: '20px'}}>
          Welcome back.
        </Typography>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            // {...register("email", { required: true })}
            {...register("email", {
              required: "Email is a required field",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid email format",
              },
            })}
          />
          <span className="text-xs text-red-700">
            {errors?.email && errors?.email?.message}
          </span>


          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
              validate: {
                requireSixCharacters: (val) =>
                  (typeof val === "string" && val.length >= 6) ||
                  "Password should be at least 6 characters long.",
                containAtleastOneDigit: (val) =>
                  (typeof val === "string" && /\d/.test(val)) ||
                  "Password should contain at least one digit.",
                containAtleastOneAlphabet: (val) =>
                  (typeof val === "string" && /[a-z]/.test(val)) ||
                  "Password should contain at least one alphabet.",
                containAtleastOneSpecialCharacter: (val) =>
                  (typeof val === "string" &&
                    /[!@#$%^&*(),.?":{}|<>]/.test(val)) ||
                  "Password should contain at least one special character.",
                noSpace: (val) =>
                  !/\s/.test(val) || "Password should not contain spaces.",
              },
            })}
          />
          <span className="text-xs text-red-700">
            {errors?.password && errors?.password?.message}
          </span>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              color: "white",
              bgcolor: "black",
              mt: 3,
              mb: 3,
              "&:hover": {
                bgcolor: "black",
              },
            }}
            disabled={loading} // Disable button when loading
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" sx={{ color: 'text.primary', textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" sx={{ color: 'text.primary', textDecoration: 'none' }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
