import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Pagination from '@mui/material/Pagination';
import TuserType from '../../@types/TuserType';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export const TableComponent = ({ data }: { data: TuserType }) => {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);
  const [openBlockDialog, setOpenBlockDialog] = React.useState(false);
  const [openUserInfoDialog, setOpenUserInfoDialog] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<TuserType | null>(null);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRowsPerPage(event.target.value as number);
    setPage(1); // Reset page number to 1 when changing rows per page
  };

  const handleConfirmBlockUser = () => {
    // Here you can implement the logic to block the user
    console.log('User with ID', selectedUserId, 'will be blocked.');
    setOpenBlockDialog(false);
  };

  const tableData: TuserType[] = data as unknown as TuserType[];

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleActiveButtonClick = (userId: string) => {
    setSelectedUserId(userId);
    setOpenBlockDialog(true);
  };

  const handleInfoIconClick = (user: TuserType) => {
    setUserInfo(user);
    setOpenUserInfoDialog(true);
  };

  return (
    <Box>
      <TableContainer sx={{ margin: '10px', padding: '20px', maxWidth: '1000px', marginX: 'auto', borderRadius: '20px', marginTop: '50px' }} component={Paper} elevation={3}>
        <Table stickyHeader aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold' } }}>
              <TableCell>Id</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align='center'>Number of Blogs</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Role</TableCell>
              <TableCell align='center'>Subscribed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.slice(startIndex, endIndex).map(row => (
              <TableRow key={row?._id?.toString()} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f0f0f0' } }} >
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>{row?._id?.toString()}</span>
                    <IconButton onClick={() => handleInfoIconClick(row)}>
                      <InfoIcon />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell>{row?.personal_info?.username}</TableCell>
                <TableCell>{row?.personal_info?.email}</TableCell>
                <TableCell align='center'>{row?.account_info?.total_posts ?? 0}</TableCell>
                <TableCell align='center'>
                  <Button
                    variant="contained"
                    onClick={() => handleActiveButtonClick(row?._id?.toString())}
                  >
                    {row?.isVerified ? 'Active' : 'Blocked'}
                  </Button>
                </TableCell>
                <TableCell align='center'>{row?.role}</TableCell>
                <TableCell align='center'>{row?.isSubscribed ? 'Subscribed' : 'Not Subscribed'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '10px' }}>
          <Pagination
            count={Math.ceil(tableData?.length / rowsPerPage)}
            color="primary"
            page={page}
            onChange={handleChangePage}
          />
          <FormControl>
            <Select
              labelId="rows-per-page-label"
              id="rows-per-page-select"
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
            >
              <MenuItem value={5}>5 Rows</MenuItem>
              <MenuItem value={10}>10 Rows</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Dialog open={openBlockDialog} onClose={() => setOpenBlockDialog(false)} >
          <DialogTitle>User Block Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to block this user?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenBlockDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmBlockUser} color="error" autoFocus variant='contained'>
              Block
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openUserInfoDialog} onClose={() => setOpenUserInfoDialog(false)}>
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
            <Button onClick={() => setOpenUserInfoDialog(false)} color="primary" variant="outlined">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </Box>
  );
};
