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
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMutation, useQuery } from "@tanstack/react-query";
import { initialLikeApi, likeBlogApi, saveBlogApi, unLikeBlogApi, unSaveBlogApi } from "../api/user";
import { toast } from 'sonner'
import CommentDrawer from "./CommentDrawer";


const BlogInteraction = () => {
    const { singleBlogData: { title, _id, blog_id, activity, activity: { total_likes, total_comments }, author: { personal_info: { username: author_username }, _id: authorId } },
        setSingleBlogData } = useContext(BlogContext)
    const { userData } = useSelector(state => state.user)

    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState(false);

    const userId = userData._id

    const blogId = _id

    const commentData = {
        userId : userId,
        authorId: authorId,
        blogId: blog_id,
        _id: _id 
    }

    const { data: initialBlogQuery } = useQuery({
        queryKey: ["initialQuery"],
        queryFn: () => initialLikeApi(userId, blogId)
    })

    useEffect(() => {

        initialBlogQuery
    }, [])

    console.log('first,,,,,,,,,,,', initialBlogQuery)

    useEffect(() => {
        if (initialBlogQuery && initialBlogQuery.data && initialBlogQuery.data.response) {
            setIsLiked(initialBlogQuery.data.response.isLiked);
            setIsSaved(initialBlogQuery.data.response.isSaved);
        }
    }, [initialBlogQuery]);

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
        onError: () => {
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
        onError: () => {
            toast.error('Something went wrong, Please try again later.')
        }
    })

    const { mutate: saveBlog } = useMutation({
        mutationFn: saveBlogApi,
        onSuccess: (response) => {
            console.log('response form save blog -->>> ', response.data.response.success)
            const result = response.data.response.success
            if (result) {
                setIsSaved(true)
                toast.success('Blog Saved Successfully')
            }
        },
        onError: () => {
            toast.error('Something went wrong, Please try again later.')
        }
    })

    const { mutate: unSaveBlog } = useMutation({
        mutationFn: unSaveBlogApi,
        onSuccess: (response) => {
            console.log('response from unsave blog -->> ', response.data.response.success)
            const result = response.data.response.success
            if (result) {
                setIsSaved(false)
                toast.success('Blog Unsaved Successfully')
            }
        },
        onError: () => {
            toast.error('Something went wrong, Please try agian later.')
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

    const handleSave = () => {
        const data = {
            blogId: blogId,
            userId: userId
        }
        saveBlog(data)
    }

    const handleUnSave = () => {
        const data = {
            blogId: blogId,
            userId: userId
        }
        unSaveBlog(data)
    }

    const handleCommentsDrawerOpen = () => {
        setIsCommentsDrawerOpen(true);
      };
    
      const handleCommentsDrawerClose = () => {
        setIsCommentsDrawerOpen(false);
      };

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
                            <IconButton onClick={handleCommentsDrawerOpen}>
                                <CommentIcon />
                            </IconButton>
                        </Tooltip>
                        <p className="text-xl text-gray-600">{total_comments}</p>

                        <CommentDrawer
                            open={isCommentsDrawerOpen}
                            onClose={handleCommentsDrawerClose}
                            title={ title }
                            commentData  = {commentData}
                            
                        />

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

                                            {isSaved ? (
                                                <ListItemIcon onClick={handleUnSave}>
                                                    <BookmarkIcon color="primary" />
                                                </ListItemIcon>
                                            ) : (
                                                <ListItemIcon onClick={handleSave}>
                                                    <BookmarkBorderIcon />
                                                </ListItemIcon>
                                            )}

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