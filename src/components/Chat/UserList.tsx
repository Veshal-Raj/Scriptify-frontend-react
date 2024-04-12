import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import { useMediaQuery } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { fetchAllUsersApi } from '../../api/chat';
import {  IUserList } from '../../@types/Tchat';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../../redux/slice/chatSlice';
import { timeAgo } from '../../hooks/useDate';

type UserClickHandler = (user: IUserList) => void;

interface UserListProps {
  onUserClick: UserClickHandler;
}




const UserList: React.FC<UserListProps> = ({ onUserClick}) => {
  const dispatch = useDispatch()
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const maxHeight = isSmallScreen ? 'auto' : '655px';
  const [userListData, setUserListData ] = useState<IUserList[]>([])
  const { userData } = useSelector(state => state.user)

  const userId = userData._id

  const { data: allUserForList, refetch } = useQuery({
    queryKey: ['fetchAllUserForChatList'],
    queryFn: fetchAllUsersApi,
    enabled: false, // Disable auto-fetching on mount
  });

  useEffect(() => {
    if (allUserForList?.data && allUserForList.data.response ) {
      
      const filteredUsers = allUserForList.data.response.filter((user: { userId: string; }) => user.userId !== userId);
      setUserListData(filteredUsers);
    }
  }, [allUserForList, userId])

  
  useEffect(() => {
    // Call the fetch function when the component mounts
    refetch();
  }, [refetch]);
  
  // console.log('all users ---- ',  userListData)

  const handleUserClick = (user: IUserList) => {
    console.log('user -||-- ', user)
    dispatch(setSelectedUser(user))
    
    onUserClick(user.userId)
  }

  return (
    <div className='my-4 px-4 ' style={{ maxHeight:  maxHeight, overflowY: 'auto' }}>
      <Stack spacing={2} >
        <List style={{ padding: 0 }}>
          { userListData && userListData?.map((user) => (
            <ListItem key={user.userId} alignItems="flex-start" style={{ border: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', borderRadius: '10px', marginTop: '5px' }} onClick={() => handleUserClick(user)}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    color="primary"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    variant="dot"
                    invisible={!user.online}
                    
                  >
                    <Avatar alt={user.username} src={user.profileImage} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={user.username}
                  secondary={user.lastMessage && user.lastMessage.length > 15 ? user.lastMessage.substring(0, 15) + '...' : user.lastMessage}
                />
              </div>
              <div style={{ color: 'green' }}>
                {new Date(user.time).toLocaleString()}</div>
            </ListItem>
          ))}
        </List>
      </Stack>
    </div>
  );
};

export default UserList;
