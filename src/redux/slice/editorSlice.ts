import { createSlice } from "@reduxjs/toolkit";

interface AuthorType {
    personal_info: any;
}

interface BlogType {
    title: string;
    banner: string;
    content: string[];
    tags: string[];
    des: string;
    author: AuthorType
}

interface TextEditorType {
    isReady: boolean;
}

interface EditorSliceType {
    blog: BlogType;
    editorState: string;
    textEditor: TextEditorType;
}

export const initialState: EditorSliceType = {
    blog: {
        title: '',
        banner: '',
        content: [],
        tags: [],
        des: '',
        author: { personal_info: {} }
      },
      editorState: 'editor',
      textEditor: { isReady: false }
}

const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setBlog(state, action) {
            state.blog = action.payload;
        },
        setEditorState(state, action) {
            state.editorState = action.payload
        },
        setTextEditor(state, action) {
            state.textEditor = action.payload
        }
    }
})

export const { setBlog, setEditorState, setTextEditor } = editorSlice.actions;
export default editorSlice.reducer;