import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';
import { SetStateAction, useEffect, useState } from 'react';
import { chatUserSearchApi } from '../../api/user';
import { IUserList } from '../../@types/Tchat';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchUserList } from '../../redux/slice/chatSlice';

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchUserResult, setSearchUserResult] = useState<IUserList[]>([])
  const { userData } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const userId = userData._id

  const { data: chatSearchResult, isLoading } = useQuery({
    queryKey: ['chatSearch', debouncedSearchTerm],
    queryFn: () => chatUserSearchApi(debouncedSearchTerm)
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    if (chatSearchResult?.data && chatSearchResult.data.response) {
      const filteredUsers = chatSearchResult.data.response.filter((user: { userId: string}) => user.userId !== userId)
      dispatch(setSearchUserList(filteredUsers))
      setSearchUserResult(filteredUsers)
    }
  }, [chatSearchResult, userId])
  
  console.log('chat search result --- ', searchUserResult)

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='mt-2 mx-4 px-5 py-2'>
      <TextField
        label="Search for users"
        variant="standard"
        fullWidth
        value={searchTerm}
        onChange={handleInputChange}
        // Add any other props you need for the TextField
      />
    </div>
  );
};

export default UserSearch;
