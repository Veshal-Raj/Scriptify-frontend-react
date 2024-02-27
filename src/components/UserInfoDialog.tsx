import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const UserInfoDialog = ({ open, onClose, userInfo }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ marginBottom: '8px', fontWeight: 'bold' }}>User Information</DialogTitle>
      <DialogContent>
      {userInfo && (
              <div style={{ lineHeight: '2' }}>
                <div ><span style={{ marginBottom: '8px', fontWeight: 'bold' }}>ID:</span> {userInfo._id}</div>
                <div ><span style={{ marginBottom: '8px', fontWeight: 'bold' }}>Username:</span> {userInfo?.personal_info?.username}</div>
                <div ><span style={{ marginBottom: '8px', fontWeight: 'bold' }}>Email:</span> {userInfo?.personal_info?.email}</div>
                <div ><span style={{ marginBottom: '8px', fontWeight: 'bold' }}>Number of Blogs:</span> {userInfo?.account_info?.total_posts}</div>
                <div ><span style={{ marginBottom: '8px', fontWeight: 'bold' }}>Total Reads:</span> {userInfo?.account_info?.total_reads}</div>
                <div ><span style={{ marginBottom: '8px', fontWeight: 'bold' }}>Status:</span> {userInfo.isVerified ? 'Active' : 'Blocked'}</div>
                <div ><span style={{ marginBottom: '8px', fontWeight: 'bold' }}>Role:</span> {userInfo?.role}</div>
                <div ><span style={{ marginBottom: '8px', fontWeight: 'bold' }}>Subscribed:</span> {userInfo?.isSubscribed ? 'Yes' : 'No'}</div>
                <div ><span style={{ marginBottom: '8px', fontWeight: 'bold' }}>Joined Date:</span> {userInfo && new Date(userInfo?.joinedAt).toLocaleDateString()}</div>
                <div ><span style={{ marginBottom: '8px', fontWeight: 'bold' }}>Joined Time:</span> {userInfo && new Date(userInfo?.joinedAt).toLocaleTimeString()}</div>
              </div>
            )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserInfoDialog;