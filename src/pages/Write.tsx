import { createContext, useState } from "react"
import { BlogEditor } from "../components/BlogEditor"
import { PublishForm } from "../components/PublishForm"
import MobileFooter from "../components/MobileFooter"

const blogStructure = {
    title: '',
    banner: '',
    content: [],
    tags: [],
    des: '',
    author: {personal_info: {}}
}

export const EditorContext = createContext({})

const Write = () => {
    const [blog, setBlog ] = useState(blogStructure)
    const [editorState, setEditorState] = useState('editor')
  const [textEditor, setTextEditor] = useState({ isReady: false })


  return (
    <>
    <div className='flex flex-col min-h-screen'>
      
      <EditorContext.Provider value={{ blog, setBlog, editorState, setEditorState, textEditor, setTextEditor}}>

        {editorState === 'editor'? <BlogEditor /> : <PublishForm />}
      </EditorContext.Provider>
      {/* <MobileFooter icon='edit' /> */}

    </div>
      
    </>
  )
}

export default Write