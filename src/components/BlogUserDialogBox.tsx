import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface BlockUserDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
 }

const BlockUserDialog = ({ open, onClose, onConfirm }: BlockUserDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>User Block Confirmation</DialogTitle>
      <DialogContent>
        Are you sure you want to block this user?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" autoFocus variant='contained'>
          Block
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlockUserDialog;