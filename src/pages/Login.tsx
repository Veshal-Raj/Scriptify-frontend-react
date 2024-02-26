import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CircularProgress } from "@mui/material";
import {  useState } from "react";
import { useForm } from "react-hook-form"
import { Link as RouterLink, useNavigate } from "react-router-dom";
import GoogleAuthButton from "../components/UI/googleAuthButton";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/user";
import toast, { Toaster } from 'react-hot-toast';
import { validateEmail, validatePassword } from "../utils/validationUtils";
import { setUser } from "../redux/slice/userSlice";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
const PUBLIC_RECAPTCHA_SITE_KEY = import.meta.env.VITE_PUBLIC_RECAPTCHA_SITE_KEY


export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState<string | null>()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

 
  const {mutate: loginMutation} = useMutation({
    mutationFn: login,
    onError: (error) => {
      console.log(error)
      toast.error('login failed ')
      setLoading(false)
    },
    onSuccess: (response) => {
      console.log('success', response)
      console.log('role -->>> ', response.data?.role)
      if (response.status === 200) {
        dispatch(setUser(response.data))
        toast.success('login successfull!')
        setTimeout(()=> navigate('/feed'),800)
      }
    }
  })

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true); // Set loading state to true when form is submitted
      console.log(data);
      const user = {
        email: data.email || "",
        password: data.password || "",
        token: captcha || "",
      }
      console.log(user)
      loginMutation(user)
      
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Container component="main" maxWidth="xs" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", paddingTop: "50px" }}>
      <Toaster />
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
            {...register("email", {
              required: "Email is a required field",
              validate: {
                validEmail: (value) => validateEmail(value)
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
                  requireSixCharacters: (val) => validatePassword(val),
                  containAtleastOneDigit: (val) => validatePassword(val),
                  containAtleastOneAlphabet: (val) => validatePassword(val),
                  containAtleastOneSpecialCharacter: (val) => validatePassword(val),
                  noSpace: (val) => validatePassword(val)
                },
              })}
            />
          <span className="text-xs text-red-700">
            {errors?.password && errors?.password?.message}
          </span>

          <ReCAPTCHA
          sitekey={PUBLIC_RECAPTCHA_SITE_KEY || ""}
          className="flex justify-center"
          onChange={(value: string | null) => {
            console.log(value);
            setCaptcha(value);
          }}
        />

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
          <GoogleAuthButton />

          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/forgot-password"  variant="body2" sx={{ color: 'text.primary', textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/sign-up" variant="body2" sx={{ color: 'text.primary', textDecoration: 'none' }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
