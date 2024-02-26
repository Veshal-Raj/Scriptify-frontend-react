import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
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

export const TableComponent = () => {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRowsPerPage(event.target.value as number);
    setPage(1); // Reset page number to 1 when changing rows per page
  };

  const tableData = [
    {
      id: 1,
      first_name: 'Beret',
      last_name: 'Lennard',
      email: 'blennard0@pcworld.com',
      gender: 'Female',
      ip_address: '213.196.192.52'
    },
    {
      id: 2,
      first_name: 'Tera',
      last_name: 'Choke',
      email: 'tchoke1@theatlantic.com',
      gender: 'Male',
      ip_address: '101.152.241.70'
    },
    {
      id: 3,
      first_name: 'Lyn',
      last_name: 'Bowart',
      email: 'lbowart2@odnoklassniki.ru',
      gender: 'Male',
      ip_address: '188.127.126.94'
    },
    {
      id: 4,
      first_name: 'Bert',
      last_name: 'Huckett',
      email: 'bhuckett3@tinypic.com',
      gender: 'Female',
      ip_address: '247.156.243.148'
    },
    {
      id: 5,
      first_name: 'Drew',
      last_name: 'Jenicke',
      email: 'djenicke4@businessinsider.com',
      gender: 'Male',
      ip_address: '0.185.35.172'
    },
    {
      id: 6,
      first_name: 'Deloria',
      last_name: 'Pepperill',
      email: 'dpepperill5@meetup.com',
      gender: 'Non-binary',
      ip_address: '101.44.39.120'
    },
    {
      id: 7,
      first_name: 'Spense',
      last_name: 'Ivashnyov',
      email: 'sivashnyov6@hexun.com',
      gender: 'Female',
      ip_address: '253.192.252.49'
    },
    {
      id: 8,
      first_name: 'Elden',
      last_name: 'Chaucer',
      email: 'echaucer7@mozilla.com',
      gender: 'Agender',
      ip_address: '60.70.120.186'
    },
    {
      id: 9,
      first_name: 'Sholom',
      last_name: 'Deetch',
      email: 'sdeetch8@so-net.ne.jp',
      gender: 'Female',
      ip_address: '218.36.95.147'
    },
    {
      id: 10,
      first_name: 'Genovera',
      last_name: 'Colby',
      email: 'gcolby9@dagondesign.com',
      gender: 'Non-binary',
      ip_address: '199.140.221.248'
    }
    // Rest of your data
  ];

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <Box>
      <TableContainer sx={{ margin: '10px', padding: '20px', maxWidth: '1000px', marginX: 'auto', borderRadius: '20px', marginTop:'50px'}} component={Paper}>
        <Table stickyHeader aria-label='simple table'>
          <TableHead>
            <TableRow>
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
            {tableData.slice(startIndex, endIndex).map(row => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.first_name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell align='center'>{row.gender}</TableCell>
                <TableCell align='center'>{row.ip_address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '10px' }}>
          <Pagination
            count={Math.ceil(tableData.length / rowsPerPage)}
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
      </TableContainer>
    </Box>
  );
};
