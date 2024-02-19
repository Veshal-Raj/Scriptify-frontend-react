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
import { Link as RouterLink } from "react-router-dom";
import GoogleAuthButton from "../../components/UI/googleAuthButton";
import { signup } from "../../api/user";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeat_password: ""
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    // setValue
  } = useForm({
    defaultValues: formData // Set default values for form fields
  });

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleFormSubmit = async (data: any) => {
    try {
      setLoading(true);
      console.log('form data -->>> ',formData);
      await signup(formData)
      // Perform form submission logic here...
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
        <Typography component="h1" variant="h4" sx={{ mb: '20px' }}>
          Join Scriptify.
        </Typography>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            autoComplete="username"
            autoFocus
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
              minLength: {
                value: 3,
                message: "Username should have at least 3 letters",
              },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Username should only contain letters",
              },
              validate: (value) => {
                return (
                  !/\s/.test(value) ||
                  "Username should not contain empty space"
                );
              },
            })}
            onChange={(e) => handleInputChange("username", e.target.value)}
          />
          <span className="text-xs text-red-700">
            {errors?.username && errors?.username?.message}
          </span>

          {/* Repeat the same for other text fields */}
          {/* Email Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            {...register("email", {
              required: "Email is a required field",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid email format",
              },
            })}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          <span className="text-xs text-red-700">
            {errors?.email && errors?.email?.message}
          </span>

          {/* Password Field */}
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
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
          <span className="text-xs text-red-700">
            {errors?.password && errors?.password?.message}
          </span>

          {/* Repeat Password Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            {...register("repeat_password", {
              required: "Confirm password is required",
              validate: (val) => {
                if (val !== watch("password"))
                  return "Confirmation password should match password.";
              },
            })}
            onChange={(e) => handleInputChange("repeat_password", e.target.value)}
          />
          <span className="text-xs text-red-700">
            {errors?.repeat_password && errors?.repeat_password?.message}
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
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
          </Button>
          <GoogleAuthButton />

          <Grid container justifyContent="center" alignItems="center" marginBottom="70px">
            <Grid item>
              <Link component={RouterLink} to="/sign-in" variant="body2" sx={{ color: 'text.primary', textDecoration: 'none', textAlign: 'center' }}>
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
