import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface BackdropLoadingProps {
  isSubmitting: boolean;
}

export default function BackdropLoading({ isSubmitting }: BackdropLoadingProps) {
  console.log(isSubmitting)
  const [, setOpen] = React.useState(isSubmitting);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}