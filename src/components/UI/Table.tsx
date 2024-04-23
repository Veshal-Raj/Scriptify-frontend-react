import { SetStateAction, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import { Button, FormControl, MenuItem, Select, Typography } from '@mui/material';
import TuserType from '../../@types/TuserType';
import PaginationComponent from './Pagination';
import BlockUserDialog from '../BlogUserDialogBox';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeUserStatus } from '../../api/admin';
import { SelectChangeEvent } from '@mui/material';


export const TableComponent = ({ data }: { data: TuserType[] }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [openBlockDialog, setOpenBlockDialog] = useState(false);

  const queryClient = useQueryClient()

  const { mutate: changeStatus } = useMutation({
    mutationFn: changeUserStatus,
    onSuccess: async (response) => {
      if (response) console.log(response.data)
      await queryClient.invalidateQueries({ queryKey: ["getAllUsers"] })
    }
  })

  const handleChangePage = (_event: unknown, newPage: SetStateAction<number>) => setPage(newPage);

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    const newRowsPerPage = event.target.value as number;
    setRowsPerPage(newRowsPerPage);
    setPage(1); 
   };

  const handleConfirmBlockUser = () => {
    changeStatus(selectedUserId)
    setOpenBlockDialog(false);
  };

  const tableData = data as TuserType[];
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleActiveButtonClick = (userId: string | undefined | SetStateAction<null>) => {
    if (typeof userId === 'string') {
      setSelectedUserId(userId);
    } else if (userId !== undefined) {
      setSelectedUserId(null);
    }
    setOpenBlockDialog(true);
  };

  return (
    <Box>
      <Typography variant="h5" color="GrayText" sx={{ maxWidth: '1000px', marginX: 'auto', borderRadius: '20px', marginTop: '40px' }} >
          Users
      </Typography>
      <TableContainer sx={{ margin: '10px', padding: '20px', maxWidth: '1000px', marginX: 'auto', borderRadius: '20px', marginTop: '30px' }} component={Paper} elevation={3}>
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
                  </div>
                </TableCell>
                <TableCell>{row?.personal_info?.username}</TableCell>
                <TableCell>{row?.personal_info?.email}</TableCell>
                <TableCell align='center'>{row?.account_info?.total_posts ?? 0}</TableCell>
                <TableCell align='center'>
                  <Button
                    variant="contained"
                    sx={{ 
                      backgroundColor: row?.isVerified ? undefined : 'red', 
                      color: row?.isVerified ? undefined : 'white',
                      '&:hover': {
                          backgroundColor: row?.isVerified ? undefined : 'red',
                      }
                  }}
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
          <PaginationComponent
            count={Math.ceil(tableData?.length / rowsPerPage)}
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
        <BlockUserDialog open={openBlockDialog} onClose={() => setOpenBlockDialog(false)} onConfirm={handleConfirmBlockUser} />
      </TableContainer>
    </Box>
  );
};
