import { Toaster, toast } from 'sonner'
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from "react";
import { EditorContext } from "../pages/Write";
import { useDispatch, useSelector } from "react-redux";
import { setBlog, setTextEditor } from "../redux/slice/editorSlice";
import { Tags } from "./Tags";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { initialState } from "../redux/slice/editorSlice";
import { Button, TextField, Typography } from "@mui/material";
import { motion } from 'framer-motion'
import { characterLimit, tagLimit } from "../utils/constants/constants";
import { RootState } from '../redux/appStore';


export const PublishForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { setEditorState } = useContext(EditorContext)
  const { userData } = useSelector((state: RootState) => state.user)
  const authorId = userData?._id
  const blog = useSelector((state: RootState) => state.editor.blog);
  const tags: string[] = blog?.tags || [];

  const handleCloseEvent = () => setEditorState('editor')

  const handleBlogTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    dispatch(setBlog({ ...blog, title: input.value }))
  }

  const handleDesKeyDown = (e: { keyCode: number; preventDefault: () => void; }) => {
    if (e.keyCode === 13) e.preventDefault()
  }

  const handleBlogDesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    dispatch(setBlog({ ...blog, des: input.value }))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault()
      const tagfromInput = (e.target as HTMLInputElement).value;
      if (!tagfromInput.length) return toast.error('type something for the tag')
      if (tags.length <= tagLimit) {
        if (!tags.includes(tagfromInput) && tagfromInput.length) {
          dispatch(setBlog({ ...blog, tags: [...tags, tagfromInput] }))
        }
      } else toast.error(`You can add max ${tagLimit} tags`);
      (e.target as HTMLInputElement).value = '';
    }
  }

  const publishBlogFn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if ((e.target as HTMLElement).classList.contains("disable")) return

    if (!blog.title.length) return toast.error('Write blog title before publishing')

    if (!blog.des.length || blog.des.length > characterLimit) return toast.error(`Description should be within ${characterLimit} characters to publish`)

    if (!tags.length) return toast.error("Enter at least 1 tag before publish")

    const loadingToast = toast.loading("Publishing...");
    (e.target as HTMLElement).classList.add('disable')

    const blogObj = {
      title: blog.title, banner: blog.banner, des: blog.des, content: blog.content, tags: blog.tags, author: authorId, draft: false
    }

    axios.post(import.meta.env.VITE_BASE_URL + 'user/create-blog', blogObj)
      .then(() => {
        (e.target as HTMLElement).classList.remove('disable')
        toast.dismiss(loadingToast);
        toast.success('Published 👍')
        setTimeout(() => navigate('/user/feed'), 500)
        dispatch(setBlog(initialState.blog));
        dispatch(setEditorState(initialState.editorState));
        dispatch(setTextEditor(initialState.textEditor));
      }).catch((error) => {
        (e.target as HTMLElement).classList.remove('disable')
        toast.dismiss(loadingToast)
        return toast.error(error.message)
      })
  }

  return (
    <>
      <div >
        <section className="w-screen min-h-screen mb-12 p-4 grid items-center lg:grid-cols-2 py-16 lg:gap-4">
          <Toaster richColors position="top-right" expand={false} />
          <button className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]" onClick={handleCloseEvent}>
            <CloseIcon />
          </button>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-[550px] block mx-auto" >
            <Typography variant="body1" className="text-dark-grey mb-1 px-5  ">Preview</Typography>
            <div className="w-full aspect-video rounded-lg overflow-hidden mt-4">
              <img src={blog.banner} alt="Blog Banner" className="px-5" />
            </div>
            <Typography variant="h3" className="text-xl font-medium mt-2 leading-tight px-5 line-clamp-2">{blog.title}</Typography>
            <Typography variant="body1" className="font-serif line-clamp-2 text-xl leading-7 px-5 mt-4">{blog.des}</Typography>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} exit={{ opacity: 0 }}
            className="border-gray-50 lg:border-1 lg:pl-8 max-w-[700px]"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ marginTop: 4 }} >
              <Typography variant="body1" className="text-gray-400 mb-2 mt-9 px-5">Blog Title</Typography>
              <TextField type="text" placeholder="Blog Title" defaultValue={blog.title} fullWidth variant="outlined"
                className="w-[100%] max-w-[650px] rounded-md px-5 p-4 bg-grey pl-12 border border-grey focus:bg-transparent placeholder:text-black"
                sx={{ marginBottom: '20px' }} onChange={handleBlogTitleChange}
              />
              <Typography variant="body1" className="text-gray-400 mb-2 px-5  mt-9">Short description about your blog</Typography>
              <TextField inputProps={{ maxLength: characterLimit }} defaultValue={blog.des} multiline rows={4} fullWidth variant="outlined"
                onChange={handleBlogDesChange} onKeyDown={handleDesKeyDown}
                className="h-40 max-w-[650px] px-5 resize-none leading-7 w-[100%] rounded-md p-4 bg-grey pl-12 border border-grey focus:bg-transparent placeholder:text-black"
              />
              <Typography variant="body1" className="mt-1 px-5 text-gray-400 text-sm text-right">{characterLimit - blog.des.length} characters left</Typography>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ marginTop: 4 }} >
              <Typography variant="body1" className="text-gray-400 mb-2 mt-9 px-5">Topics - (Helps in searching and ranking your blog post)</Typography>
              <div className="relative w-[100%] max-w-[650px] rounded-md p-4 bg-grey pl-12 border border-grey focus:bg-transparent placeholder:text-black bg-gray-50 top-0 left-0 px-5  py-2 pb-4">
                <TextField className="sticky w-[100%] max-w-[650px] rounded-md px-5 p-4 bg-grey pl-12 border border-grey focus:bg-transparent placeholder:text-black bg-white top-0 left-0 mb-3 focus:bg-white"
                  type="text" placeholder="Topic" fullWidth variant="outlined" onKeyDown={handleKeyDown}
                />
                {tags.map((tag, i) => (
                  <Tags tag={tag} tagIndex={i} key={i} />
                ))}
              </div>
              <Typography variant="body1" className="mt-1 max-w-[650px] px-5 text-gray-400 text-sm text-right">{tagLimit - tags.length} Tags left</Typography>
              <Button className="whitespace-nowrap bg-blue-500 text-white rounded-full py-3 px-6 text-xl capitalize hover:bg-opacity-80"
               variant="outlined" color="primary" sx={{ px: 5, py: 1, borderRadius: 15, }} onClick={publishBlogFn}
              >
                Publish
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </>
  )
}