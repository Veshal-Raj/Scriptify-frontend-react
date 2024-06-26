import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../../utils/firebase'
import { Button } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { googleAuthUserApi } from '../../api/user';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';

interface UserData {
  uid: string;
}

const GoogleAuthButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { mutate: googleAuthUserData } = useMutation({
    mutationKey: ['googleAuth'],
    mutationFn: googleAuthUserApi,
    onSuccess: (response) => {
      if (response.status === 200) {
        dispatch(setUser(response.data.response))
        toast.success('login successfull!')
        if (response.data?.response.role === 'admin') setTimeout(() => navigate('/admin/dashboard'), 800)
        if (response.data?.response.role === 'user') setTimeout(() => navigate('/user/feed'), 800)
      }
    }
  })

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      const data: UserData = {
        uid: result.user.uid
      }
      if (result.user.uid) {
        googleAuthUserData(data)
      }
    } catch (error) {
      console.error('could not login with google', error);
      toast.error(`Error: ${(error as Error).toString()}`)
    }
  }

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
          color: 'black',
          borderColor: 'black',
          '&:hover': {
            borderColor: 'black',
            color: 'black',
          },
        }}
        onClick={handleGoogleClick}
      >
        <GoogleIcon />
        Sign in with Google
      </Button>
    </div>
  )
}

export default GoogleAuthButton