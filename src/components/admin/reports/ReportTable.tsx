import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Box, TableContainer, Paper, Typography, Button, TablePagination } from '@mui/material';
import { getFullDay } from '../../../hooks/useDate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeBlogStatusApi } from '../../../api/admin';
import { toast } from 'sonner';
import { ReportTableProps } from '../../../@types/TreportAdminTable';


const ReportTable: React.FC<ReportTableProps> = ({ reports }) => {

  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event:  React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { mutate: blogStatusChange } = useMutation({
    mutationKey: ['blogStatus'],
    mutationFn: changeBlogStatusApi,
    onError: (error) => toast.error(error.message),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['allReports'] });
      toast.success('Blog status changed successfully.')
    }
  })

  const handleSendMail = (authorEmail: string) => window.open(`mailto:${authorEmail}`);

  const handleBlogStatus = async (blogId: string) => {
    const data = {
      blogId: blogId
    }
    blogStatusChange(data)
  }

  return (
    <Box>
      <Typography variant="h5" color="GrayText" sx={{ maxWidth: '1000px', marginX: 'auto', borderRadius: '20px', marginTop: '40px' }} >
        Reports
      </Typography>
      <TableContainer sx={{ margin: '10px', padding: '20px', maxWidth: '1000px', marginX: 'auto', borderRadius: '20px', marginTop: '30px' }} component={Paper} elevation={3}>
        <Table stickyHeader aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold' } }}>
              <TableCell>Blog </TableCell>
              <TableCell>Blog Title</TableCell>
              <TableCell>Reported By</TableCell>
              <TableCell>Status </TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Reported At</TableCell>
              <TableCell>SendMail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? reports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : reports).map((report) => (
              <TableRow key={report.reportId}>
                <TableCell><img src={report.blogBanner} alt='blog-banner' className='object-cover h-[70px] w-[100px]' /></TableCell>
                <TableCell>{report.blogTitle}</TableCell>
                <TableCell>{report.reportedByUsername}</TableCell>
                <TableCell>
                  <Button variant="contained" color={report.isBlocked ? 'error' : 'primary'} onClick={() => handleBlogStatus(String(report.blogId))}>
                    {report.isBlocked ? 'Blocked' : 'Active'}
                  </Button>
                </TableCell>
                <TableCell>{report.reason}</TableCell>
                <TableCell>{getFullDay(report.publishedAt)}</TableCell>
                <TableCell>
                  <Button variant="contained" className='bg-blue-200' onClick={() => handleSendMail(report.authorEmail)}>
                    Send
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[2, 4, 5, 10, 25]}
          component="div"
          count={reports.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default ReportTable;