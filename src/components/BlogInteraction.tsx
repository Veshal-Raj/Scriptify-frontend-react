import { useContext } from "react"
import { BlogContext } from "./ShowBlogContent"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import XIcon from '@mui/icons-material/X';


const BlogInteraction = () => {
    const { singleBlogData: {title, blog_id, activity, activity: { total_likes, total_comments }, author: { personal_info: { username: author_username } } },
        setSingleBlogData } = useContext(BlogContext)
    return (
        <>
            <hr className="border-gray-200 my-2" />

            <div className="flex gap-6 justify-between">
                <div>
                    <div className="flex gap-3 items-center">
                        <Tooltip title="Like" placement="top">
                            <IconButton>
                                <FavoriteBorderIcon />
                            </IconButton>
                        </Tooltip>
                        <p className="text-xl text-gray-600">{total_likes}</p>

                        <Tooltip title="Comment" placement="top">
                            <IconButton>
                                <CommentIcon />
                            </IconButton>
                        </Tooltip>
                        <p className="text-xl text-gray-600">{total_comments}</p>
                    </div>
                </div>

                <div className="flex gap-6 items-center">
                    <Link to={`/editor/${blog_id}`} className="hover:text-blue-600">Edit</Link>
                    <Tooltip title="Twitter" placement="top">
                        <div>
                            <Link to={`https://twitter.com/intent/tweet?text=Read${title}&url=${location.href}`}>
                                <XIcon  />
                            </Link>
                        </div>
                    </Tooltip>
                </div>
            </div>

            <hr className="border-gray-200 my-2" />
        </>
    )
}

export default BlogInteraction