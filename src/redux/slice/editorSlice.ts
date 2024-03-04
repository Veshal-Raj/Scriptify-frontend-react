import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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