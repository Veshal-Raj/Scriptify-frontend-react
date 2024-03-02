import { useState } from "react"
import { BlogEditor } from "../components/BlogEditor"
import { PublishForm } from "../components/PublishForm"

const Write = () => {
    const [editorState, setEditorState] = useState('editor')
  return (
    <>
        {editorState === 'editor'? <BlogEditor /> : <PublishForm />}
    </>
  )
}

export default Write