import Pagination from '@mui/material/Pagination';

interface PaginationComponentProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
 }

 const PaginationComponent = ({ count, page, onChange }: PaginationComponentProps) => {
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