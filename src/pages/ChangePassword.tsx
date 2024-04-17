import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { TextField, Button, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import ReCAPTCHA from "react-google-recaptcha";
import { validatePassword } from '../utils/validationUtils';
import { CircularProgress } from "@mui/material";
import { useMutation } from '@tanstack/react-query';
import { changePasswordApi } from '../api/user';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { AxiosError } from 'axios';


const PUBLIC_RECAPTCHA_SITE_KEY = import.meta.env.VITE_PUBLIC_RECAPTCHA_SITE_KEY


const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
    const [captcha, setCaptcha] = useState<string | null>()
    const [isLoading, setIsLoading] = useState(false);
    const { userData } = useSelector(state => state.user)
    const userId = userData._id

    const { mutate: ChangePassword } = useMutation({
        mutationFn: changePasswordApi,
        onSuccess: ()=>{
            toast.success('Password changed successfully')
            setIsLoading(false)

        },
        onError: (error: AxiosError | unknown ) => {
            console.log(error)
            setIsLoading(false)
            if (error instanceof AxiosError) {
                const message = error.response?.data?.error as string
                if (message === undefined){
                const errorMessage = error.response?.data as string
                    toast.error(errorMessage)
                }else {

                    console.log(message)
                    toast.error(message)
                }
            } else {
                toast.error((error as Error).message || 'An unknown error occurred')
            }
        }
    })

  
    const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPasswordValue = e.target.value;
      setNewPassword(newPasswordValue);
      // Call the validatePassword function and update the validation message state
      const validationMessage = validatePassword(newPasswordValue);
      if (typeof validationMessage === 'string') {
        setPasswordValidationMessage(validationMessage);
      } else {
        setPasswordValidationMessage(''); // Clear the validation message if the password is valid
      }
    };
  
    const handleChangeConfirmPassword = (e: { target: { value: React.SetStateAction<string>; }; }) => {
      setConfirmPassword(e.target.value);
    };
  
    const handleSave = () => {
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords don't match");
            setIsLoading(false)
        } else {
            // Here you can add your logic to save the new password
            // For example, you can make an API call to update the password
            console.log('New Password:', newPassword);
            console.log('Confirm Password:', confirmPassword);
            console.log(captcha)
            setIsLoading(true)
        // Clear the form fields
        setNewPassword('');
        setConfirmPassword('');
        setErrorMessage('');
        const data = {
            userId: userId,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
            token: captcha
        }
        
        ChangePassword(data)
        setCaptcha(null)
      }
    };
  
    return (
      <>
        <Navbar />
        <Container maxWidth="sm">
          <Typography variant="h5" textAlign="center" gutterBottom sx={{ marginY: 5}}>
            Change Password
          </Typography>
          {/* Display error message if passwords don't match */}
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
          {/* Form for changing password */}
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TextField
              label="New Password*"
              type="password"
              value={newPassword}
              onChange={handleChangeNewPassword}
              fullWidth
              margin="normal"
              error={!!passwordValidationMessage} // Set error state based on validation message
              helperText={passwordValidationMessage} // Display validation message as helper text
            />
            <TextField
              label="Confirm Password*"
              type="password"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              fullWidth
              margin="normal"
            />
          <ReCAPTCHA
          sitekey={PUBLIC_RECAPTCHA_SITE_KEY || ""}
          className="flex justify-center"
          onChange={(value: string | null) => {
            console.log(value);
            setCaptcha(value);
          }}
        />
            <Button variant="contained" disabled={isLoading} fullWidth onClick={handleSave} sx={{ bgcolor: '#007bff', color: "white", px: 2, py: 1, mx: 2, my: 1 }}>
                            {isLoading ? <CircularProgress size={24} color="inherit" />: "Save"}</Button>
          
        </motion.form>
      </Container>
    </>
  );
};

export default ChangePassword;
