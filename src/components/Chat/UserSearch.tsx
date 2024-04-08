import TextField from '@mui/material/TextField';


const UserSearch = () => {
  return (
    <div className='mt-2 mx-4 px-5 py-2'>
      <TextField
        label="Search for users"
        variant="standard"
        fullWidth
        
        // Add any other props you need for the TextField
      />
    </div>
  )
}

export default UserSearch