import { useContext, useState } from "react"
import { BlogContext } from "./ShowBlogContent"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Popover, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import XIcon from '@mui/icons-material/X';
import { useSelector } from "react-redux";
import ForumIcon from '@mui/icons-material/Forum';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';


const BlogInteraction = () => {
    const { singleBlogData: {title, blog_id, activity, activity: { total_likes, total_comments }, author: { personal_info: { username: author_username }, _id: authorId } },
    setSingleBlogData } = useContext(BlogContext)
    const { userData } = useSelector(state => state.user)

    const userId = userData._id
    // console.log(_id,'--------------')
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    

    const isSameUser = userId === authorId
    // console.log(userId, '---', authorId)
    // console.log(isSameUser)
    
    return (
        <>
            <hr className="border-gray-200 my-2" />

            <div className="flex gap-6 justify-between">
                <div>
                    <div className="flex gap-3 items-center">
                        <Tooltip title="Like" placement="left">
                            <IconButton>
                                <FavoriteBorderIcon />
                            </IconButton>
                        </Tooltip>
                        <p className="text-xl text-gray-600">{total_likes}</p>

                        <Tooltip title="Comment" placement="bottom">
                            <IconButton>
                                <CommentIcon />
                            </IconButton>
                        </Tooltip>
                        <p className="text-xl text-gray-600">{total_comments}</p>

                    {!isSameUser &&<Tooltip title="Chat" placement="right">
                        <IconButton>
                        <ForumIcon />
                        </IconButton>
                    </Tooltip>}

                        
                    </div>
                </div>

                <div className="flex gap-6 items-center">
                {isSameUser && <Link to={`/editor/${blog_id}`} className="hover:text-blue-600">Edit</Link>}
                    <Tooltip title="Twitter" placement="top">
                        <div>
                            <Link to={`https://twitter.com/intent/tweet?text=Read${title}&url=${location.href}`}>
                                <XIcon  />
                            </Link>
                        </div>
                    </Tooltip>
                    {!isSameUser &&
                        <>
                            <IconButton onClick={handlePopoverOpen}>
                                <MoreVertRoundedIcon />
                            </IconButton>
                            <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handlePopoverClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <Paper>
                                    <List>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <BookmarkBorderIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Save" />
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <ReportGmailerrorredIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Report" />
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Popover>
                        </>
                    }
                </div>
            </div>

            <hr className="border-gray-200 my-2" />
        </>
    )
}

export default BlogInteraction