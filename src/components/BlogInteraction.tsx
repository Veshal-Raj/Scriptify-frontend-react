import { useContext, useEffect, useState } from "react"
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMutation, useQuery } from "@tanstack/react-query";
import { initialLikeApi, likeBlogApi, unLikeBlogApi } from "../api/user";
import toast from "react-hot-toast";


const BlogInteraction = () => {
    const { singleBlogData: { title, _id, blog_id, activity, activity: { total_likes, total_comments }, author: { personal_info: { username: author_username }, _id: authorId } },
        setSingleBlogData } = useContext(BlogContext)
    const { userData } = useSelector(state => state.user)

    const [isLiked, setIsLiked] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const userId = userData._id
    
    const blogId = _id
   


    const { data: initialBlogQuery } = useQuery({
        queryKey: ["initialQuery"],
        queryFn: () => initialLikeApi(userId, blogId)
    })

    useEffect(() => {
        
        initialBlogQuery
    }, [])

    console.log('first,,,,,,,,,,,', initialBlogQuery)
    
    useEffect(() => {
        
        if (initialBlogQuery?.data.response) {
            setIsLiked(true); 
        } else {
            setIsLiked(false); 
        }
    }, [initialBlogQuery?.data]);

    const { mutate: likeBlog } = useMutation({
        mutationFn: likeBlogApi,
        onSuccess: () => {
            setIsLiked(true)
            setSingleBlogData(prevState => ({
                ...prevState,
                activity: {
                    ...prevState.activity,
                    total_likes: prevState.activity.total_likes + 1
                }
            }));
        },
        onError:  () => {
            toast.error('Something went wrong, Please try again later.')
        }
    })

    const { mutate: unLikeBlog } = useMutation({
        mutationFn: unLikeBlogApi,
        onSuccess: () => {
            setIsLiked(false)
            setSingleBlogData(prevState => ({
                ...prevState,
                activity: {
                    ...prevState.activity,
                    total_likes: prevState.activity.total_likes - 1
                }
            }));
        },
        onError:  () => {
            toast.error('Something went wrong, Please try again later.')
        }
    })


    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);


    const isSameUser = userId === authorId
    

    const handleLike = () => {
       
        const data = {
            blogId: blogId,
            userId: userId
        }
        likeBlog(data)
    }

    const handleUnLike = () => {
    
        const data = {
            blogId: blogId,
            userId: userId
        }
        unLikeBlog(data)
    }

    return (
        <>
            <hr className="border-gray-200 my-2" />

            <div className="flex gap-6 justify-between">
                <div>
                    <div className="flex gap-3 items-center">
                        {!isLiked ? <>
                            <Tooltip title="Like" placement="left">
                                <IconButton onClick={handleLike}>
                                    <FavoriteBorderIcon />
                                </IconButton>
                            </Tooltip>
                        </> : <>
                            <Tooltip title="Unlike" placement="left">
                                <IconButton onClick={handleUnLike}>
                                    <FavoriteIcon color="warning" />
                                </IconButton>
                            </Tooltip>
                        </>
                        }
                        <p className="text-xl text-gray-600">{total_likes}</p>

                        <Tooltip title="Comment" placement="bottom">
                            <IconButton>
                                <CommentIcon />
                            </IconButton>
                        </Tooltip>
                        <p className="text-xl text-gray-600">{total_comments}</p>

                        {!isSameUser && <Tooltip title="Chat" placement="right">
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
                                <XIcon />
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