import Pagination from '@mui/material/Pagination';

const PaginationComponent = ({ count, page, onChange }) => {
  return (
    <Pagination
      count={count}
      color="primary"
      page={page}
      onChange={onChange}
    />
  );
};

export default PaginationComponent;