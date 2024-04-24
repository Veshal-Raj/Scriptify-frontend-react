import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import OtpInput from './OTPinput';
import ForgotPasswordModal from './ForgotPasswordModal';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogSlideProps {
  currentPage: string;
  setIsModalOpen: (open: boolean) => void;
 }

export default function AlertDialogSlide({currentPage, setIsModalOpen}: AlertDialogSlideProps) {
  const [open] = React.useState(true);

  return (
    <React.Fragment>     
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Please Enter the OTP Sent to Your Email"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            
            {currentPage === "signUp" ? <OtpInput />: <></>}
            {currentPage === "forgotPassword" ? <ForgotPasswordModal setIsModalOpen={setIsModalOpen}  />: <></>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
