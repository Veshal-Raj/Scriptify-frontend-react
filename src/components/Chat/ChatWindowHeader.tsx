import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { Toaster } from 'sonner';
import { RootState } from '../../redux/appStore';

const ChatWindowHeader = () => {
  const selectedUser = useSelector((state: RootState) => state.chat.selectedUser);
  const renderOnlineStatus = () => {
    if (selectedUser?.online) {
      return <Typography variant="caption" style={{ color: 'green' }}>Online</Typography>;
    } else {
      return <Typography variant="caption">Last seen: {selectedUser?.lastSeen}</Typography>;
    }
  };
  return (
    <div className="flex items-center py-3 px-3 border-b ">
      <Toaster richColors position="top-center" />
      <Avatar alt={selectedUser?.name} src={selectedUser?.profileImage} />
      <div style={{ marginLeft: '10px' }}>
        <Typography variant="subtitle1">{selectedUser?.username}</Typography>
        {renderOnlineStatus()}
      </div>
    </div>
  );
}

export default ChatWindowHeader