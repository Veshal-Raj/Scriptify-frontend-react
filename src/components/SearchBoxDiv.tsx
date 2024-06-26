import { motion } from "framer-motion";
import { Backdrop, Skeleton, TextField } from "@mui/material";
import {   SetStateAction, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounceSearch";
import SearchIcon from '@mui/icons-material/Search';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { searchQuery } from "../api/user";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cachedResults } from "../redux/slice/searchSlice";

interface SearchBoxDivProps {
    setSearchDiv: (isOpen: boolean) => void;
   }

const SearchBoxDiv = ({ setSearchDiv }: SearchBoxDivProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<{ title: string; blog_id: string }[]>([])
    const debouncedSearchTerm = useDebounce(searchTerm, 200, searchTerm, setSuggestions);
    const dispatch = useDispatch()

    const { data: searchResults, isLoading, isError } = useQuery({
        queryKey: ["search", debouncedSearchTerm], 
        queryFn: () => searchQuery(debouncedSearchTerm), 
        enabled: !!debouncedSearchTerm 
    });

    const handleSearchChange = (event: { target: { value: SetStateAction<string>; }; }) => setSearchTerm(event.target.value);

    const handleClick = () => {
        setIsOpen(false);
        setSearchDiv(false);
    }

    useEffect(() => {
        if (searchResults && searchResults.data && searchResults.data.response) {
            setSuggestions(searchResults.data.response);
            dispatch(cachedResults({
                [searchTerm]: searchResults.data.response
            }))
        }
    }, [searchResults]);

    return (
        <>
             <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                style={{ position: 'absolute', top: '10%', left: '20%', right: '20%', transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white', padding: '20px', width: '65%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px', zIndex: 999,}}
            >
                <TextField id="outlined-basic" label="Search" variant="outlined" fullWidth value={searchTerm} onChange={handleSearchChange} autoFocus />
                {isLoading && <>
                    <Skeleton variant="text" width={'auto'} />
                    <Skeleton variant="text" width={'auto'} />
                    <Skeleton variant="text" width={'auto'} />
                    <Skeleton variant="text" width={'auto'} />
                </>}
                {isError && <p>Error fetching data</p>}
                {searchResults && suggestions?.length === 0 ? (
                    <div className="flex items-center justify-center h-full p-5">
                        <div className="flex items-center">
                            <span className="ml-2">No result found </span>
                            <SentimentDissatisfiedIcon />
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                {suggestions && (
                   <div className="rounded-lg">
                   <ul className="hover:cursor-pointer">
                       {suggestions.map((result, index) => (
                        <li key={index} className="py-2 px-5 hover:bg-slate-100 shadow-sm text-xs lg:text-base">
                               <Link to={`/user/blog/${result?.blog_id}`}>
                                   <div className="flex items-center">
                                       <SearchIcon />
                                       <span className="ml-2">{result?.title}</span>
                                   </div>
                               </Link>
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