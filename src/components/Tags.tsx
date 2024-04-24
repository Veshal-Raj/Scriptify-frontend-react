import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { setBlog } from '../redux/slice/editorSlice';
import { RootState } from '../redux/appStore';

interface TagsProps {
    tag: string;
    tagIndex: number;
}


export const Tags: React.FC<TagsProps> = ({ tag, tagIndex }) => {
    const dispatch = useDispatch()
    const blog = useSelector((state: RootState) => state.editor.blog);
    let tags: string[] = [...blog.tags];
    const handleTagDelete = () => {
        tags = tags.filter((t: string) => t !== tag)
        dispatch(setBlog({ ...blog, tags }))
    }
    const handleTagEdit = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
        if (e.keyCode === 13 || e.keyCode === 188) {
            e.preventDefault();
            const currentTag = (e.target as HTMLParagraphElement).innerText;
            tags[tagIndex] = currentTag;
            dispatch(setBlog({ ...blog, tags }));
            (e.target as HTMLElement).setAttribute("contentEditable", "false");
        }
    }
    const addEditable = (e: React.MouseEvent<HTMLParagraphElement>) => {
        const target = e.currentTarget as HTMLParagraphElement;
        target.setAttribute("contentEditable", "true");
        target.focus();
    }
    return (
        <div className="relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-8">
            <p className="outline-none px-2" onClick={addEditable} onKeyDown={handleTagEdit}>
                {tag}
            </p>
            <button className='mt-[1px]  rounded-full absolute right-3 top-1/2 -translate-y-1/2' onClick={handleTagDelete}>
                <CloseIcon />
            </button>
        </div>
    )
}
