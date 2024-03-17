import Navbar from "./Navbar";
import blogBanner from '../assests/imgs/blog banner.png'
import { uploadImage } from "../hooks/aws";
import { useContext, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import EditorJS from '@editorjs/editorjs'
import { tools } from "./ToolsComponent";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "../redux/slice/editorSlice";
import { EditorContext } from "../pages/Write";
import MobileFooter from "./MobileFooter";

export const BlogEditor = () => {
  const dispatch = useDispatch()
  const blog = useSelector((state) => state.editor.blog);
  const editorState = useSelector((state) => state.editor.editorState);

  const { textEditor, setTextEditor } = useContext(EditorContext)


  useEffect(() => {
    setTextEditor(new EditorJS({
      holder: 'textEditor',
      data: blog.content,
      tools: tools,
      placeholder: "Let's write an awesome story...",
    }));
  }, []);

  const handleBannerUpload = (e) => {
    const img = e.target.files[0]
    console.log(img)
    if (img) {
      const LoadingToast = toast.loading('Uploading...')
      uploadImage(img).then((url) => {
        if (url) {
          toast.dismiss(LoadingToast)
          toast.success('Uploaded 👍')
          dispatch(setBlog({ ...blog, banner: url }));
        }
      }).catch(err => {
        toast.dismiss(LoadingToast)
        return toast.error(err.message)
      })
    }
  }

  const handleTitleKeyDown = (e: { keyCode: number; preventDefault: () => void; }) => {
    if (e.keyCode === 13) e.preventDefault()
  }

  const handleTitleChange = (e: { target: any; }) => {
    const input = e.target;
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px'
    dispatch(setBlog({ ...blog, title: input.value }));
  }

  const handleError = (e: { target: any; }) => {
    const img = e.target;
    img.src = blogBanner
  }


  return (
    <>
      <Navbar />
      <Toaster />
      <section>
        <div className="mx-auto my-5 max-w-[900px] ">
          <div className="relative mx-5 aspect-video hover:opacity-80 bg-white border-4 border-gray">
            <label htmlFor="uploadBanner">
              <img
                src={blog.banner} className="z-20" onError={handleError} />
              <input type="text" id="uploadBanner" type="file" accept=".png, .jpg, .jpeg ,.webp" hidden
                onChange={handleBannerUpload}
              />
            </label>
          </div>

          <textarea
            placeholder="Blog Title"
            className="text-4xl font-medium w-full mx-5 h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
            onKeyDown={handleTitleKeyDown}
            onChange={handleTitleChange}
            value={blog.title}
          >
          </textarea>
          <hr className="w-full my-5" />
          <div id="textEditor" className="font-serif mx-5"></div>

        </div>
      </section>
    </>
  );
};
