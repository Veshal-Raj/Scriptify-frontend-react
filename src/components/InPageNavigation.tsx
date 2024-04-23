import { ReactNode, SetStateAction, useState } from "react";
import { Button, Chip, Drawer, IconButton, Typography } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion'

type Props = {
    routes: string[];
    defaultHidden: string[];
    children: ReactNode;
    tags: string[];
    onTagFilter: (tag: string) => void;
    onResetBlogs: () => void;
}

const InPageNavigation: React.FC<Props> = ({ routes, defaultHidden = [], children, tags, onTagFilter, onResetBlogs }) => {
    const [inPageNavIndex, setInPageNavIndex] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const [chipSelected, setChipSelected] = useState<number | null>(null)



    const changePageState = (i: number) => setInPageNavIndex(i);


    const handleClick = () => setIsClicked(!isClicked);

    const handleChipClick = (tag: string, index: SetStateAction<number | null>) => {
        if (chipSelected === index) {
            setChipSelected(null);
            setIsClicked(false);
            onResetBlogs();
        } else {
            setChipSelected(index);
            setIsClicked(false);
            onTagFilter(tag);
        }
    }

    const handleCloseDrawer = () =>  setIsClicked(false);

    return (
        <>
            <section className="mx-auto my-5">
                <div className="relative mb-8 text-lg ml-[25px] lg:ml-0  flex flex-nowrap overflow-x-auto">
                    {routes.map((route, i) => (
                        <Button
                            key={i}
                            className={"p-4 px-5 capitalize " + (defaultHidden.includes(route) ? "md:hidden" : "")}
                            onClick={() => { changePageState(i) }} style={{ color: (inPageNavIndex === i ? 'black' : 'gray'), padding: '1rem', paddingLeft: '1.25rem', borderBottom: inPageNavIndex === i ? '1px solid black' : 'none' }}
                        >
                            {route}
                        </Button>
                    ))}
                    <div className="lg:hidden mt-3 ml-auto">
                        <IconButton className="" onClick={handleClick}>
                            <FilterListIcon color={isClicked ? 'secondary' : 'inherit'} />
                        </IconButton>
                    </div>
                </div>
                <Typography variant="body1">{Array.isArray(children) ? children[inPageNavIndex] : children}</Typography>
            </section>
            <Drawer anchor="bottom" open={isClicked} onClose={handleClick}
                PaperProps={{
                    sx: {
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                    }
                }}
            >
                <div className="flex flex-wrap gap-3 mt-10 m-5 " style={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {tags.map((tag, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Chip
                                label={tag}
                                variant="outlined"
                                className="mb-2 "
                                color={chipSelected === index ? "default" : "primary"}
                                onClick={() => handleChipClick(tag, index)}
                            />
                        </motion.div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                    <IconButton onClick={handleCloseDrawer} sx={{ border: '1px solid rgba(0, 0, 0, 0.5)', borderRadius: '50%' }}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </Drawer>
        </>
    );
};

export default InPageNavigation;