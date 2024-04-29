import React, { createContext, useState } from "react"
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

type SetEditorState =  React.Dispatch<React.SetStateAction<string>>



export const EditorContext = createContext<{
  blog: any;
  setBlog: React.Dispatch<any>;
  editorState: string;
  setEditorState: SetEditorState;
  textEditor: any;
  setTextEditor: React.Dispatch<any>;
}>({} as any);

const Write = () => {
    const [blog, setBlog ] = useState(blogStructure)
    const [editorState, setEditorState] = useState('editor')
    const [textEditor, setTextEditor] = useState({ isReady: false })


  return (
    <>
      <div className='flex flex-col overflow-hidden'>      
        <EditorContext.Provider value={{ blog, setBlog, editorState, setEditorState, textEditor, setTextEditor}}>
          {editorState === 'editor'? <BlogEditor /> : <PublishForm />}
        </EditorContext.Provider>
        <MobileFooter icon='edit' />
      </div>      
    </>
  )
}

export default Write