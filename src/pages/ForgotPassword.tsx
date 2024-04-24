import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { validateEmail } from '../utils/validationUtils';
import { useMutation } from '@tanstack/react-query';
import { ForgotPasswordEmailApi } from '../api/user';
import { Toaster, toast } from 'sonner';
import ReCAPTCHA from "react-google-recaptcha";
import { AxiosError } from 'axios';
import { CircularProgress } from "@mui/material";
import AlertDialogSlide from '../components/Modal';

const PUBLIC_RECAPTCHA_SITE_KEY = import.meta.env.VITE_PUBLIC_RECAPTCHA_SITE_KEY

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [captcha, setCaptcha] = useState<string | null>()
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)


    const { mutate: forgotPassword } = useMutation({
        mutationFn: ForgotPasswordEmailApi,
        onSuccess: (response) => {
            const message = response.data.message
            toast(message)
            if (message === "OTP send successfully")  setIsModalOpen(true)
            setIsLoading(false)
        },
        onError: (error: AxiosError | unknown) => {
            setIsLoading(false)
            if (error instanceof AxiosError) {
                const message = error.response?.data?.error as string
                if (message === undefined) {
                    const errorMessage = error.response?.data as string
                    toast.error(errorMessage)
                } else {
                    console.log(message)
                    toast.error(message)
                }
            } else toast.error((error as Error).message || 'An unknown error occurred')
        }
    })

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        const validationMessage = validateEmail(value);
        setEmailError(validationMessage === true ? '' : validationMessage);
    };

    const handleResetPassword = () => {
        const validationMessage = validateEmail(email);
        if (validationMessage === true) {
            setIsLoading(true)
            const data = {
                email: email,
                token: captcha
            }
            forgotPassword(data)
        } else setEmailError(validationMessage);
    };

    return (
        <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", paddingTop: "50px" }}>
            <Toaster richColors position="top-center" />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ marginTop: 50 }}
            >
                {isModalOpen && <AlertDialogSlide currentPage="forgotPassword" setIsModalOpen={setIsModalOpen} />}
                <Typography variant="h4" align="center" gutterBottom> 
                    Forgot Password
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                    Enter your email address to reset your password.
                </Typography>
                <TextField label="Email Address" variant="outlined" fullWidth margin="normal" type="email"
                    value={email} onChange={handleEmailChange} error={!!emailError} helperText={emailError} />
                <ReCAPTCHA
                    sitekey={PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    className="flex justify-center"
                    onChange={(value: string | null) => {
                        console.log(value);
                        setCaptcha(value);
                    }}
                />
                <Button variant="contained" disabled={isLoading} fullWidth onClick={handleResetPassword} sx={{ bgcolor: '#007bff', color: "white", px: 2, py: 1, mx: 2, my: 1 }}>
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}</Button>
            </motion.div>
        </Container>
    );
};

export default ForgotPassword;