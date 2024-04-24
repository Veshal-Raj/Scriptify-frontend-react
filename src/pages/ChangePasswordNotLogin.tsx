import { Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import { motion } from 'framer-motion';
import { validatePassword } from '../utils/validationUtils';
import { Toaster, toast } from 'sonner';
import { AxiosError } from 'axios';
import { changePasswordNotLoggedInApi } from '../api/user';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PUBLIC_RECAPTCHA_SITE_KEY = import.meta.env.VITE_PUBLIC_RECAPTCHA_SITE_KEY

const ChangePasswordNotLogin = () => {
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
  const [captcha, setCaptcha] = useState<string | null>()
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: ChangePasswordNotLoggedIn } = useMutation({
    mutationFn: changePasswordNotLoggedInApi,
    onSuccess: () => {
      toast.success('Password changed successfully')
      setIsLoading(false)
      navigate('/sign-in')

    },
    onError: (error: AxiosError | unknown) => {
      setIsLoading(false)
      if (error instanceof AxiosError) {
        const message = error.response?.data?.error as string
        if (message === undefined) {
          const errorMessage = error.response?.data as string
          toast.error(errorMessage)
        } else toast.error(message)
      } else toast.error((error as Error).message || 'An unknown error occurred')
    }
  })

  const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
    const validationMessage = validatePassword(newPasswordValue);
    if (typeof validationMessage === 'string') setPasswordValidationMessage(validationMessage);
    else setPasswordValidationMessage('');
  };

  const handleChangeConfirmPassword = (e: { target: { value: React.SetStateAction<string>; }; }) => setConfirmPassword(e.target.value);

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      setIsLoading(false)
    } else {
      setIsLoading(true)
      setNewPassword('');
      setConfirmPassword('');
      setErrorMessage('');
      const data = {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
        token: captcha
      }
      ChangePasswordNotLoggedIn(data)
      setCaptcha(null)
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ marginY: 15 }}>
        <Toaster richColors position='top-center' />
        <Typography variant="h5" textAlign="center" gutterBottom sx={{ marginY: 5 }}>
          Change Password
        </Typography>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <motion.form initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} >
          <TextField label="New Password*" type="password" value={newPassword} onChange={handleChangeNewPassword}
            fullWidth margin="normal" error={!!passwordValidationMessage} helperText={passwordValidationMessage} />
          <TextField label="Confirm Password*" type="password" value={confirmPassword}
            onChange={handleChangeConfirmPassword} fullWidth margin="normal" />
          <ReCAPTCHA
            sitekey={PUBLIC_RECAPTCHA_SITE_KEY || ""}
            className="flex justify-center"
            onChange={(value: string | null) => setCaptcha(value)}
          />
          <Button variant="contained" disabled={isLoading} fullWidth onClick={handleSave} sx={{ bgcolor: '#007bff', color: "white", px: 2, py: 1, mx: 2, my: 1 }}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
        </motion.form>
      </Container>
    </>
  );
};

export default ChangePasswordNotLogin