import { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Box, TableContainer, Paper, Typography, TablePagination, Button } from '@mui/material';
import { getFullDay } from '../../../hooks/useDate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeBlogStatusApi } from '../../../api/admin';
import { toast } from 'sonner';

const BlogTable = ({ blogs }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const queryClient = useQueryClient();

  const { mutate: blogStatusChange } = useMutation({
    mutationKey: ['blogStatus'],
    mutationFn: changeBlogStatusApi,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getAllBlogs'] });
      toast.success('Blog status changed successfully.')
    }
  })

  console.log(blogs)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleBlogStatus = async (blogId) => {
    const data = {
      blogId: blogId
    }
    blogStatusChange(data)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSendMail = (authorEmail) => {
    window.open(`mailto:${authorEmail}`);
  };

  return (
    <Box>
      <Typography variant="h5" color="GrayText" sx={{ maxWidth: '1000px', marginX: 'auto', borderRadius: '20px', marginTop: '40px' }}>
        Blogs
      </Typography>
      <TableContainer sx={{ margin: '10px', padding: '20px', maxWidth: '1000px', marginX: 'auto', borderRadius: '20px', marginTop: '30px' }} component={Paper} elevation={3}>
        <Table stickyHeader aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold' } }}>
              <TableCell>Banner</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Published</TableCell>
              <TableCell>Send Mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? blogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : blogs
            ).map((blog) => (
              <TableRow key={blog._id}>
                <TableCell><img src={blog.banner} alt='blog-banner' className='object-cover h-[70px] w-[100px]' /></TableCell>
                <TableCell >
                  <p className={'truncate line-clamp-1 ' + (blog.title.length > 25 ? 'whitespace-normal' : '')}>
                    {blog.title}
                  </p>
                </TableCell>
                <TableCell>{blog.author.personal_info.username}</TableCell>
                <TableCell>
                  <Button variant="contained" color={blog.isBlocked ? 'error' : 'primary'} onClick={() => handleBlogStatus(blog._id)}>
                    {blog.isBlocked ? 'Blocked' : 'Active'}
                  </Button>
                </TableCell>
                <TableCell>{getFullDay(blog.publishedAt)}</TableCell>
                <TableCell>
                  <Button variant="contained" className='bg-blue-200' onClick={() => handleSendMail(blog.author.personal_info.email)}>
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
          count={blogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default BlogTable;