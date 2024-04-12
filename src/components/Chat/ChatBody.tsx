import React, { useEffect, useState } from 'react'
import UserSearch from './UserSearch'
import UserList from './UserList'
import ChatWindow from './ChatWindow'
import InputArea from './InputArea'
import ChatWindowHeader from './ChatWindowHeader'
import { useMediaQuery } from '@mui/material'

import io, { Socket } from 'socket.io-client'
import { IConversation, INewConversation, IUserList } from '../../@types/Tchat'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getChatApi } from '../../api/user'
import { DefaultEventsMap } from '@socket.io/component-emitter'

// const ENDPOINT = import.meta.env.SOCKET_SERVER_ENDPOINT
const ENDPOINT = 'http://localhost:5000'

let socket: Socket<DefaultEventsMap, DefaultEventsMap>, selectedChatCompare;

socket = io(ENDPOINT)

const ChatBody = () => {
  const [selectedUser, setSelectedUser] = useState<IUserList | null>(null);
  const [conversationData, setConversationData] = useState<IConversation[] | INewConversation[]>([])
  const selectedUserFromRedux: IUserList | null = useSelector((state) => state.chat.selectedUser);
  const selectedUserId = selectedUserFromRedux ? selectedUserFromRedux.userId : '';
  const { userData } = useSelector(state => state.user)
  const userId = userData._id
  // console.log('userdata 0000 ', userData)
  // console.log('userdata 0000 ', userData._id)

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    setSelectedUser(null); // Set selectedUser to null on initial rendering
  }, []);

  const {data: userChatData, refetch: refetchUserChatData } = useQuery({
    queryKey: ["initialUserChat"],
    queryFn: () => getChatApi(userId, selectedUser)
  })

  
  useEffect(()=> {
    refetchUserChatData()
  }, [selectedUser])

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit("setup", userData._id)
    
  }, [selectedUserId])

  

  const handleUserClick = (user: IUserList) => {
    setSelectedUser(user);   
  };

  useEffect(() => {
    setConversationData([])
  },[selectedUser])

  useEffect(()=> {
    if (userChatData?.data) {
      // console.log('finding selecteduserid --->> ', userChatData.data)

      setConversationData(userChatData?.data.response)
    }
  }, [userChatData])


  return (
    <>
      <div className='flex  min-h-screen'>

        <div className={`${isSmallScreen ? 'w-full' : 'w-1/3'} `}>
          <UserSearch />
          <UserList onUserClick={handleUserClick} />
        </div>
        {!isSmallScreen && selectedUser ? (
          <div className='border-l border-gray-200 w-2/3'>
            <ChatWindowHeader />
            <ChatWindow conversationData={conversationData} selectedUserId={selectedUser} />
            <InputArea setConversationData={setConversationData} socket={socket} selectedUserId = {selectedUser} />
          </div>
        ) : (
          <div className="min-h-screen w-full flex items-center justify-center bg-[#f1f1f1]">
            <p className=" text-center font-bold text-lg">
              Open a conversation to start a chat.
            </p>
          </div>

        )}
      </div>
    </>
  )
}

export default ChatBody