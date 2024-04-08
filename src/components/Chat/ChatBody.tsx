import React, { useState } from 'react'
import UserSearch from './UserSearch'
import UserList from './UserList'
import ChatWindow from './ChatWindow'
import InputArea from './InputArea'
import ChatWindowHeader from './ChatWindowHeader'
import { useMediaQuery } from '@mui/material'

const ChatBody = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const handleUserClick = (user) => {
        setSelectedUser(user);
      };
    
  return (
    <>
        <div className='flex '>

        <div className={isSmallScreen ? 'w-full' : 'w-1/3'}>
            <UserSearch />
            <UserList onUserClick={handleUserClick} />
        </div>
        {!isSmallScreen || selectedUser ?(
          <div className='border-l border-gray-200 w-2/3'>
            <ChatWindowHeader />
            <ChatWindow />
            <InputArea />
          </div>
        ): <></>}
        </div>
    </>
  )
}

export default ChatBody