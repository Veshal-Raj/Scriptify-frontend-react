import { getDay } from "../hooks/date"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const BlogPostCard = ({content, author}) => {
    const {publishedAt,title, banner, des, tags, activity: {total_likes}, blog_id } = content
    const {username} = author
  return (
    <div className="w-full border rounded-xl mb-4">
        <div className="flex gap-2 items-center mb-7">
            <img src='' alt={blog_id} className="w-6 h-6 rounded-full" />
            <p className="line-clamp-1">{username}</p>
            <p className="min-w-fit">{getDay(publishedAt)}</p>
            <img src={banner} alt={blog_id} height="100px" width="150px" /> {/* Set height and width here */}
        </div>
        <h1 className="text-2xl font-medium leading-7 line-clamp-3 sm:line-clamp-2 font-serif">{title}</h1>
        <p className="my-3 text-xl font-sans leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">{des}</p>
        <div className="flex gap-4 mt-7">
            <span className="btn-dark bg-gray-300 text-black py-1 px-4 rounded-full">{tags[0]}</span>
            <FavoriteBorderIcon className="text-xl " />
            <span className=" flex items-center gap-1 text-gray-600 ">{total_likes}</span>
        </div>
    </div>
  )
}

export default BlogPostCard