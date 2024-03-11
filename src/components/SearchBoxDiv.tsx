import { motion } from "framer-motion";
import { Backdrop, Skeleton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/debounceSearch";
import SearchIcon from '@mui/icons-material/Search';
import { searchQuery } from "../api/user";
import { useQuery } from "@tanstack/react-query";

const SearchBoxDiv = ({ setSearchDiv }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Using React Query to fetch data
    const { data: searchResults, isLoading, isError } = useQuery({
        queryKey: ["search", debouncedSearchTerm], // Include debounced search term in the query key
        queryFn: () => searchQuery(debouncedSearchTerm), // Pass debounced search term to the query function
        enabled: !!debouncedSearchTerm // Enable the query when there is a debounced search term
    });

    // Function to handle search term change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleClick = () => {
        setIsOpen(false);
        setSearchDiv(false);
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '20%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    width: '50%',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    zIndex: 999
                }}
            >
                <TextField id="outlined-basic" label="Search" variant="outlined" fullWidth value={searchTerm} onChange={handleSearchChange} autoFocus />
                {/* Display loading state if data is still loading */}
                {isLoading &&<>
                    <Skeleton variant="text" width={'auto'} />
                    <Skeleton variant="text" width={'auto'} />
                    <Skeleton variant="text" width={'auto'} />
                    <Skeleton variant="text" width={'auto'} />
                </> }
                {/* Display error message if there's an error */}
                {isError && <p>Error fetching data</p>}
                {/* Display search results */}
                {searchResults && searchResults?.length === 0 ? <p> No results</p>:<></>}
                {searchResults && (
                    <div className="rounded-lg">
                        <ul className="hover:cursor-pointer">
                            {searchResults.map((result, index) => (
                                <li key={index} className="py-2 px-5 hover:bg-slate-100 shadow-sm">
                                    <div className="flex items-center">
                                        <SearchIcon />
                                        <span className="ml-2">{result}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </motion.div>
            <Backdrop open={isOpen} onClick={handleClick} />
        </>
    );
}

export default SearchBoxDiv;
