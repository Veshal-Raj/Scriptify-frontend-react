import { createContext, useState } from "react"
import { BlogEditor } from "../components/BlogEditor"
import { PublishForm } from "../components/PublishForm"

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


  return (
    <>
      <EditorContext.Provider value={{ blog, setBlog, editorState, setEditorState}}>

        {editorState === 'editor'? <BlogEditor /> : <PublishForm />}
      </EditorContext.Provider>
    </>
  )
}

export default Write